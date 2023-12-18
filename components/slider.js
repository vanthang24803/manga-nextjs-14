/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";

export const Slider = ({ data }) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(getSlideCount());
  const slideInterval = 3000;

  function getSlideCount() {
    if (typeof window !== "undefined") {
      return window.innerWidth > 1024 ? 5 : window.innerWidth > 640 ? 4 : 2;
    }
    return 5;
  }

  useEffect(() => {
    const handleResize = () => {
      setEnd(start + getSlideCount());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [start]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, slideInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [start]);

  const handleNext = () => {
    if (end < data.length) {
      setStart((prevStart) => prevStart + 1);
      setEnd((prevEnd) => prevEnd + 1);
    } else {
      setStart(0);
      setEnd(getSlideCount());
    }
  };

  const handlePrev = () => {
    if (start > 0) {
      setStart((prevStart) => prevStart - 1);
      setEnd((prevEnd) => prevEnd - 1);
    } else {
      setStart(data.length - getSlideCount());
      setEnd(data.length);
    }
  };

  const router = useRouter();

  return (
    <div className="relative w-full">
      <div
        className="absolute w-8 h-8 flex items-center justify-center rounded-full bg-white z-10 hover:cursor-pointer top-1/3 lg:top1/2 -left-4 border hover:scale-105"
        onClick={handlePrev}
      >
        <ChevronLeft />
      </div>
      <div className="flex overflow-x-hidden relative">
        {data.slice(start, end).map((item, index) => (
          <div
            key={index}
            className="lg:w-1/5 md:w-1/4 w-1/2"
            onClick={() =>
              router.push(`/truyen-tranh/${item.href.split("/").pop()}`)
            }
          >
            <img
              src={item.thumbnail}
              key={index}
              alt={item.name}
              loading="lazy"
              className="object-cover w-[180px] lg:-[200px] h-[230px] cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div
        className="absolute w-8 h-8 flex items-center justify-center rounded-full bg-white z-10 hover:cursor-pointer top-1/3 lg:top1/2 -right-4 border hover:scale-105"
        onClick={handleNext}
      >
        <ChevronRight />
      </div>
    </div>
  );
};

Slider.Skeleton = function SliderLoading() {
  return <Skeleton className="w-full h-[25vh] rounded bg-neutral-200" />;
};
