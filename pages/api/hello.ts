// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID as string;

async function getItems() {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = await getItems();

  res.status(200).json(data);
}

interface MultiSelectOption {
  id: string;
  name: string;
  color: string;
}
