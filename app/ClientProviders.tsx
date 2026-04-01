"use client";

import { useEffect } from "react";
import { Toaster } from "sonner";
import { initLiff } from "@/components/liff";

export default function ClientProviders() {
    useEffect(() => {
        initLiff()
            .then(profile => {
                if (profile) {
                    console.log(profile.userId);
                    localStorage.setItem("lineId", profile.userId);
                }
            })
            .catch(console.error);
    }, [])

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        className:
          "!bg-white !text-black !border !border-black/10 dark:!bg-black dark:!text-white dark:!border-white/15",
        classNames: {
          success: "!border-emerald-500/40",
          error: "!border-red-500/40",
          loading: "!border-[#6ca03d]/40",
        },
      }}
    />
  );
}
