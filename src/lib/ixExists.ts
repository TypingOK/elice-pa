import { Filter } from "@/types/filter";

export const isExists = (pathParams: string[], filterObject: Filter) => {
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
