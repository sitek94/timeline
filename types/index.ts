import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

export type QueryDatabaseResponseResult =
  QueryDatabaseResponse['results'][number];

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

export interface Tag {
  id: string;
  name: string;
  color: ColorName;
}

export interface Author {
  id: string;
  name: string;
  color: ColorName;
}

export interface Category {
  id: string;
  name: CategoryName;
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

export type CategoryName =
  | 'video-course'
  | 'conference-talk'
  | 'interactive-course'
  | 'workshop'
  | 'podcast'
  | 'university-course'
  | 'error'
  | 'unknown';
