/* eslint-disable @next/next/no-img-element */
"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  return (
    <div className="md:w-[400px] w-[360px] py-4 px-6 bg-white/90 rounded-lg  flex flex-col space-y-5">
      <Logo />

      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">Register</h2>
        <span className="text-neutral-800 text-sm">create an account ?</span>
      </div>

      <form className="flex flex-col space-y-3">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex flex-col space-y-1">
            <span className="font-medium text-sm">First name</span>
            <Input />
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-medium text-sm">Last name</span>
            <Input />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-medium text-sm">Email address</span>
          <Input type="email" />
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-medium text-sm">Password</span>
          <Input type="password" />
        </div>

        <Button>Submit</Button>
      </form>

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
