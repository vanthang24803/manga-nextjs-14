"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

export const Saved = ({ data , url }) => {


  const dataSend = {
    name: data.name,
    thumbnail: data.thumbnail,
    views: data.views,
    href: `/truyen-tranh/${url}`,
  };

  const onSubmit = async () => {
    try {
      toast.loading("Vui lòng đợi!");
      const response = await axios.post(`/api/wishlists`, dataSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        toast.dismiss();
        toast.success("Thành công");
      } else {
        toast.dismiss();
        toast.error("Thất bại");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button variant="primary" onClick={onSubmit}>
      Follow
    </Button>
  );
};
