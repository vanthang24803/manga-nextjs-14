"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, SendHorizonal, Settings, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Emoji } from "./emoji";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  content: z.string().min(1).max(255),
});

export const CommentItem = ({ item, currentUser }) => {
  const router = useRouter();
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  console.log(item.content);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: item.content,
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
      setLoading(true);
      const response = await axios.patch(`/api/comment/${item.id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        setLoading(false);
        form.reset();
        router.refresh();
        toast.success("Thành công!");
        setUpdate(false);
      } else {
        setLoading(false);
        toast.error("Vui lòng thử lại");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onRemove = async () => {
    try {
      const response = await axios.delete(`/api/comment/${item.id}`);

      if (response.status == 200) {
        router.refresh();
        toast.success("Thành công!");
      } else {
        toast.error("Vui lòng thử lại");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-3">
        <Link href={`/profile/${item.userId}`}>
          <Avatar>
            <AvatarImage src={item.avatar} alt={item.authorName} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </Link>

        <div
          className={cn(
            "bg-neutral-100/95 rounded-md px-4 py-2 flex flex-col",
            update && "w-[260px] md:w-[500px]"
          )}
        >
          <Link
            href={`/profile/${item.userId}`}
            className="font-medium hover:cursor-pointer"
          >
            {item.authorName}
          </Link>
          {update ? (
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
                <div className="flex items-center space-x-3">
                  <Button type="submit" size="icon" disabled={loading}>
                    <SendHorizonal className="w-4 h-4" />
                  </Button>
                  <Button variant="link" onClick={() => setUpdate(!update)}>
                    Huỷ
                  </Button>
                </div>
              </form>
            </FormProvider>
          ) : (
            <span>{item.content}</span>
          )}
        </div>
      </div>
      {currentUser?.user.email == item.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button size="icon" variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuItem
              className="flex items-center justify-between hover:cursor-pointer"
              onClick={() => setUpdate(!update)}
            >
              <span>Chỉnh sửa</span>
              <Settings className="w-4 h-4" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-between hover:cursor-pointer"
              onClick={onRemove}
            >
              <span>Xóa</span>
              <Trash className="w-4 h-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
