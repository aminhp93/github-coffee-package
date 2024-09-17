import { useMemo, useState } from "react";

/**
 * Hook for picking files from user's computer
 *
 * @param listData data array that needs searching
 * @param options.fields specifies fields to search for
 */
export function useSearch<T extends object = { [key: string]: unknown }>(
  listData: T[],
  options?: {
    fields?: (keyof T)[];
  }
) {
  const [keyword, setKeyword] = useState("");

  const onChangeKeyword = (newKeyword: string) => {
    setKeyword(newKeyword);
  };

  const data = useMemo(() => {
    if (!keyword) return listData;
    const keywordRegExp = new RegExp(keyword.toLowerCase());
    const processedData = listData.filter((i) => {
      let compareString = "";
      if (options?.fields) {
        options.fields.forEach((field) => (compareString += JSON.stringify(i[field])));
      } else {
        compareString = JSON.stringify(Object.values(i));
      }
      return keywordRegExp.test(compareString.toLowerCase());
    });
    return processedData;
  }, [keyword, listData, options?.fields]);

  return {
    data,
    keyword,
    onChangeKeyword,
  };
}
