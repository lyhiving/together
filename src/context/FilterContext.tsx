import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { createContext } from "src/utils/createContext";

export interface FilterValues {
  categories?: string[];
  platforms?: string[];
  date?: { startAt?: Date; endAt?: Date };
  sidebarVisible: boolean;
  setCategory: (category: string, checked: boolean) => void;
  setPlatform: (platform: string, checked: boolean) => void;
  setDate: (date: { startAt?: Date; endAt?: Date }) => void;
  setSidebarVisible: (visible: boolean) => void;
}

const [Provider, useFilterContext] = createContext<FilterValues>();

const FilterContextProvider: React.FC<any> = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [date, setDate] = useState<{ startAt?: Date; endAt?: Date }>({});
  const { pathname, push } = useRouter();

  const setCategory = useCallback((category: string, checked: boolean) => {
    setCategories((categories) => {
      if (checked) {
        return [...categories, category];
      } else {
        return categories.filter((item) => item !== category);
      }
    });
  }, []);

  const setPlatform = useCallback((platform: string, checked: boolean) => {
    setPlatforms((platforms) => {
      if (checked) {
        return [...platforms, platform];
      } else {
        return platforms.filter((item) => item !== platform);
      }
    });
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams();

    if (categories.length > 0) {
      urlParams.append("category", categories.join(","));
    } else {
      urlParams.delete("category");
    }
    if (platforms.length > 0) {
      urlParams.append("platform", categories.join(","));
    } else {
      urlParams.delete("platform");
    }
    if (date.startAt) {
      urlParams.append("startAt", date.startAt.toISOString());
    } else {
      urlParams.delete("startAt");
    }
    if (date.endAt) {
      urlParams.append("endAt", date.endAt.toISOString());
    } else {
      urlParams.delete("endAt");
    }
    const hasFilter =
      urlParams.has("category") ||
      urlParams.has("platform") ||
      urlParams.has("startAt") ||
      urlParams.has("endAt");

    if (hasFilter) {
      push(`${pathname}?${urlParams.toString()}`);
    } else {
      push(pathname);
    }
  }, [categories, platforms, date]);

  const value: any = {
    categories,
    platforms,
    date,
    setCategory,
    setPlatform,
    setDate,
    sidebarVisible,
    setSidebarVisible,
  };

  return <Provider value={value}>{children}</Provider>;
};

export { useFilterContext };
export default FilterContextProvider;
