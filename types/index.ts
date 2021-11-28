import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

// NOTION
export type QueryDatabaseResponseResult =
  QueryDatabaseResponse['results'][number];

// TIMELINE ENTRY
export interface TimelineEntry {
  id: string;
  title: string;
  icon: string;
  category: string;
  tags: Tag[];
  url: string;
  finished_at: number;
  description?: string;
}

export interface Tag {
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
