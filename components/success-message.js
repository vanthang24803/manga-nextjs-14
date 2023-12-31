"use client";

import { BadgeCheck } from "lucide-react";

export const SuccessMessage = ({ message }) => {
  return (
    <div className="bg-emerald-500/10 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <BadgeCheck />
      <p>{message}</p>
    </div>
  );
};
