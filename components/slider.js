/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function Slider({ data }) {
  const router = useRouter();

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 md:basis-1/4 lg:basis-1/5 relative"
            onClick={() =>
              router.push(`/truyen-tranh/${item.href.split("/").pop()}`)
            }
          >
            <img
              src={item.thumbnail}
              key={index}
              alt={item.name}
              loading="lazy"
              className="object-cover w-[180px] lg:-[200px] h-[230px] cursor-pointer rounded-md"
            />
            <div
              className="absolute bottom-1 left-6  bg-neutral-700/70 w-[165px] h-10 rounded-md flex items-center justify-center space-y-4 hover:cursor-pointer"
              onClick={() =>
                router.push(`/truyen-tranh/${item.href.split("/").pop()}`)
              }
            >
              <span className="text-white text-center text-sm p-1 line-clamp-1">
                {item.name}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

Slider.Skeleton = function SliderLoading() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 md:basis-1/4 lg:basis-1/6"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
