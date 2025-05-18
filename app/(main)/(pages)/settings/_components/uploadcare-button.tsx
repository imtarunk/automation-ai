"use client";
import React, { useEffect, useRef, useState } from "react";
import * as LR from "@uploadcare/blocks";
import { useRouter } from "next/navigation";

type Props = {
  onUpload: (e: string) => any;
};

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null);

  useEffect(() => {
    setIsMounted(true);
    LR.registerBlocks(LR);
  }, []);

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload(e.detail.cdnUrl);
      if (file) {
        router.refresh();
      }
    };

    if (ctxProviderRef.current) {
      ctxProviderRef.current.addEventListener(
        "file-upload-success",
        handleUpload
      );
    }

    return () => {
      if (ctxProviderRef.current) {
        ctxProviderRef.current.removeEventListener(
          "file-upload-success",
          handleUpload
        );
      }
    };
  }, [onUpload, router]);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <lr-config ctx-name="my-uploader" pubkey="1eab6d30053589958b65" />

      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css`}
      />

      <lr-upload-ctx-provider ctx-name="my-uploader" ref={ctxProviderRef} />
    </div>
  );
};

export default UploadCareButton;
