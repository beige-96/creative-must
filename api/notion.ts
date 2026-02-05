import { Client } from '@notionhq/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, company, url, contact, email, purpose } = request.body;
    const NOTION_TOKEN = process.env.NOTION_TOKEN;
    const DATABASE_ID = process.env.NOTION_DATABASE_ID;

    if (!NOTION_TOKEN || !DATABASE_ID) {
      return response.status(500).json({ 
        error: 'Notion configuration is missing'
      });
    }

    const notion = new Client({
      auth: NOTION_TOKEN,
    });

    await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: {
        // '이름' 컬럼 (Title)
        이름: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        // '브랜드 혹은 회사명' 컬럼 (Rich Text)
        '브랜드 혹은 회사명': {
          rich_text: [
            {
              text: {
                content: company,
              },
            },
          ],
        },
        // 'URL' 컬럼 (URL)
        URL: {
          url: url || null,
        },
        // '연락처' 컬럼 (Phone Number)
        연락처: {
          phone_number: contact,
        },
        // '이메일' 컬럼 (Email)
        이메일: {
          email: email,
        },
        // '사용목적' 컬럼 (Multi-select)
        사용목적: {
          multi_select: (purpose || []).map((item: string) => ({
            name: item,
          })),
        },
        // '요청일시' 컬럼 (Date)
        요청일시: {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    return response.status(200).json({ message: 'Success' });
  } catch (error: any) {
    console.error('Notion API Error:', error);
    return response.status(500).json({ 
      error: error.message || 'Failed to submit to Notion'
    });
  }
}
