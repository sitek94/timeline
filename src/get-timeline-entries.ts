import { Client } from '@notionhq/client';
import { QueryDatabaseResponseResult, TimelineEntry } from 'src/types';

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
  category: {
    id: 'a',
    name: 'Unknown',
    color: 'yellow',
  },
  tags: [],
  url: 'https://www.notion.so/',
  finished_at: new Date().getTime(),
};
