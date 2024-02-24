import {
  courseType,
  category,
  level,
  programmingLanguage,
  price,
  format,
} from "@/constants/filtering";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import FilterElements from "./Elements";

const FilterTable = ({
  handleFilter,
  watch,
  register,
}: {
  handleFilter: (name: string, label: number) => void;
  watch: (name: string, defaultValue?: string | undefined) => string;
  register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
}) => {
  return (
    <table className="w-full bg-white font-bold">
      <tbody className="border">
        <tr className="border">
          <td className="min-w-24 py-[0.875rem] px-4 text-sm border-r bg-stone-100">
            유형
          </td>
          <FilterElements
            course={courseType}
            handleFilter={handleFilter}
            watch={watch}
            register={register}
          />
        </tr>
        <tr className="border">
          <td className="min-w-24 py-[0.875rem] px-4 text-sm border-r bg-stone-100">
            진행방식
          </td>
          <FilterElements
            course={format}
            handleFilter={handleFilter}
            watch={watch}
            register={register}
          />
        </tr>
        <tr className="border">
          <td className="min-w-24 py-[0.875rem] px-4 text-sm border-r bg-stone-100">
            분야
          </td>
          <FilterElements
            course={category}
            handleFilter={handleFilter}
            watch={watch}
            register={register}
          />
        </tr>
        <tr className="border">
          <td className="min-w-24 py-[0.875rem] px-4 text-sm border-r bg-stone-100">
            난이도
          </td>
          <FilterElements
            course={level}
            handleFilter={handleFilter}
            watch={watch}
            register={register}
          />
        </tr>
        <tr className="border">
          <td className="min-w-24 py-[0.875rem] px-4 text-sm border-r bg-stone-100">
            언어
          </td>
          <FilterElements
            course={programmingLanguage}
            handleFilter={handleFilter}
            watch={watch}
            register={register}
          />
        </tr>
        <tr className="border">
          <td className="min-w-24 py-[0.875rem] px-4 text-sm border-r bg-stone-100">
            가격
          </td>
          <FilterElements
            course={price}
            handleFilter={handleFilter}
            watch={watch}
            register={register}
          />
        </tr>
      </tbody>
    </table>
  );
};

export default FilterTable;
