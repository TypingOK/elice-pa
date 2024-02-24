import { dataTransform } from "@/lib/dataProcessing";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { FormData, Result } from "@/constants/filtering";
import { OrgCourseListResponses } from "@/types/orgCourse";
import { fetcher } from "@/lib/dataFetcher";

export const useCourseFetch = (
  data: FormData,
  offset: number
): UseQueryResult<OrgCourseListResponses, Error> => {
  return useQuery({
    queryKey: ["getContent", data, offset],
    queryFn: async () => {
      const filterConditions = dataTransform(data);
      const response = await fetcher(filterConditions, offset);
      return response;
    },
  });
};
