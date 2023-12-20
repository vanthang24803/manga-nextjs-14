"use client";

import { useEffect, useState } from "react";
import { UploadModal } from "@/components/modal/upload-modal";
import { UploadThumbnail } from "@/components/modal/upload-thumbnail";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <UploadModal />
      <UploadThumbnail />
    </>
  );
};
