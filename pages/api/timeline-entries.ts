import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const timelineEntries = await getTimelineEntries();

    res.status(200).json(timelineEntries);
  } catch {
    res.status(400).json({ message: 'Ops' });
  }
}

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID as string;

export async function getTimelineEntries() {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  const timelineEntries = response.results.map(result => {
    try {
      return mapResultToTimelineEntry(result);
    } catch (e: any) {
      return createErrorEntry(e);
    }
  });

  return timelineEntries;
}

function createErrorEntry(e: Error): TimelineEntry {
  return {
    id: 'abc123',
    title: 'Something went wrong!',
    description: e.message,
    tags: [],
    category: {
      id: 'a',
      name: 'error',
      color: 'red',
    },
    url: 'https://www.notion.so/',
    finished_at: new Date().getTime(),
    authors: [],
  };
}

export interface TimelineEntry {
  id: string;
  title: string;
  category: Category;
  tags: Tag[];
  url: string;
  finished_at: number;
  description?: string;
  repository_url?: string;
  authors?: Author[];
}

type QueryDatabaseResponseResult = QueryDatabaseResponse['results'][number];

const defaultEntry: Partial<TimelineEntry> = {
  title: 'No Title',
  category: {
    id: 'a',
    name: 'unknown',
    color: 'yellow',
  },
  tags: [],
  url: 'https://www.notion.so/',
  finished_at: new Date().getTime(),
};

export function mapResultToTimelineEntry(result: QueryDatabaseResponseResult) {
  const timelineEntry: Record<string, unknown> = {
    id: result.id,
    ...defaultEntry,
  };

  for (const [propName, propValue] of Object.entries(result.properties)) {
    if (propValue.type === 'title') {
      timelineEntry[propName] = propValue.title[0]?.plain_text;
    }

    if (propValue.type === 'select') {
      timelineEntry[propName] = propValue.select;
    }

    if (propValue.type === 'multi_select') {
      timelineEntry[propName] = propValue.multi_select;
    }

    if (propValue.type === 'rich_text') {
      timelineEntry[propName] = propValue.rich_text[0]?.plain_text;
    }

    if (propValue.type === 'date') {
      timelineEntry[propName] = new Date(propValue.date?.start).getTime();
    }
  }

  return timelineEntry as unknown as TimelineEntry;
}

interface Tag {
  id: string;
  name: string;
  color: ColorName;
}

export type CategoryName =
  | 'video-course'
  | 'conference-talk'
  | 'interactive-course'
  | 'workshop'
  | 'podcast'
  | 'university-course'
  | 'error'
  | 'unknown';

interface Category {
  id: string;
  name: CategoryName;
  color: ColorName;
}

interface Author {
  id: string;
  name: string;
  color: ColorName;
}

export type ColorName =
  | 'default'
  | 'pink'
  | 'purple'
  | 'green'
  | 'gray'
  | 'orange'
  | 'brown'
  | 'red'
  | 'yellow'
  | 'blue';
