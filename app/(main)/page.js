"use client";

import axios from "axios";
import { Card } from "@/components/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ListItems } from "@/components/list-items";
import { Pagination } from "@/components/pagination";
import { Slider } from "@/components/slider";

export default function Home() {
  const [page, setPage] = useState(1);

  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const featData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1?page=${page}`
      );

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1?limit=9`
      );

      if (response.status == 200) {
        setData(response.data);
      }

      if (res.status == 200) {
        setItems(res.data);
      }
    };

    featData();
  }, [page]);

  const router = useRouter();

  return (
    <main className="flex flex-col space-y-6 md:space-y-8 lg:space-y-10 px-4 py-2">
      <div className="flex flex-col">
        <h3 className="uppercase text-[#2980b9] text-[20px] font-medium my-4">
          Truyện Hot
        </h3>
        {items.length > 0 ? <Slider data={items} /> : <Slider.Skeleton />}
      </div>
      <div className="flex flex-col">
        <h3 className="uppercase text-[#2980b9] text-[20px] font-medium my-4">
          Truyện Mới Cập Nhật
        </h3>
        <div className="flex justify-between space-x-6 w-full">
          <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2 lg:w-2/3 w-full">
            {data.length > 0 ? (
              <>
                {data.map((item, index) => {
                  return <Card key={index} item={item} />;
                })}
              </>
            ) : (
              <Card.Skeleton />
            )}
          </div>
          <div className="w-1/3 hidden  lg:flex flex-col space-y-4 border border-neutral-200 p-4 h-[100vh]">
            <div
              className="flex flex-col hover:cursor-pointer"
              onClick={() => router.push("/bxh")}
            >
              <h4 className="uppercase text-[#2980b9]  font-medium">
                Bảng Xếp Hạng
              </h4>
              <div className="h-[1px] bg-[#2980b9] w-1/2"></div>
            </div>

            {items.length > 0 ? (
              <ListItems data={items} />
            ) : (
              <ListItems.Skeleton />
            )}
          </div>
        </div>

        <Pagination page={page} setPage={setPage} />
      </div>
    </main>
  );
}
