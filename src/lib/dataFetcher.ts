import { Result } from "@/constants/filtering";

export const fetcher = async (
  filterConditions: {
    $and: (
      | {
          [key: string]: string | boolean;
        }
      | Result
    )[];
  },
  offset: number
) => {
  const encodedString = encodeURIComponent(JSON.stringify(filterConditions));
  const response = await fetch(
    `/api/course?filter_conditions=${encodedString}&sort_by=created_datetime.desc&offset=${offset}&count=20`
  );
  return response.json();
};
