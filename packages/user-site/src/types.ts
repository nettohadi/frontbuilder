export type ApiErrorType = {
  code: string;
  message?: string;
  details?: string;
  hint?: string;
};

import { ElementType } from "@frontbuilder/renderer";

export type PageType = {
  id?: string;
  name?: string;
  slug?: string;
  user_id?: string;
  website_id?: number;
  draft?: ElementType;
  isDefault?: boolean;
  published?: ElementType | string;
  createdAt?: string;
};

export type WebsiteType = {
  id?: number;
  name?: string;
  slug?: string;
  user_id?: string;
  isDefault?: boolean;
  createdAt?: string;
  favicon?: string;
};

export type DataType = {
  page: PageType;
  website: WebsiteType;
};
