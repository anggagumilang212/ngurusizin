import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function LoadingLayanan() {
  return (
    <div className="flex flex-col">
      <div className="p-4 bg-white shadow-md rounded-3xl">
        <div className="flex-none lg:flex">
          <div className="w-full h-full mb-3 lg:h-48 lg:w-48 lg:mb-0">
            <Skeleton height={150} width={180} />
          </div>
          <div className="flex-auto py-2 ml-3 justify-evenly">
            <div className="flex flex-wrap ">
              <h2 className="flex-auto text-lg font-medium">
                <Skeleton />
              </h2>
            </div>
            <p className="mb-5 text-gray-500 max-w-80">
              <Skeleton count={3} />
            </p>
            <div className="flex space-x-3 text-sm font-medium">
              <div className="flex flex-auto space-x-3">
                <button className="inline-flex items-center px-4 py-2 mb-2 space-x-2 tracking-wider text-gray-600 bg-white border rounded-full shadow-sm md:mb-0 hover:bg-gray-100 ">
                  <Skeleton width={80} />
                </button>
              </div>
              <Skeleton height={40} width={100} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
