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
  offset: number,
  count: number
) => {
  const conditionsString = JSON.stringify(filterConditions);
  const encodedConditions = encodeURIComponent(conditionsString);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/course?filter_conditions=${encodedConditions}&sort_by=created_datetime.desc&offset=${offset}&count=${count}`
    );
    if (response.status === 500) {
      throw response.statusText;
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
