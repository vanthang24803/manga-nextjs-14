"use client";

import axios from "axios";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/categories`
      );

      if (response.status == 200) {
        setCategories(response.data);
      }
    };

    fetchData();
  }, []);

  return (
    <nav className="fixed top-0 w-full h-14 px-4 border-b shadow-sm dark:bg-slate-700 bg-white flex items-center z-50">
      <div className="md:max-w-screen-lg mx-auto flex items-center w-full justify-between">
        <div className="flex items-center space-x-8">
          <Logo />
          <Navigation categories={categories} />
        </div>
        <div className="flex items-center space-x-4">
          <Button>Login</Button>
        </div>
      </div>
    </nav>
  );
};
