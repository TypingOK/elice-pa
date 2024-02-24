import { Badge } from "@/components/ui/badge";
import { Filter } from "@/types/filter";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

const FilterElements = ({
  course,
  handleFilter,
  watch,
  register,
}: {
  course: Filter;
  handleFilter: (name: string, label: number) => void;
  watch: (name: string, defaultValue?: string | undefined) => string;
  register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
}) => {
  return (
    <td className="p-2">
      {Object.keys(course.filter).map((e) => (
        <Badge
          key={course.filter[e].index}
          onClick={() => {
            handleFilter(e, course.filter[e].index);
          }}
          variant={
            watch(course.filter[e].index.toString()) === e
              ? "default"
              : "outline"
          }
          className={`min-w-[1.875rem] mx-2 my-1 `}
          {...register(course.filter[e].index.toString())}
        >
          {e}
        </Badge>
      ))}
    </td>
  );
};

export default FilterElements;
