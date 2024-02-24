import { Suspense } from "react";
import FilteringWrapper from "./(components)/MainContainer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const Page = () => {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<LoadingSpinner />}>
        <FilteringWrapper />
      </Suspense>
    </div>
  );
};

export default Page;
