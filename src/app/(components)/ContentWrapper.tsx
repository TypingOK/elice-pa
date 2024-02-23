"use client";

import { FormData } from "@/constants/filtering";
import { useCourseFetch } from "@/hooks/useCourseFetch";
import { Cousrse } from "@/types/OrgCourse";
import Image from "next/image";
import { useEffect, useState } from "react";

const ContentWrapper = ({ formData }: { formData: FormData }) => {
  const [offsetState, setOffsetState] = useState<number>(0);
  const { data, refetch } = useCourseFetch(formData, offsetState);

  useEffect(() => {
    refetch();
  }, [formData, refetch]);

  return (
    <div className="w-full">
      <div className="w-full text-xs my-1 py-2 border-b border-stone-500">
        전체 {data && data.course_count} 개
      </div>

      <div className={`w-full flex flex-wrap gap-4 justify-start`}>
        {data &&
          data.courses &&
          data.courses.map((course: Cousrse) => (
            <div
              className="w-[296px] h-[338px] flex flex-col border-none rounded-lg bg-white py-7 px-6"
              key={course.id}
            >
              <div className="h-6 w-full text-xs flex items-start text-[#524fa1]">
                {course.tags.length === 0 ? (
                  <div>미설정</div>
                ) : (
                  <div className="flex line-clamp-1">
                    {course.tags.map(
                      (tag: { id: number; tag_type: number; name: string }) => (
                        <div key={tag.id} className="mr-2">
                          {tag.name}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
              {/* 타이틀 */}
              <div className="text-lg w-full h-14 leading-[1.6rem] font-bold line-clamp-2">
                {course.title}
              </div>
              {/* 설명 */}
              <div className="text-sm leading-[1.6rem]  w-full h-20  text-[#5e5f61]">
                <div className="line-clamp-2">{course.short_description}</div>
              </div>
              {/* 아이콘과 텍스트 그리고 로고 */}
              <div className="w-full flex justify-between">
                <div className="text-[#7d7e80] text-xs">
                  <div className="flex h-6">
                    <div className="flex h-full items-center">
                      <div className="relative w-6 h-6 mr-2">
                        <Image src={"/graph.svg"} alt="그래프" fill />
                      </div>
                      <span className="flex h-full items-center">
                        난이도 : 미설정
                      </span>
                    </div>
                  </div>
                  <div className="flex h-6">
                    <div className="flex h-full items-center">
                      <div className="relative w-6 h-6 mr-2">
                        <Image src={"/laptop.svg"} alt="그래프" fill />
                      </div>
                      <span className="flex h-full items-center">
                        수업 : 온라인
                      </span>
                    </div>
                  </div>
                  <div className="flex h-6">
                    <div className="flex h-full items-center">
                      <div className="relative w-6 h-6 mr-2">
                        <Image src={"/calendar.svg"} alt="그래프" fill />
                      </div>
                      <span className="flex h-full items-center">
                        기간 : 무제한
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative w-[52px] h-[52px]">
                  {course.logo_file_url && (
                    <Image src={course.logo_file_url} alt="강의 로고" fill />
                  )}
                </div>
              </div>
              <div className="mt-auto text-xs font-bold pt-4 border-t text-[#524fa1]">
                {course && course.enroll_type === 0 ? (
                  course.is_free ? (
                    <div className="text-[#00ab53]">무료</div>
                  ) : (
                    <div className="text-black">유료</div>
                  )
                ) : (
                  <div>구독</div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContentWrapper;
