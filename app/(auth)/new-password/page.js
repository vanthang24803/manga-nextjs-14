/* eslint-disable @next/next/no-img-element */
"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { SuccessMessage } from "@/components/success-message";
import { ErrorMessage } from "@/components/error-message";

const formSchema = z.object({
  password: z.string().min(1),
});

export default function Password() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await axios.patch(
        `/api/new-password`,
        { password: data.password, token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        setLoading(false);
        setSuccess("Password Updated");
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
        <h2 className="text-xl font-semibold">Change password</h2>
        <span className="text-neutral-700/90 text-sm">update new password</span>
      </div>

      <FormProvider {...form}>
        <form
          className="flex flex-col space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-sm">New password</span>
                    <Input {...field} autoComplete={false} type="password" />
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
      <Button variant="primary" onClick={() => router.push("/login")}>
        Back to login
      </Button>

      {success != "" && <SuccessMessage message={success} />}
      {error != "" && <ErrorMessage message={error} />}
    </div>
  );
}
