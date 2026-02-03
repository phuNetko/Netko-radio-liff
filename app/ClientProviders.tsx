"use client";

import { useEffect } from "react";
import { Toaster } from "sonner";
import liff from "@line/liff";
import { initLiff } from "@/components/liff";

export default function ClientProviders() {
    useEffect(() => {
        initLiff()
            .then(profile => {
                if (profile) {
                    console.log(profile.userId);
                }
            })
            .catch(console.error);
    }, []);

    return <Toaster position="top-center" richColors />;
}
