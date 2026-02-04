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
        style: {
          background: 'rgba(24, 24, 27, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#FAFAFA',
          borderRadius: '16px',
          backdropFilter: 'blur(12px)',
          padding: '16px',
        },
        classNames: {
          success: 'border-emerald-500/30',
          error: 'border-red-500/30',
          loading: 'border-indigo-500/30',
        }
      }}
    />
  );
}
