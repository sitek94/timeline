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
  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
}

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID as string;

export async function getTimelineEntries() {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'finished_at',
        direction: 'descending',
      },
    ],
  });
  const publishableResults = filterOutNonPublishableResults(response.results);
  return publishableResults.map(mapResultToTimelineEntry);
}

function filterOutNonPublishableResults(
  results: QueryDatabaseResponseResult[],
) {
  return results.filter(result => {
    for (const [propName, propValue] of Object.entries(result.properties)) {
      // If publish property set to false, omit the result
      if (
        propName === 'publish' &&
        propValue.type === 'checkbox' &&
        !propValue.checkbox
      ) {
        return false;
      }
    }

    return true;
  });
}

const requiredProperties: Array<keyof TimelineEntry> = [
  'title',
  'description',
  'category',
  'finished_at',
  'url',
  'tags',
];

export function mapResultToTimelineEntry(result: QueryDatabaseResponseResult) {
  const timelineEntry: Record<string, unknown> = {
    id: result.id,
    ...defaultEntry,
  };

  if (result.icon?.type === 'emoji') {
    timelineEntry['icon'] = result.icon.emoji;
  }

  for (const [propName, propValue] of Object.entries(result.properties)) {
    // Map only those properties that are used in the app
    if (!requiredProperties.includes(propName as any)) {
      continue;
    }

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
  category: 'No Category',
  icon: '❤️',
  tags: [],
  url: 'https://www.notion.so/',
  finished_at: new Date().getTime(),
};
