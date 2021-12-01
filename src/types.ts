import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { categoryIcons } from 'src/config';
import * as muiColors from '@mui/material/colors';

// NOTION
export type QueryDatabaseResponseResult =
  QueryDatabaseResponse['results'][number];

// TIMELINE ENTRY
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

export type CategoryName = keyof typeof categoryIcons;

// MATERIAL UI
export type MuiColors = typeof muiColors;
export type MuiColorName = keyof MuiColors;
export type MuiColor = Record<keyof typeof muiColors.grey, string>;
