/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Instagram } from "lucide-react";

export const Panel = ({ data }) => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="relative">
        <div className="relative">
          <img
            src={data.thumbnail}
            alt={data.id}
            className="w-full max-h-[300px] rounded-md object-cover"
          />
          <div className="absolute right-2 w-10 h-10 flex items-center justify-center rounded-md bg-white text-black bottom-1 hover:cursor-pointer">
            <Camera className="w-6 h-6" />
          </div>
        </div>
        <div className="absolute -bottom-20 m-4 border-2 border-white rounded-full left-[30%] md:left-[38%] lg:left-[40%]">
          <div className="relative">
            <Avatar className="w-40 h-40">
              <AvatarImage src={data.image} />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-200/90 bottom-1 hover:cursor-pointer">
              <Instagram className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
      <h1 className="pt-16 text-center font-medium text-2xl">{data.name}</h1>
    </div>
  );
};
