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
  const conditionsString = JSON.stringify(filterConditions);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/course?filter_conditions=${conditionsString}&sort_by=created_datetime.desc&offset=${offset}&count=20`
    );
    if (response.status === 500) {
      throw response.statusText;
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
