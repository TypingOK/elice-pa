import { CourseFilter } from "@/constants/filtering";

export const isExists = (pathParams: string[], filterObject: CourseFilter) => {
  const indexes = pathParams.map((value) => parseInt(value));
  let result: { [key: string]: string } = {};
  for (const key in filterObject.filter) {
    const index = filterObject.filter[key].index;
    if (indexes.includes(index)) {
      result = {
        ...result,
        [index]: key,
      };
    }
  }
  return result;
};
