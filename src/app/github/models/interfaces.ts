export enum SearchVariants {
  byLang = 1,
  byTopic
}

export interface SearchItem {
  id: SearchVariants;
  name: string;
}

export interface RepositoryItem {
  id: number;
  fullName: string;
  language: string;
  description: string;
  url: string;
  checked: boolean;
}

export interface SearchPanelDto {
  variant: SearchVariants;
  query: string;
}
