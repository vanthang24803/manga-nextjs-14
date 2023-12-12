/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import axios from "axios";
import { Card } from "@/components/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/pagination";
import { ListCategories } from "@/components/list-categories";

export default function Categories({ params }) {
  const [page, setPage] = useState(1);

  const [data, setData] = useState([]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const featData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1?page=${page}`
      );

      if (response.status == 200) {
        setData(response.data);
      }
    };

    featData();
  }, [page]);

  useEffect(() => {
    const featData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/categories`
      );

      if (response.status == 200) {
        setCategories(response.data);
      }
    };

    featData();
  }, []);

  const [first, ...category] = categories;

  const router = useRouter();

  return (
    <main className="flex flex-col space-y-6 md:space-y-8 lg:space-y-10 my-4 md:my-8 lg:my-12 px-4 py-2">
      <div className="flex flex-col">
        <h3 className="uppercase text-[#2980b9] text-[20px] font-medium my-4">
          Tìm Truyện
        </h3>
        <div className="flex justify-between space-x-6">
          <div className="grid md:grid-cols-4 grid-col-2 gap-4 lg:w-2/3 w-full">
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
          <div className="w-1/3 hidden  lg:flex flex-col space-y-4 border border-neutral-200 p-4 h-[130vh]">
            <div
              className="flex flex-col hover:cursor-pointer"
              onClick={() => router.push("/bxh")}
            >
              <h4 className="uppercase text-[#2980b9]  font-medium">
                Thể Loại
              </h4>
              <div className="h-[1px] bg-[#2980b9] w-1/2"></div>
            </div>
            {categories.length > 0 ? (
              <ListCategories data={category} />
            ) : (
              <ListCategories.Skeleton />
            )}
          </div>
        </div>
        <Pagination page={page} setPage={setPage} />
      </div>
    </main>
  );
}
