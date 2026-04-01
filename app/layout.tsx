import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import '@/styles/index.css';
import ClientProviders from "./ClientProviders";

export const metadata: Metadata = {
  title: "NETKO Radio | Gửi yêu cầu bài hát",
  description: "Đăng ký bài hát và gửi lời nhắn qua chương trình radio",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
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
      <body className="min-h-dvh antialiased bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
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
