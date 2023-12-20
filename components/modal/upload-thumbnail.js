/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { UploadButton } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import { useState } from "react";
import { Image, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useThumbnail } from "@/hooks/use-thumbnail";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const UploadThumbnail = () => {
  const router = useRouter();
  const modal = useThumbnail();
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState("");

  const { handleSubmit } = useForm();

  const onSubmit = async (data) => {
    data.url = thumbnail;
    try {
      setLoading(true);
      const response = await axios.patch(`/api/thumbnail`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        modal.onClose();
        router.refresh();
        toast.success("Cập nhật ảnh bìa thành công!");
        setLoading(false);
        setSetting(false);
      } else {
        toast.success("Cập nhật ảnh bìa thất bại!");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent>
        <form
          className="flex flex-col justify-between items-center space-y-4 px-4 py-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-center relative">
            {thumbnail == "" ? (
              <div className="md:w-[400px] w-[300px] h-44 rounded-md border border-neutral-300/90 flex items-center justify-center hover:cursor-pointer border-dashed">
                <Image className="w-16 h-16" />
              </div>
            ) : (
              <>
                <img
                  src={thumbnail}
                  className="object-cover h-44 rounded-md md:w-[400px] w-full mb-4"
                  alt="thumbnail"
                />
                <div
                  className="w-6 h-6 flex items-center justify-center absolute -top-2 bg-red-500 border rounded-full text-white -right-2 hover:cursor-pointer"
                  onClick={() => setThumbnail("")}
                >
                  <X className="w-4 h-4" />
                </div>
              </>
            )}
          </div>
          {thumbnail != "" ? (
            <Button className="w-full" type="submit" disabled={loading}>
              Submit
            </Button>
          ) : (
            <div className="bg-blue-300 text-white rounded-md h-10 mx-16 w-1/2">
              <UploadButton
                endpoint="productImage"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  setThumbnail(res[0].url);
                  toast.success("Upload Completed");
                }}
                onUploadError={(error) => {
                  // Do something with the error.
                  console.log(`ERROR! ${error.message}`);
                }}
              />
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
