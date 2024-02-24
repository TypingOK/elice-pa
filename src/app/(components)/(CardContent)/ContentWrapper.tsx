"use client";

import { FormData } from "@/constants/filtering";
import { useCourseFetch } from "@/hooks/useCourseFetch";
import { Cousrse } from "@/types/orgCourse";
import { useEffect, useState } from "react";
import ContentCard from "./Card";
import ContentPagination from "./Pagination";

const ContentWrapper = ({ formData }: { formData: FormData }) => {
  const [offsetState, setOffsetState] = useState<number>(0);
  const { data, error } = useCourseFetch(formData, offsetState, 20);
  useEffect(() => {
    setOffsetState(0);
  }, [formData]);
  if (error) {
    throw error;
  }
  return (
    <div className="w-full">
      <div className="w-full text-xs mb-1 mt-8 py-2 border-b font-extrabold border-stone-500">
        {data && <>전체 {data.course_count} 개</>}
      </div>

      <div className={`w-full flex flex-wrap gap-4 mt-4 justify-start`}>
        {data &&
          data.courses &&
          data.courses.map((course: Cousrse) => (
            <ContentCard key={course.id} course={course} />
          ))}
      </div>

      {/* 페이지네이션 */}
      {data && data.course_count > 20 && (
        <ContentPagination
          course_count={data.course_count}
          offsetState={offsetState}
          setOffsetState={setOffsetState}
        />
      )}
    </div>
  );
};

export default ContentWrapper;
