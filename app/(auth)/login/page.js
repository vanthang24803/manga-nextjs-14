/* eslint-disable @next/next/no-img-element */
"use client";

import * as z from "zod";
import { signIn } from "next-auth/react";
import { Logo } from "@/components/logo";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          console.log(callback.error);
        }

        if (callback?.ok) {
          router.back();
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="md:w-[400px] w-[360px] py-4 px-6 bg-white/90 rounded-lg  flex flex-col space-y-5">
      <Logo />

      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">Login</h2>
        <span className="text-neutral-800 text-sm">
          to continue to MangaDex
        </span>
      </div>

      <Button
        variant="outline"
        onClick={() => signIn("google")}
        className="flex items-center group justify-between px-4"
      >
        <div className="flex items-start space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png?20230822192911"
            alt="google"
            className="w-4 h-4 object-fill"
            loading="lazy"
          />
          <span className="text-neutral-700/90">Continue with Google</span>
        </div>
        <ArrowRight className="w-4 h-4 text-neutral-600/90 group-hover:translate-x-2 transition-all ease-in-out" />
      </Button>

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
                    <Input {...field} />
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
                    <Input type="password" {...field} />
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

      <div className="flex items-center space-x-2 text-sm">
        <span className="mt-4 text-neutral-600">No account?</span>
        <span
          className="mt-4 text-blue-600 hover:cursor-pointer"
          onClick={() => router.push("/register")}
        >
          Create now
        </span>
      </div>
    </div>
  );
}
