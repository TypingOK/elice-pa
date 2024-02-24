import { dataTransform } from "@/lib/dataProcessing";
import {
  UseSuspenseQueryResult,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { FormData } from "@/constants/filtering";
import { OrgCourseListResponses } from "@/types/orgCourse";
import { fetcher } from "@/lib/dataFetcher";

export const useCourseFetch = (
  data: FormData,
  offset: number
): UseSuspenseQueryResult<OrgCourseListResponses, Error> => {
  return useSuspenseQuery({
    queryKey: ["getContent", data, offset],
    queryFn: async () => {
      const filterConditions = dataTransform(data);
      const response = await fetcher(filterConditions, offset);
      return response;
    },
  });
};
