"use client";

import { Smile } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Emoji = ({ onChange }) => {
  return (
    <div className="absolute right-2 top-2 hover:cursor-pointer">
      <Popover>
        <PopoverTrigger>
          <Smile className="text-zinc-500" />
        </PopoverTrigger>
        <PopoverContent
          side="right"
          sideOffset={40}
          className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
        >
          <Picker
            data={data}
            onEmojiSelect={(emoji) => onChange(emoji.native)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
