import React from "react";
import { useRouter } from "next/router";
import useSwr from "swr";
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteGroupTitle,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import Client from "src/libs/supabase";
import { Room } from "src/types/schema";

function App() {
  const router = useRouter();
  const { data: rooms } = useSwr(["search-all-data"], () => {
    return Client.searchRoom();
  });

  const grouppedRoom = React.useMemo(() => {
    if (rooms && rooms.length > 0) {
      const data: { [key: string]: Room[] } = {};
      rooms.forEach((room) => {
        if (data[room.categories.name]) {
          data[room.categories.name]?.push(room);
        } else {
          data[room.categories.name] = [room];
        }
      });
      return Object.entries(data);
    }
    return [];
  }, [rooms]);

  return (
    <AutoComplete openOnFocus listAllValuesOnFocus>
      <AutoCompleteInput placeholder="Search room ..." />
      <AutoCompleteList>
        {grouppedRoom.map(([category, rooms]) => (
          <AutoCompleteGroup key={category} id={category} showDivider>
            <AutoCompleteGroupTitle textTransform="capitalize">
              {category}
            </AutoCompleteGroupTitle>
            {rooms.map((room) => (
              <AutoCompleteItem
                key={room.id}
                value={room.name}
                groupId={category}
                textTransform="capitalize"
                onClick={() => router.push(`/room/${room.id}`)}
              >
                {room.name}
              </AutoCompleteItem>
            ))}
          </AutoCompleteGroup>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  );
}

export default App;
