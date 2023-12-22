"use client";

import { useModal } from "@/hooks/use-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UploadButton, UploadDropzone, Uploader } from "@/lib/uploadthing";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

export const UploadModal = () => {
  const router = useRouter();
  const modal = useModal();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");

  const { handleSubmit } = useForm();

  const onSubmit = async (data) => {
    data.url = avatar;
    try {
      setLoading(true);
      toast.loading("Vui lòng đợi")
      const response = await axios.patch(`/api/avatar`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        toast.dismiss();
        modal.onClose();
        router.refresh();
        toast.success("Cập nhật ảnh đại diện thành công!");
        setLoading(false);
        setSetting(false);
      } else {
        toast.dismiss();
        toast.success("Cập nhật ảnh đại diện thất bại!");
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
          className="flex flex-col justify-between items-center space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-center relative">
            <Avatar className="w-40 h-40">
              <AvatarImage src={avatar} />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            {avatar != "" && (
              <div
                className="w-6 h-6 flex items-center justify-center absolute top-4 bg-red-500 border rounded-full text-white right-0 hover:cursor-pointer"
                onClick={() => setAvatar("")}
              >
                <X className="w-4 h-4" />
              </div>
            )}
          </div>
          {avatar != "" ? (
            <Button className="w-1/2" type="submit" disabled={loading}>
              Submit
            </Button>
          ) : (
            <div className="bg-blue-300 text-white rounded-md h-10 mx-16 w-1/2">
              <UploadButton
                endpoint="productImage"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  setAvatar(res[0].url);
                  toast.dismiss();
                  toast.success("Tải lên thành công");
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
