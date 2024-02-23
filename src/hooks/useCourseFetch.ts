import { dataTransform } from "@/utils/dataProcessing";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { FormData, Result } from "@/constants/filtering";
import { OrgCourseListResponses } from "@/types/OrgCourse";

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

export const useCourseFetch = (
  data: FormData,
  offset: number
): UseQueryResult<OrgCourseListResponses, Error> => {
  const filterConditions = dataTransform(data);
  return useQuery({
    queryKey: ["getContent"],
    queryFn: async () => {
      const response = await fetcher(filterConditions, offset);
      return response;
    },
  });
};
