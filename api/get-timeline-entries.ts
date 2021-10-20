import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID as string;

export async function getTimelineEntries() {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  const timelineEntries = mapResponseToTimelineEntries(response);

  return timelineEntries;
}

function mapResponseToTimelineEntries(response: {
  // It's just too painful to type Notion Response,
  // hopefully they will add some generics in the future.
  results: any[];
}): TimelineEntry[] {
  return response.results.map(result => ({
    id: result.id,
    title: result.properties.title.title[0].text.content as string,
    tags: result.properties.tags.multi_select,
    category: result.properties.category.select,
    repository_url: result.properties.repository_url.url,
    url: result.properties.url.url,
    timestamp: new Date(result.properties.finished_at.date.start).getTime(),
    authors: result.properties.authors.multi_select as Author[],
  }));
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
