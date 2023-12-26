"use client";

import { Button } from "@/components/ui/button";
import { BXH } from "@/constant";
import { useRouter } from "next/navigation";

export const Nav = () => {
  const router = useRouter();
  return (
    <nav className="flex flex-col space-y-2 justify-between mb-4">
      <span className="text-sm">Sắp xếp theo:</span>
      <div className="grid md:grid-cols-7 grid-cols-4  gap-2 ">
        {BXH.map((item, index) => (
          <Button
            key={index}
            variant="primary"
            onClick={() => router.push(item.href)}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </nav>
  );
};
