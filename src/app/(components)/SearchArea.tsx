"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { FormData } from "@/constants/filtering";
import _ from "lodash";

const SearchArea = ({
  name,
  register,
  setValue,
  handleSubmit,
  onSubmit,
}: {
  name: string;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FormData, FormData>;
  onSubmit: (data: FormData) => void;
  setValue: UseFormSetValue<FormData>;
}) => {
  // 현재 포커싱 되어있는 상태
  const [isFocused, setIsFocused] = useState(false);
  // 포커싱이 되어있다면
  const handleFocus = () => {
    setIsFocused(true);
  };
  // 포커싱이 되어있지 않다면
  const handleBlur = () => {
    setIsFocused(false);
  };

  // 사용자가 input 태그에 무언가를 입력했다면 실행 할 함수, lodash의 debounce함수를 통해 300ms 후 실행
  const handleChange = useMemo(
    () =>
      _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.name, e.target.value);
        handleSubmit(onSubmit)();
      }, 300),
    []
  );

  return (
    <div
      className={`w-full flex border bg-white ${
        isFocused ? "border-blue-500" : "border-[rgb(201,202,204)]"
      } my-3 py-3 rounded-[4px]`}
    >
      <Image
        src="/search.svg"
        className="mx-4"
        alt="검색 아이콘"
        width={20}
        height={20}
      />
      <input
        className="w-full h-full focus:outline-none"
        placeholder="배우고 싶은 언어, 기술을 검색해 보세요"
        id={name}
        onFocus={handleFocus}
        {...register(name, { onBlur: handleBlur, onChange: handleChange })}
      />
    </div>
  );
};

export default SearchArea;
