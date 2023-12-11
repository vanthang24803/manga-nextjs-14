/* eslint-disable @next/next/no-img-element */
"use client";

import { Eye, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export const Card = ({ item }) => {
  const router = useRouter();
  return (
    <div className="">
      <div
        onClick={() =>
          router.push(`/truyen-tranh/${item.href.split("/").pop()}`)
        }
        className="hover:cursor-pointer"
      >
        <div className="relative group">
          <img
            src={item.thumbnail}
            alt={item.name}
            loading="lazy"
            className="object-cover w-[180px] lg:-[200px] h-[230px] cursor-pointer"
          />
          <div className="absolute flex bottom-0 left-0 p-1 text-white items-center justify-between text-[12px] font-medium px-2 bg-neutral-400/80 lg:w-[150px] w-[160px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span> {item.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-4 h-4" />
              <span> {item.views}</span>
            </div>
          </div>
          <div className="absolute top-2 left-2 p-1 bg-red-400 text-white rounded-md text-[12px]">
            {item.followers}
          </div>
        </div>

        <span className="text-sm line-clamp-2 font-medium mt-2 hover:text-[#2980b9]">
          {item.name}
        </span>
      </div>
    </div>
  );
};
