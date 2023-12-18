/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import qs from "query-string";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SearchPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const ref = useRef(null);

  const search = searchParams.get("name");

  const [content, setContent] = useState(search || "");

  const [manga, setManga] = useState([]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/tim-truyen/?name=${content}`
        );
        setManga(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [content]);

  useEffect(() => {
    const query = {
      anime: content,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [router, content]);

  return (
    <div className="relative md:block hidden dark:border-white group" ref={ref}>
      <Input
        className="lg:w-[400px] h-8"
        onClick={() => setOpen(true)}
        onChange={handleInputChange}
      />
      <Search
        className="w-4 h-4 absolute top-2 right-2 hover:cursor-pointer
      group-hover:text-red-400"
      />
      {open && (
        <div className="w-[400px] min-h-[20vh]  rounded-md bg-neutral-100/90 dark:bg-neutral-700/90  p-4 md:absolute md:top-10 md:-right-2">
          {content !== "" ? (
            <ScrollArea className="w-full  max-h-[50vh] h-full">
              <div className="flex flex-col space-y-2">
                {manga.map((item, index) => {
                  return (
                    <div
                      className="flex space-x-3 hover:cursor-pointer"
                      key={index}
                      onClick={() => {
                        router.push(
                          `/truyen-tranh/${item.href.split("/").pop()}`
                        );
                        setOpen(false);
                      }}
                    >
                      <img
                        src={item.thumbnail}
                        alt="thubnail"
                        className="h-14 object-cover"
                        loading="lazy"
                      />
                      <div className="flex flex-col">
                        <h3 className="text-[14px] hover:text-red-400 hover:font-medium line-clamp-1">
                          {item.name}
                        </h3>
                        <span className="text-[12px] font-thin">
                          {item.views} lượt xem
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center h-[20vh]">
              <span>Nhập tên để tìm kiếm </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
