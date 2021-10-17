// To parse this data:
//
//   import { Convert } from "./file";
//
//   const welcome = Convert.toWelcome(json);

export interface NotionResults {
  object: string;
  id: string;
  created_time: Date;
  last_edited_time: Date;
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
  tags: Author;
  category: Category;
  title: Title;
  repository_url: URL;
  url: URL;
  description: Description;
  finished_at: FinishedAt;
  author: Author;
}

export interface Author {
  id: string;
  type: string;
  multi_select: Select[];
}

export interface Select {
  id: string;
  name: string;
  color: string;
}

export interface Category {
  id: string;
  type: string;
  select: Select;
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

// Converts JSON strings to/from your types
export class Convert {
  public static toNotionResults(json: string): NotionResults[] {
    return JSON.parse(json);
  }

  public static notionResultsToJson(value: NotionResults[]): string {
    return JSON.stringify(value);
  }
}
