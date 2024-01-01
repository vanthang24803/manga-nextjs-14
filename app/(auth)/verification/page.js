"use client";

import { Logo } from "@/components/logo";
import { Spinner } from "@/components/spinner";
import { useCallback, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { SuccessMessage } from "@/components/success-message";
import { ErrorMessage } from "@/components/error-message";

export default function Verification() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="md:w-[400px] w-[360px] py-4 px-6 bg-white/90 rounded-lg  flex flex-col space-y-5">
      <Logo />
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">Verification</h2>
        <span className="text-neutral-800 text-sm">your account !</span>
        {!success && !error && (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        )}
        <div className="my-4 space-y-3">
          {error == "" && <SuccessMessage message={success} />}
          {error != "" && <ErrorMessage message={error} />}
        </div>
      </div>
    </div>
  );
}
