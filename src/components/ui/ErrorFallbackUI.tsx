"use client";

import { FallbackProps } from "react-error-boundary";
import { Badge } from "./badge";

const ErrorFallbackRender = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert" className="w-full h-full flex flex-col items-center p-5">
      <div className="mb-5">
        저런! 데이터를 불러오는 도중 에러가 발생 했습니다!
      </div>
      <Badge onClick={() => resetErrorBoundary()}>다시 시도</Badge>
    </div>
  );
};

export default ErrorFallbackRender;
