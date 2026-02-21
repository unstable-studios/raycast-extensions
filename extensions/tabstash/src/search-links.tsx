import { type LaunchProps, List } from "@raycast/api";
import { getAccessToken, useFetch, withAccessToken } from "@raycast/utils";
import { useState } from "react";
import { LinkListItem } from "./components/link-list-item";
import { provider } from "./provider";
import type { CompactSearchResponse } from "./types";

function SearchLinks(props: LaunchProps<{ arguments: Arguments.SearchLinks }>) {
  const { token } = getAccessToken();
  const initialQuery = props.arguments.query || props.fallbackText || "";
  const [searchText, setSearchText] = useState(initialQuery);

  const { data, isLoading } = useFetch<CompactSearchResponse>(
    `https://tabsta.sh/v1/search?q=${encodeURIComponent(searchText)}&format=compact&limit=20`,
    {
      headers: { Authorization: `Bearer ${token}` },
      execute: searchText.length > 0,
      keepPreviousData: true,
    },
  );

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Keywords, tags, URLs..."
      searchText={searchText}
      onSearchTextChange={setSearchText}
      filtering={false}
      throttle
    >
      {!searchText ? (
        <List.EmptyView title="Type to search your stash" icon="icon.png" />
      ) : data?.items.length === 0 ? (
        <List.EmptyView
          title="No results found"
          description={`No links matching "${searchText}"`}
        />
      ) : (
        data?.items.map((item) => (
          <LinkListItem
            key={item.id}
            id={item.id}
            title={item.title}
            url={item.url}
            hostname={item.hostname}
          />
        ))
      )}
    </List>
  );
}

export default withAccessToken(provider)(SearchLinks);
