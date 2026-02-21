import { List } from "@raycast/api";
import { getAccessToken, useFetch, withAccessToken } from "@raycast/utils";
import { useState } from "react";
import { LinkListItem } from "./components/link-list-item";
import { provider } from "./provider";
import type { RecentResponse } from "./types";

type SortOrder = "newest" | "most-saved" | "last-visited" | "alpha-asc";

const SORT_OPTIONS: { label: string; value: SortOrder }[] = [
  { label: "Newest", value: "newest" },
  { label: "Most Saved", value: "most-saved" },
  { label: "Last Visited", value: "last-visited" },
  { label: "A–Z", value: "alpha-asc" },
];

function RecentLinks() {
  const { token } = getAccessToken();
  const [sort, setSort] = useState<SortOrder>("newest");

  const { data, isLoading } = useFetch<RecentResponse>(
    `https://tabsta.sh/v1/recent?limit=50&sort=${sort}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      keepPreviousData: true,
    },
  );

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Filter recent links..."
      searchBarAccessory={
        <List.Dropdown
          tooltip="Sort Order"
          storeValue
          onChange={(v) => setSort(v as SortOrder)}
        >
          {SORT_OPTIONS.map((opt) => (
            <List.Dropdown.Item
              key={opt.value}
              title={opt.label}
              value={opt.value}
            />
          ))}
        </List.Dropdown>
      }
    >
      {data && data.items.length === 0 ? (
        <List.EmptyView
          title="No links yet"
          description="Capture your first link to get started"
        />
      ) : (
        data?.items.map((item) => (
          <LinkListItem
            key={item.id}
            id={item.id}
            title={item.title}
            url={item.url}
            hostname={item.hostname}
            created_at={item.created_at}
            tags={item.tags}
          />
        ))
      )}
    </List>
  );
}

export default withAccessToken(provider)(RecentLinks);
