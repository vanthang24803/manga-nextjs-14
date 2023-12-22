/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Folder, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const MangaSaved = () => {
  const [manga, setManga] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/wishlists`);
      if (response.status == 200) {
        console.log(response.data);
        setManga(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const router = useRouter();

  const onRemove = async (data) => {
    try {
      const response = await axios.delete(`/api/wishlists/${data.name}`);

      if (response.status == 200) {
        toast.dismiss();
        toast.success("Thành công");
        fetchData();
      } else {
        toast.dismiss();
        toast.error("Thất bại");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-8 md:my-10 w-full border border-neutral-200 rounded-md p-4 md:p-6">
      {manga.length != 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {manga.map((item, index) => {
            return (
              <div
                className="flex flex-col space-y-2 hover:cursor-pointer"
                key={index}
              >
                <div className="relative">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="object-cover h-[200px] w-[180px] rounded-md"
                    onClick={() => router.push(item.href)}
                  />
                  <Button
                    size="icon"
                    className="absolute top-2 right-4 md:right-2 w-8 h-8"
                    variant="destructive"
                    onClick={() => onRemove(item)}
                  >
                    <Trash className="w-5 h-5" />
                  </Button>
                </div>
                <span className="line-clamp-1">{item.name}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-32 md:h-40 flex flex-col space-y-2 items-center justify-center text-neutral-800/90">
          <Folder className="w-16 h-16" />
          <span className="text-sm">Empty Manga</span>
        </div>
      )}
    </div>
  );
};
