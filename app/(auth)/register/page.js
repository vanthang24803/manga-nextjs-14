/* eslint-disable @next/next/no-img-element */
"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import toast from "react-hot-toast";
import { ErrorMessage } from "@/components/error-message";
import { SuccessMessage } from "@/components/success-message";
import { Lato } from "next/font/google";

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1),
  password: z.string().min(1),
});

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        setError("");
        toast.success("Thành công");
        setSuccess("Xác thực email của bạn!");
        setLoading(false);
      }
    } catch (error) {
      setSuccess("");
      setLoading(false);
      if (error.response.status) {
        setError("Email đã được đăng ký!");
      } else {
        setError("Đã có lỗi xảy ra");
      }
    }
  };

  return (
    <div className="md:w-[400px] w-[360px] py-4 px-6 bg-white/90 rounded-lg  flex flex-col space-y-5">
      <Logo />

      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">Register</h2>
        <span className="text-neutral-800 text-sm">create an account ?</span>
      </div>

      <FormProvider {...form}>
        <form
          className="flex flex-col space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-between space-x-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium text-sm">First name</span>
                      <Input {...field} autoComplete="off" />
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
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium text-sm">Last name</span>
                      <Input {...field} autoComplete="off" />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-sm">Email address</span>
                    <Input {...field} autoComplete="off" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-sm">Password</span>
                    <Input type="password" {...field} autoComplete="off" />
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
      {error != "" && <ErrorMessage message={error} />}
      {success != "" && <SuccessMessage message={success} />}

      <div className="flex items-center space-x-2 text-sm">
        <span className="mt-4 text-neutral-600">Have an account?</span>
        <span
          className="mt-4 text-blue-600 hover:cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Login now
        </span>
      </div>
    </div>
  );
}
