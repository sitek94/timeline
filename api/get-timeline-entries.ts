import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID as string;

export async function getTimelineEntries() {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  const timelineEntries = response.results.map(result => {
    try {
      return createTimelineEntry(result);
    } catch {
      return createDummyEntry();
    }
  });

  return timelineEntries;
}

function createTimelineEntry(result: any): TimelineEntry {
  return {
    id: result.id,
    title: result.properties.title.title[0].text.content as string,
    tags: result.properties.tags.multi_select,
    category: result.properties.category.select,
    repository_url: result.properties.repository_url.url,
    url: result.properties.url.url,
    timestamp: new Date(result.properties.finished_at.date.start).getTime(),
    authors: result.properties.authors.multi_select as Author[],
  };
}

function createDummyEntry(): TimelineEntry {
  return {
    id: 'abc123',
    title: 'Something went wrong!',
    tags: [
      {
        id: 'a',
        name: 'error',
        color: 'red',
      },
    ],
    category: {
      id: 'a',
      name: 'error',
      color: 'red',
    },
    url: 'https://www.notion.so/',
    repository_url: '',
    timestamp: new Date().getTime(),
    authors: [
      {
        id: 'a',
        name: 'Maciek Sitkowski',
        color: 'red',
      },
    ],
  };
}

export interface TimelineEntry {
  id: string;
  tags: Tag[];
  category: Category;
  title: string;
  repository_url: string | null;
  url: string | null;
  timestamp: number;
  authors: Author[];
}

interface Tag {
  id: string;
  name: string;
  color: ColorName;
}

interface Category {
  id: string;
  name: string;
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
