import { Dispatch, SetStateAction } from "react";

const ContentPagination = ({
  offsetState,
  course_count,
  setOffsetState,
}: {
  offsetState: number;
  course_count: number;
  setOffsetState: Dispatch<SetStateAction<number>>;
}) => {
  const totalPage = Math.ceil(course_count / 20);
  const nowPage = Math.ceil(offsetState / 20) + 1;
  let startPage = nowPage - 4;
  let endPage = nowPage + 4;
  if (startPage < 1) {
    startPage = 1;
    endPage = startPage + 8 <= totalPage ? startPage + 8 : totalPage;
  }
  if (endPage > totalPage) {
    endPage = totalPage;
    startPage = endPage - 8 > 0 ? endPage - 8 : 1;
  }
  return (
    <div className="flex w-full justify-center mt-6 mb-16">
      <button
        className={`flex justify-center items-center w-6 h-6  pb-[3px] rounded-sm text-2xl mx-[0.375rem] ${
          1 === nowPage ? `text-[#ccc]` : `text-[#222]`
        }`}
        disabled={1 === nowPage}
        onClick={() => {
          setOffsetState((prev) => prev - 20);
        }}
      >{`<`}</button>
      <>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={index + startPage}
            className={`w-6 h-6 rounded-sm mx-[0.375rem] ${
              index + startPage === nowPage
                ? `bg-[#524fa1] text-white`
                : `text-[#999]`
            }`}
            onClick={() => {
              setOffsetState((index + startPage - 1) * 20);
            }}
          >
            {index + startPage}
          </button>
        ))}
      </>
      <button
        className={`flex justify-center items-center w-6 text-2xl pb-[3px] h-6 rounded-sm mx-[0.375rem] ${
          endPage === nowPage ? `text-[#ccc]` : `text-[#222]`
        }`}
        disabled={endPage === nowPage}
        onClick={() => {
          setOffsetState((prev) => prev + 20);
        }}
      >{`>`}</button>
    </div>
  );
};

export default ContentPagination;
