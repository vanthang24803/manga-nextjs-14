"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import toast from "react-hot-toast";

export const SettingAccount = ({ user }) => {
  const [anonymous, setAnonymous] = useState(user.anonymous);

  const handleAnonymous = async () => {
    const newAnonymous = !anonymous;
    setAnonymous(newAnonymous);
    const dataSend = {
      anonymous: newAnonymous,
    };

    try {
      const response = await axios.patch(`/api/anonymous`, dataSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        toast.success("Thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col my-8 md:my-10 space-y-4">
      <div className="w-full border border-neutral-200 rounded-md p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <h2 className="font-bold">Chế độ ẩn danh</h2>
            <span className="text-sm text-neutral-700">
              Kích hoạt để ẩn danh khi sử dụng website
            </span>
          </div>
          <Switch
            defaultChecked={anonymous}
            onCheckedChange={handleAnonymous}
          />
        </div>
      </div>
      <div className="w-full border border-neutral-200 rounded-md p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <h2 className="font-bold">Chế độ tối</h2>
            <span className="text-sm text-neutral-700">
              Kích hoạt để sử dụng Darkmode
            </span>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
};
