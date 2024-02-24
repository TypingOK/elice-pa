"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import SearchArea from "./(Filter)/SearchArea";
import {
  category,
  courseType,
  format,
  level,
  price,
  programmingLanguage,
  FormData,
} from "@/constants/filtering";
import { useSearchParams } from "next/navigation";
import { isNumeric } from "@/lib/isNumberic";
import { isExists } from "@/lib/ixExists";
import ContentWrapper from "./(CardContent)/ContentWrapper";
import FilterTable from "./(Filter)/Table";

const MainContainer = () => {
  const searchParams = useSearchParams();
  const initialCourseType = searchParams.getAll("courseType");
  const initialFormat = searchParams.getAll("format");
  const initialCategory = searchParams.getAll("category");
  const initialLevel = searchParams.getAll("level");
  const initialProgrammingLanguage = searchParams.getAll("programmingLanguage");
  const initialPrice = searchParams.getAll("price");
  const initialKeyword = searchParams.get("keyword");

  const initialCourseTypeResult = isExists(initialCourseType, courseType);
  const initialFormatResult = isExists(initialFormat, format);
  const initialCategoryResult = isExists(initialCategory, category);
  const initialLevelResult = isExists(initialLevel, level);
  const initialProgrammingLanguageResult = isExists(
    initialProgrammingLanguage,
    programmingLanguage
  );
  const initialPriceResult = isExists(initialPrice, price);
  let initialKeywordResult = "";

  if (initialKeyword && initialKeyword.trim() !== "") {
    initialKeywordResult = initialKeyword;
  }

  const initialData = {
    ...initialCourseTypeResult,
    ...initialFormatResult,
    ...initialCategoryResult,
    ...initialLevelResult,
    ...initialProgrammingLanguageResult,
    ...initialPriceResult,
    keyword: initialKeywordResult,
  };

  const { setValue, register, handleSubmit, getValues, watch } =
    useForm<FormData>({ defaultValues: initialData });

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    let path = "";
    Object.entries(data).forEach(([key, value]) => {
      if (key && value !== "") {
        if (isNumeric(key)) {
          const index = parseInt(key);
          if (1 <= index && index <= 3) {
            path += `&${courseType.pathType}=${index}`;
          } else if (4 <= index && index <= 5) {
            path += `&${format.pathType}=${index}`;
          } else if (6 <= index && index <= 10) {
            path += `&${category.pathType}=${index}`;
          } else if (11 <= index && index <= 15) {
            path += `&${level.pathType}=${index}`;
          } else if (16 <= index && index <= 28) {
            path += `&${programmingLanguage.pathType}=${index}`;
          } else if (29 <= index && index <= 32) {
            path += `&${price.pathType}=${index}`;
          }
        }
      }
      if (key === "keyword" && value !== "") {
        path += `&keyword=${value}`;
      }
    });
    if (window) {
      window.history.pushState({}, "", `?${path}`);
    }
  };

  const handleFilter = (name: string, label: number) => {
    const labelValue = getValues(label.toString());
    if (labelValue === "" || labelValue === undefined) {
      setValue(label.toString(), name);
    } else {
      setValue(label.toString(), "");
    }
  };

  return (
    <div className="w-full h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchArea
          name="keyword"
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          setValue={setValue}
        />
        <FilterTable
          handleFilter={handleFilter}
          watch={watch}
          register={register}
        />
      </form>
      <div className="w-full h-full">
        {<ContentWrapper formData={getValues()} />}
      </div>
    </div>
  );
};

export default MainContainer;
