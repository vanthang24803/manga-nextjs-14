"use client";

import { AlertTriangle } from "lucide-react";

export const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-destructive/10 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <AlertTriangle />
      <p>{message}</p>
    </div>
  );
};
