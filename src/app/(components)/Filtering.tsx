"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import SearchArea from "./SearchArea";
import {
  category,
  courseType,
  format,
  level,
  price,
  programmingLanguage,
} from "@/constants/filtering";
import { Badge } from "@/components/ui/badge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface FormData {
  [key: string]: string;
}

function isNumeric(str: string) {
  return /^[0-9]+$/.test(str);
}

const FilteringWrapper = () => {
  const { setValue, register, handleSubmit, getValues, watch } =
    useForm<FormData>();
  const searchParams = useSearchParams();
  console.log(searchParams.getAll("courseType"));

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    console.log(data);
    let path = "";
    Object.keys(data).forEach((e) => {
      if (data[e] && data[e] !== "") {
        if (isNumeric(e)) {
          const index = parseInt(e);
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
      if (e === "keyword" && data[e] !== "") {
        path += `&keyword=${data[e]}`;
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <SearchArea
        name="keyword"
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        setValue={setValue}
      />
      <table className="w-full">
        <tbody className="border">
          <tr className="border">
            <td className="min-w-24 py-[0.875rem] px-4 text-sm border-r bg-stone-100">
              유형
            </td>
            <td className="p-2">
              {Object.keys(courseType.filter).map((e) => (
                <Badge
                  key={courseType.filter[e].index}
                  onClick={() => {
                    handleFilter(e, courseType.filter[e].index);
                  }}
                  variant={
                    watch(courseType.filter[e].index.toString()) === e
                      ? "default"
                      : "outline"
                  }
                  className={`min-w-[1.875rem] mx-2 my-1 `}
                  {...register(courseType.filter[e].index.toString())}
                >
                  {e}
                </Badge>
              ))}
            </td>
          </tr>
          <tr className="border">
            <td className="min-w-24 py-[0.875rem] px-4 text-sm border-r bg-stone-100">
              진행방식
            </td>
            <td className="p-2">
              {Object.keys(format.filter).map((e) => (
                <Badge
                  key={format.filter[e].index}
                  onClick={() => {
                    handleFilter(e, format.filter[e].index);
                  }}
                  variant={
                    watch(format.filter[e].index.toString()) === e
                      ? "default"
                      : "outline"
                  }
                  className={`min-w-[1.875rem] mx-2 my-1`}
                  {...register(format.filter[e].index.toString())}
                >
                  {e}
                </Badge>
              ))}
            </td>
          </tr>
          <tr className="border">
            <td className="min-w-24 py-[0.875rem] px-4 text-sm border-r bg-stone-100">
              분야
            </td>
            <td className="p-2">
              {Object.keys(category.filter).map((e) => (
                <Badge
                  key={category.filter[e].index}
                  onClick={() => {
                    handleFilter(e, category.filter[e].index);
                  }}
                  variant={
                    watch(category.filter[e].index.toString()) === e
                      ? "default"
                      : "outline"
                  }
                  className={`min-w-[1.875rem] mx-2 my-1`}
                  {...register(category.filter[e].index.toString())}
                >
                  {e}
                </Badge>
              ))}
            </td>
          </tr>
          <tr className="border">
            <td className="min-w-24 py-[0.875rem] px-4 text-sm border-r bg-stone-100">
              난이도
            </td>
            <td className="p-2">
              {Object.keys(level.filter).map((e) => (
                <Badge
                  key={level.filter[e].index}
                  onClick={() => {
                    handleFilter(e, level.filter[e].index);
                  }}
                  variant={
                    watch(level.filter[e].index.toString()) === e
                      ? "default"
                      : "outline"
                  }
                  className={`min-w-[1.875rem] mx-2 my-1`}
                  {...register(level.filter[e].index.toString())}
                >
                  {e}
                </Badge>
              ))}
            </td>
          </tr>
          <tr className="border">
            <td className="min-w-24 py-[0.875rem] px-4 text-sm border-r bg-stone-100">
              언어
            </td>
            <td className="p-2">
              {Object.keys(programmingLanguage.filter).map((e) => (
                <Badge
                  key={programmingLanguage.filter[e].index}
                  onClick={() => {
                    handleFilter(e, programmingLanguage.filter[e].index);
                  }}
                  variant={
                    watch(programmingLanguage.filter[e].index.toString()) === e
                      ? "default"
                      : "outline"
                  }
                  className={`min-w-[1.875rem] mx-2 my-1`}
                  {...register(programmingLanguage.filter[e].index.toString())}
                >
                  {e}
                </Badge>
              ))}
            </td>
          </tr>
          <tr className="border">
            <td className="min-w-24 py-[0.875rem] px-4 text-sm border-r bg-stone-100">
              가격
            </td>
            <td className="p-2">
              {Object.keys(price.filter).map((e) => (
                <Badge
                  key={price.filter[e].index}
                  onClick={() => {
                    handleFilter(e, price.filter[e].index);
                  }}
                  variant={
                    watch(price.filter[e].index.toString()) === e
                      ? "default"
                      : "outline"
                  }
                  className={`min-w-[1.875rem] mx-2 my-1`}
                  {...register(price.filter[e].index.toString())}
                >
                  {e}
                </Badge>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default FilteringWrapper;
