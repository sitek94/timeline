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
    title: result.properties.title.title[0]?.plain_text,
    description:
      result.properties.description?.rich_text[0]?.plain_text ?? null,
    tags: result.properties.tags.multi_select,
    category: result.properties.category.select,
    repository_url: result.properties.repository_url.url,
    url: result.properties.url.url,
    timestamp: new Date(result.properties.finished_at.date.start).getTime(),
    authors: result.properties.authors.multi_select,
  };
}

function createDummyEntry(): TimelineEntry {
  return {
    id: 'abc123',
    title: 'Something went wrong!',
    description: null,
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
  description: string | null;
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

export type CategoryName =
  | 'video-course'
  | 'conference-talk'
  | 'interactive-course'
  | 'workshop'
  | 'error'
  | 'podcast';

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
