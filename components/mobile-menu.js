"use client";

import Link from "next/link";
import { MobileMenuData } from "@/constant";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchMobile } from "@/components/mobile-search";

export const MobileMenu = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden block">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col space-y-4 mt-8">
          <SearchMobile />
          <div className="flex flex-col space-y-3 p-4 my-4">
            {MobileMenuData.map((item, index) => {
              return (
                <Link href={item.href} key={index} className="text-center">
                  <Button variant="ghost">{item.name}</Button>
                </Link>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
