"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Emoji } from "./emoji";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const formSchema = z.object({
  content: z.string().min(1),
});

export const CommentForm = ({ currentUser, url }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubmit = async (data) => {
    try {
      const dataSend = {
        mangaId: url,
        content: data.content,
      };
      setLoading(true);
      const response = await axios.post(`/api/comment`, dataSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        setLoading(false);
        form.reset();
        router.refresh();
        toast.success("Thành công!");
      } else {
        setLoading(false);
        toast.error("Vui lòng thử lại");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      {currentUser ? (
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-3"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={loading}
                        placeholder="Nhập vào bình luận!"
                        {...field}
                      />
                      <Emoji
                        onChange={(emoji) =>
                          field.onChange(`${field.value} ${emoji}`)
                        }
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full md:w-1/3"
              disabled={loading}
            >
              Submit
            </Button>
          </form>
        </FormProvider>
      ) : (
        <div
          className="flex items-center space-x-3 hover:cursor-pointer"
          onClick={() => router.push(`/login`)}
        >
          <AlertTriangle />
          <span className="hover:underline">
            Vui lòng đăng nhập để dùng tính năng này!
          </span>
        </div>
      )}
    </div>
  );
};
