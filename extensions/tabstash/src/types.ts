export interface CompactLinkItem {
  id: string;
  title: string;
  url: string;
  hostname: string;
}

export interface LinkItem {
  id: string;
  url: string;
  url_raw: string;
  title: string;
  hostname: string;
  note: string;
  sync_status: string;
  favicon_url: string;
  description: string;
  save_count: number;
  created_at: string;
  updated_at: string;
  last_accessed_at: string;
  tags: string[];
  folder_id: string | null;
  folder_name: string | null;
}

export interface CompactSearchResponse {
  items: CompactLinkItem[];
}

export interface RecentResponse {
  items: LinkItem[];
  cursor: string | null;
}
