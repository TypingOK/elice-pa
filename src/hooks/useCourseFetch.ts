import { dataTransform } from "@/utils/dataProcessing";
import { useQuery } from "@tanstack/react-query";
import { FormData, Result } from "@/constants/filtering";

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

export const useCourseFetch = (data: FormData, offset: number) => {
  const filterConditions = dataTransform(data);
  console.log(filterConditions);
  return useQuery({
    queryKey: ["getContent"],
    queryFn: async () => {
      const response = await fetcher(filterConditions, offset);
      console.log(response);
      return response;
    },
  });
};
