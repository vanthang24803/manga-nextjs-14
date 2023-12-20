"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PencilLine, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import toast from "react-hot-toast";

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1),
});

export const Information = ({ data }) => {
  const [setting, setSetting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.patch(`/api/profile`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        router.refresh();
        toast.success("Cập nhật thông tin thành công!");
        setLoading(false);
        setSetting(false);
      } else {
        toast.success("Cập nhật thông tin thất bại!");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="my-8 md:my-10 w-full border border-neutral-200 rounded-md p-4 md:p-6">
      {setting ? (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium">Chỉnh sửa tài khoản</h1>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => setSetting(!setting)}
            >
              <X />
            </Button>
          </div>

          <FormProvider {...form}>
            <form
              className="flex flex-col space-y-3 md:max-w-md w-full my-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <span className="font-medium text-sm">First name</span>
                        <Input {...field} />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <span className="font-medium text-sm">Last name</span>
                        <Input {...field} />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <span className="font-medium text-sm">Email</span>
                        <Input {...field} />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading}>
                Submit
              </Button>
            </form>
          </FormProvider>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium">Thông tin tài khoản</h1>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setSetting(!setting)}
            >
              <PencilLine />
            </Button>
          </div>
          <div className="flex flex-col md:max-w-md w-full my-4 space-y-2">
            <div className="flex items-center space-x-12">
              <span className="font-medium">Name:</span>
              <span>{data.name}</span>
            </div>
            <div className="flex items-center space-x-12">
              <span className="font-medium">Email:</span>
              <span>{data.email}</span>
            </div>
            <div className="flex items-center space-x-14">
              <span className="font-medium">Role:</span>
              <span className="uppercase">admin</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
