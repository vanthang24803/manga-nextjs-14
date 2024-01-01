/* eslint-disable @next/next/no-img-element */
"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { SuccessMessage } from "@/components/success-message";
import { ErrorMessage } from "@/components/error-message";

const formSchema = z.object({
  email: z.string().min(1),
});

export default function Reset() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await axios.post(`/api/reset-password`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        setLoading(false);
        setSuccess("Confirm email send");
      }
    } catch (error) {
      if (error.response.status == 404) {
        setError("Email not found");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-[400px] w-[360px] py-4 px-6 bg-white/90 rounded-lg  flex flex-col space-y-5">
      <Logo />

      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">Forgot password</h2>
        <span className="text-neutral-700/90 text-sm">
          enter email to reset password
        </span>
      </div>

      <FormProvider {...form}>
        <form
          className="flex flex-col space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-sm">Email address</span>
                    <Input {...field} autoComplete={false} placeholder="example@mail.com" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            Send Email
          </Button>
        </form>
      </FormProvider>

      {success != "" && <SuccessMessage message={success} />}
      {error != "" && <ErrorMessage message={error} />}
    </div>
  );
}
