import { isNumeric } from "@/lib/isNumberic";
import {
  courseType,
  format,
  category,
  level,
  programmingLanguage,
  price,
  Filtered,
  FormData,
  Result,
  Condition,
} from "@/constants/filtering";

export const dataTransform = (data: FormData) => {
  if (data && typeof data === "object") {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value && value !== "")
    );
    const courseTypeResult: Filtered[] = [];
    const formatResult: Filtered[] = [];
    const categoryResult: Filtered[] = [];
    const levelResult: Filtered[] = [];
    const programmingLanguageResult: Filtered[] = [];
    const priceResult: Filtered[] = [];

    Object.entries(filteredData).forEach(([key, value]) => {
      if (isNumeric(key)) {
        const index = parseInt(key);
        if (1 <= index && index <= 3) {
          if (1 === index) {
            courseTypeResult.push({
              과목: {
                $or: [{ course_type: 0 }, { course_type: 2 }],
              },
            });
          } else {
            courseTypeResult.push({
              [courseType.filterType]:
                courseType.filter[value].data[0].toString(),
            });
          }
        } else if (4 <= index && index <= 5) {
          formatResult.push({
            [format.filterType]: format.filter[value].data[0].toString(),
          });
        } else if (6 <= index && index <= 10) {
          categoryResult.push({
            [category.filterType]: category.filter[value].data[0].toString(),
          });
        } else if (11 <= index && index <= 15) {
          levelResult.push({
            [level.filterType]: level.filter[value].data[0].toString(),
          });
        } else if (16 <= index && index <= 28) {
          programmingLanguageResult.push({
            [programmingLanguage.filterType]:
              programmingLanguage.filter[value].data[0].toString(),
          });
        } else if (29 <= index && index <= 32) {
          if (29 === index) {
            priceResult.push({
              [price.filterType]: price.filter[value].data[0].toString(),
              is_free: true,
            });
          } else if (30 === index) {
            priceResult.push({
              [price.filterType]: price.filter[value].data[0].toString(),
              is_free: false,
            });
          } else {
            priceResult.push({
              [price.filterType]: price.filter[value].data[0].toString(),
            });
          }
        }
      }
    });
    const keyword = data.keyword !== "" ? data.keyword : undefined;
    const courseConditions: Result = isConditionsFilter(courseTypeResult, 3);
    const formatConditions: Result = isConditionsFilter(formatResult, 2);
    const categoryConditions: Result = isConditionsFilter(categoryResult, 5);
    const levelConditions: Result = isConditionsFilter(levelResult, 5);
    const programmingLanguageConditions: Result = isConditionsFilter(
      programmingLanguageResult,
      13
    );
    const priceConditions: Result = isConditionsFilter(priceResult, 4);
    const resultData: {
      $and: ({ [key: string]: string | boolean } | Result)[];
    } = {
      $and: [
        { title: keyword !== undefined ? `%${keyword}%` : `%%` },
        { $or: [{ status: 2 }, { status: 3 }, { status: 4 }] },
        { $or: [] },
      ],
    };

    if (courseConditions.$or.length > 0) {
      resultData.$and.push(courseConditions);
    }
    if (formatConditions.$or.length > 0) {
      resultData.$and.push(formatConditions);
    }
    if (categoryConditions.$or.length > 0) {
      resultData.$and.push(categoryConditions);
    }
    if (levelConditions.$or.length > 0) {
      resultData.$and.push(levelConditions);
    }
    if (programmingLanguageConditions.$or.length > 0) {
      resultData.$and.push(programmingLanguageConditions);
    }
    if (priceConditions.$or.length > 0) {
      resultData.$and.push(priceConditions);
    }
    resultData.$and.push({ is_datetime_enrollable: true });
    return resultData;
  } else {
    const resultData: {
      $and: ({ [key: string]: string } | Result)[];
    } = {
      $and: [
        { title: `%%` },
        { $or: [{ status: 2 }, { status: 3 }, { status: 4 }] },
        { $or: [] },
      ],
    };
    return resultData;
  }
};

export const isConditionsFilter = (
  needFilterArray: Filtered[],
  length: number
) => {
  const filteredArray: Result = { $or: [] };
  if (needFilterArray.length !== 0 && needFilterArray.length !== length) {
    needFilterArray.forEach((e) => {
      const [key1, key2] = Object.keys(e);
      const value = e[key1];
      if (value && typeof value === "object" && Array.isArray(value.$or)) {
        filteredArray["$or"].push(value);
      } else if (value && typeof value === "string") {
        if (key2 && e[key2]) {
          const entry: Condition = {
            [key1]: parseInt(value),
            [key2]: e[key2] as boolean,
          };
          filteredArray["$or"].push(entry);
        } else {
          const entry: Condition = { [key1]: parseInt(value) };
          filteredArray["$or"].push(entry);
        }
      }
    });
  }

  return filteredArray;
};
