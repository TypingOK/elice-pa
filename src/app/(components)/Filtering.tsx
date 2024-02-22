"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import SearchArea from "./SearchArea";


export interface FormData {
  [key: string]: string;
}

const FilteringWrapper = () => {
  const { setValue, register, handleSubmit, getValues } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    console.log(data);
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
      
    </form>
  );
};

export default FilteringWrapper;
