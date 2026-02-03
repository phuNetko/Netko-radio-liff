import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import '@/styles/index.css';
import ClientProviders from "./ClientProviders";

export const metadata: Metadata = {
  title: "Radio LIFF",
  description: "Radio LIFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        style={{ 
          margin: 0, 
          padding: 0, 
          fontFamily: 'Arial, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: "url('/bg-radio.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Header component with navigation */}
        <Header />
        
        {/* Main content area */}
        <main className="flex-1 px-4 mt-10 py-10">
          {children}
          <ClientProviders />
        </main>
        
        {/* Footer component */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
