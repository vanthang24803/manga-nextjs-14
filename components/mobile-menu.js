"use client";

import { MobileMenuData } from "@/constant";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        <div className="flex flex-col space-y-3 p-4 my-4">
          {MobileMenuData.map((item, index) => {
            return (
              <Link href={item.href} key={index} className="text-center">
                <Button variant="ghost">{item.name}</Button>
              </Link>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};
