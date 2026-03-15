import crypto from 'crypto';

/**
 * Sheet Gantt Manager - Google Sheets REST API Utility (v1.5.8)
 */

async function getAccessToken(email: string, privateKey: string) {
  try {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const payload = {
      iss: email,
      sub: email,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(signatureInput);
    sign.end();
    const signature = sign.sign(privateKey, 'base64url');

    const jwt = `${signatureInput}.${signature}`;

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error_description || data.error);
    return data.access_token;
  } catch (e: any) {
    throw new Error(`Auth Failed: ${e.message}`);
  }
}

/**
 * 스프레드시트 메타데이터를 가져와 각 시트의 ID를 확인합니다.
 */
async function getSheetIds(accessToken: string, spreadsheetId: string) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const data = await response.json();
  
  const mapping: { [key: string]: number } = {};
  data.sheets.forEach((s: any) => {
    mapping[s.properties.title] = s.properties.sheetId;
  });
  return mapping;
}

export async function fetchSheetData(range: string) {
  const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');

  const mockData = [
    ["T-01", "실제 데이터 연동 확인 필요", "진행", "2026-03-12", "2026-03-25", "45", "Param", "시트 권한 또는 ID를 확인해주세요", "-"],
    ["T-02", "디자인 시스템 고도화", "보류", "2026-03-15", "2026-03-20", "10", "Designer", "추가 아이콘 필요", "진행 중"]
  ];

  if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    return { values: mockData, debug: "환경 변수 누락" };
  }

  try {
    const accessToken = await getAccessToken(CLIENT_EMAIL, PRIVATE_KEY);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}`;
    
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 0, tags: ['gantt-data'] } 
    });

    const data = await response.json();
    if (data.error) return { values: mockData, debug: `API Error: ${data.error.message}` };
    return { ...data, debug: "Success" };
  } catch (error: any) {
    return { values: mockData, debug: `Exception: ${error.message}` };
  }
}

/**
 * 신규 태스크를 시트 끝에 추가합니다.
 */
export async function appendSheetData(sheetName: string, rowData: any[]) {
  const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) throw new Error("Config missing");

  try {
    const accessToken = await getAccessToken(CLIENT_EMAIL, PRIVATE_KEY);
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetName}:append?valueInputOption=USER_ENTERED`;
    
    const response = await fetch(appendUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [rowData] })
    });

    const result = await response.json();
    if (result.error) throw new Error(result.error.message);
    return { success: true };
  } catch (error: any) {
    throw error;
  }
}

/**
 * 특정 Task ID를 찾아 시트에서 행을 영구 삭제합니다.
 */
export async function deleteSheetData(taskId: string) {
  const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) throw new Error("Config missing");

  try {
    const accessToken = await getAccessToken(CLIENT_EMAIL, PRIVATE_KEY);
    
    // 1. 행 번호 탐색
    const searchUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Gantt!A:A`;
    const searchRes = await fetch(searchUrl, { headers: { Authorization: `Bearer ${accessToken}` } });
    const searchData = await searchRes.json();
    const rowIndex = searchData.values?.findIndex((row: string[]) => row[0] === taskId) + 1;
    
    if (!rowIndex || rowIndex <= 0) throw new Error(`Task ${taskId} not found`);

    // 2. 행 영구 삭제
    const sheetMapping = await getSheetIds(accessToken, SPREADSHEET_ID);
    const ganttSheetId = sheetMapping['Gantt'];
    
    const batchUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}:batchUpdate`;
    const response = await fetch(batchUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requests: [{
          deleteDimension: {
            range: {
              sheetId: ganttSheetId,
              dimension: 'ROWS',
              startIndex: rowIndex - 1,
              endIndex: rowIndex
            }
          }
        }]
      })
    });

    const result = await response.json();
    if (result.error) throw new Error(result.error.message);
    return { success: true };
  } catch (error: any) {
    throw error;
  }
}

/**
 * 태스크 업데이트 및 아카이빙 (이동 및 삭제)
 */
export async function updateAndArchiveTask(taskId: string, updatedRow: any[]) {
  const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) throw new Error("Config missing");

  try {
    const accessToken = await getAccessToken(CLIENT_EMAIL, PRIVATE_KEY);
    const status = updatedRow[2]; // 상태값 (진행, 완료, 취소 등)
    
    // 1. Gantt 시트에서 행 번호 탐색
    const searchUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Gantt!A:A`;
    const searchRes = await fetch(searchUrl, { headers: { Authorization: `Bearer ${accessToken}` } });
    const searchData = await searchRes.json();
    const rowIndex = searchData.values?.findIndex((row: string[]) => row[0] === taskId) + 1;
    
    if (!rowIndex || rowIndex <= 0) throw new Error(`Task ${taskId} not found`);

    // 2. 아카이빙 여부 결정 (완료/취소 시 이동)
    if (status === '완료' || status === '취소') {
      const targetSheet = status === '완료' ? 'Completed' : 'Canceled';
      
      // A. 타겟 시트에 추가 (Append)
      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${targetSheet}:append?valueInputOption=USER_ENTERED`;
      await fetch(appendUrl, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [updatedRow] })
      });

      // B. Gantt 시트에서 행 삭제 (Delete Row)
      const sheetMapping = await getSheetIds(accessToken, SPREADSHEET_ID);
      const ganttSheetId = sheetMapping['Gantt'];
      
      const batchUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}:batchUpdate`;
      await fetch(batchUrl, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [{
            deleteDimension: {
              range: {
                sheetId: ganttSheetId,
                dimension: 'ROWS',
                startIndex: rowIndex - 1,
                endIndex: rowIndex
              }
            }
          }]
        })
      });

      return { success: true, action: 'archived', target: targetSheet };
    } else {
      // 3. 일반 업데이트 (진행/지연/보류)
      const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Gantt!A${rowIndex}:I${rowIndex}?valueInputOption=USER_ENTERED`;
      await fetch(updateUrl, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [updatedRow] })
      });
      return { success: true, action: 'updated' };
    }
  } catch (error: any) {
    throw error;
  }
}
