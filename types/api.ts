import notionToMuiColors, { MuiColor } from '../styles/notion-to-mui-colors';

export interface Page {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  cover: null;
  icon: null;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
}

export interface Parent {
  type: string;
  database_id: string;
}

export interface Properties {
  tags: MultiSelectField;
  category: CategoryField;
  title: TitleField;
  repository_url: UrlField;
  url: UrlField;
  description: DescriptionField;
  finished_at: DateField;
  authors: MultiSelectField;
}

export interface MultiSelectField {
  id: string;
  type: string;
  multi_select: NotionTag[];
}

export interface NotionTag {
  id: string;
  name: string;
  color: ColorName;
}

export type CategoryName = 'conference_talk' | 'video_course';
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

interface NotionCategoryTag extends NotionTag {
  name: CategoryName;
}

export interface CategoryField {
  id: string;
  type: string;
  select: NotionCategoryTag;
}

export interface DescriptionField {
  id: string;
  type: string;
  rich_text: RichText[];
}

export interface RichText {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: null;
}

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface Text {
  content: string;
  link: null;
}

export interface DateField {
  id: string;
  type: string;
  date: DateClass;
}

export interface DateClass {
  start: Date;
  end: null;
}

export interface UrlField {
  id: string;
  type: string;
  url: null | string;
}

export interface TitleField {
  id: string;
  type: string;
  title: RichText[];
}

export interface TimelineEntry {
  id: string;
  tags: Tag[];
  category: CategoryTag;
  title: string;
  repository_url: string | null;
  url: string | null;
  timestamp: number;
  authors: Tag[];
}

interface Tag {
  id: string;
  name: string;
  color: MuiColor;
}

interface CategoryTag extends Tag {
  name: CategoryName;
}

export function mapPageToTimelineEntry(page: Page): TimelineEntry {
  return {
    id: page.id,
    tags: page.properties.tags.multi_select.map(tag => ({
      ...tag,
      color: notionToMuiColors[tag.color],
    })),
    category: {
      ...page.properties.category.select,
      color: notionToMuiColors[page.properties.category.select.color],
    },
    title: page.properties.title.title[0].text.content,
    repository_url: page.properties.repository_url.url,
    url: page.properties.url.url,
    timestamp: new Date(page.properties.finished_at.date.start).getTime(),
    authors: page.properties.authors.multi_select.map(tag => ({
      ...tag,
      color: notionToMuiColors[tag.color],
    })),
  };
}
