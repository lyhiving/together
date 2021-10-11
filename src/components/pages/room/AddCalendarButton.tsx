import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
} from "@chakra-ui/react";
import { Room } from "src/types/schema";
import {
  SHARE_SITES,
  buildShareUrl,
  isInternetExplorer,
} from "src/utils/share-calendar";

const AddCalendarButton = ({ room }: { room: Room }) => {
  const items = Object.keys(SHARE_SITES).map((itm) => SHARE_SITES[itm]);

  const handleCalendarButtonClick = (event: any) => {
    const filename = room.name;
    event.preventDefault();
    const url = event.currentTarget.getAttribute("href");
    if (url.startsWith("BEGIN")) {
      const blob = new Blob([url], { type: "text/calendar;charset=utf-8" });

      if (isInternetExplorer()) {
        // @ts-ignore
        window.navigator.msSaveOrOpenBlob(blob, `${filename}.ics`);
      } else {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", `${filename}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <Menu>
      <MenuButton variant="outline" as={Button}>
        Add to calendar
      </MenuButton>
      <MenuList>
        {items.map((item) => (
          <Link
            onClick={handleCalendarButtonClick}
            key={item}
            href={buildShareUrl(
              {
                title: room.name,
                description: room.description,
                platform: room.room_platform,
                startDatetime: room.start_at as Date,
                endDatetime: room.end_at as Date,
              },
              item as string
            )}
            isExternal
          >
            <MenuItem>{item}</MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
};

export default AddCalendarButton;
