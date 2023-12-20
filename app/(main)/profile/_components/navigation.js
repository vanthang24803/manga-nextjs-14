"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Settings } from "lucide-react";
import { Information } from "./information";

export const Navigation = ({ data }) => {
  const [currentTab, setCurrentTab] = useState("information");

  return (
    <div className="flex flex-col space-y-4 px-4 lg:px-0">
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div
            className="flex flex-col space-y-1 cursor-pointer "
            onClick={() => setCurrentTab("information")}
          >
            <span>Thông tin</span>
            <Separator
              className={`h-[2px] ${
                currentTab === "information" ? "bg-blue-300" : "bg-white"
              }`}
            />
          </div>

          <div
            className="flex flex-col space-y-1 cursor-pointer"
            onClick={() => setCurrentTab("mangaSaved")}
          >
            <span>Truyện đã lưu</span>
            <Separator
              className={`h-[2px] ${
                currentTab === "mangaSaved" ? "bg-blue-300" : "bg-white"
              }`}
            />
          </div>
        </div>
        <Button size="icon"
          onClick={() => setCurrentTab("settings")}
        >
          <Settings />
        </Button>
      </nav>
      {currentTab === "information" && (
        <Information data={data}/>
      )}

      {currentTab === "settings" && <>Setting</>}
    </div>
  );
};
