"use client";

import { FormData } from "@/constants/filtering";
import { useCourseFetch } from "@/hooks/useCourseFetch";
import { useEffect } from "react";

const ContentWrapper = ({ formData }: { formData: FormData }) => {
  const { data, refetch } = useCourseFetch(formData, 0);
  useEffect(() => {
    refetch();
  }, [formData, refetch]);

  return <div>tets</div>;
};

export default ContentWrapper;
