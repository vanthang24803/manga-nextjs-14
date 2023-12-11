/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import axios from "axios";
import { Card } from "@/components/card";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Manga() {
  const [page, setPage] = useState(1);

  const [data, setData] = useState([]);

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

  return (
    <div className=" py-20 grid grid-cols-6 gap-8">
      {data.length > 0 ? (
        <>
          {data.map((item, index) => {
            return <Card key={index} item={item} />;
          })}
        </>
      ) : (
        <>Loading</>
      )}

      <div className="flex items-center space-x-2">
        <Button onClick={() => setPage(page + 1)}>
          <Plus />
        </Button>
        <Button onClick={() => setPage(page - 1)}>
          <Minus />
        </Button>
      </div>
    </div>
  );
}
