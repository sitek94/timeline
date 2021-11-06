import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { QueryDatabaseResponseResult, TimelineEntry } from 'types';

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

    if (propValue.type === 'url') {
      timelineEntry[propName] = propValue.url;
    }
  }

  return timelineEntry as unknown as TimelineEntry;
}

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

function createErrorEntry(e: Error): TimelineEntry {
  return {
    ...errorEntry,
    description: e.message,
  };
}

const errorEntry: TimelineEntry = {
  id: 'abc123',
  title: 'Something went wrong!',
  category: {
    id: 'a',
    name: 'error',
    color: 'red',
  },
  tags: [
    {
      id: 'a',
      name: 'error',
      color: 'red',
    },
  ],
  url: 'https://www.notion.so/',
  finished_at: new Date().getTime(),
};
