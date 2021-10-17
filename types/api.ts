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
  tags: MultiSelect;
  category: Category;
  title: Title;
  repository_url: URL;
  url: URL;
  description: Description;
  finished_at: FinishedAt;
  authors: MultiSelect;
}

export interface MultiSelect {
  id: string;
  type: string;
  multi_select: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Category {
  id: string;
  type: string;
  select: Tag;
}

export interface Description {
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

export interface FinishedAt {
  id: string;
  type: string;
  date: DateClass;
}

export interface DateClass {
  start: Date;
  end: null;
}

export interface URL {
  id: string;
  type: string;
  url: null | string;
}

export interface Title {
  id: string;
  type: string;
  title: RichText[];
}

export interface TimelineItem {
  id: string;
  tags: Tag[];
  category: Tag;
  title: string;
  repository_url: string | null;
  url: string | null;
  timestamp: number;
  authors: Tag[];
}

export function mapPageToTimelineItem(page: Page): TimelineItem {
  return {
    id: page.id,
    tags: page.properties.tags.multi_select,
    category: page.properties.category.select,
    title: page.properties.title.title[0].text.content,
    repository_url: page.properties.repository_url.url,
    url: page.properties.url.url,
    timestamp: new Date(page.properties.finished_at.date.start).getTime(),
    authors: page.properties.authors.multi_select,
  };
}
