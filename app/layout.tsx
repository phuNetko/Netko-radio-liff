import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import '@/styles/index.css';
import ClientProviders from "./ClientProviders";

export const metadata: Metadata = {
  title: "Netko Radio | Share Your Vibe",
  description: "Send song requests and heartfelt messages through the radio waves",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#09090B',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* Anti-flash script - sets theme before render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-dvh antialiased bg-white dark:bg-[#09090B] text-zinc-900 dark:text-white transition-colors duration-300">
        {/* Ambient background */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Gradient orbs - dark mode */}
          <div className="hidden dark:block">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#6ca03d]/20 blur-[100px]" />
            <div className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-[#6ca03d]/15 blur-[80px]" />
            <div className="absolute -bottom-20 right-1/3 w-72 h-72 rounded-full bg-[#8ab862]/10 blur-[90px]" />
          </div>
          {/* Gradient orbs - light mode */}
          <div className="block dark:hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#6ca03d]/10 blur-[100px]" />
            <div className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-[#6ca03d]/8 blur-[80px]" />
            <div className="absolute -bottom-20 right-1/3 w-72 h-72 rounded-full bg-[#8ab862]/5 blur-[90px]" />
          </div>

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px'
            }}
          />
        </div>

        <Header />

        <main className="relative pt-20 pb-8 px-4 min-h-dvh">
          <ClientProviders />
          <div className="max-w-lg mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
