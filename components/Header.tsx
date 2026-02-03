'use client';
import Link from 'next/link';
import { useState } from 'react';
import { getLiffId } from './liff';
import { useRouter } from "next/navigation";

// Header component with navigation
export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleOpen = () => {
    setOpen(!open);
  };

  const navigateToDetail = async () => {
    const lineId = await getLiffId() || '123';
    router.push(`/list/${lineId}`)
  }

  return (
    <>
      <header
        className="bg-white/50 backdrop-blur-sm fixed top-0 left-0 w-full lg:py-2 z-50 flex lg:flex-row md:flex-row flex-col justify-between"
        onClick={handleOpen}
      >
        <div className="flex justify-between items-center px-4">
          <span
            // href="/"
            className="text-2xl font-bold text-white text-decoration-none"
          >
            📻 Netko Radio
          </span>
          <button className=" py-3 flex lg:hidden md:hidden text-2xl cursor-pointer" onClick={() => setOpen(!open)}>☰</button>
        </div>
        <ul className=' flex-row lg:flex md:flex hidden'>
          <Link
            href="/"
            className="text-black text-decoration-none text-sm font-medium transition-opacity hover:opacity-80 px-6 py-3 hover:bg-amber-50"
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Home
          </Link>
          <button
            onClick={navigateToDetail}
            className="text-black text-decoration-none text-sm font-medium transition-opacity hover:opacity-80 px-6 py-3 hover:bg-amber-50"
          >
            Posts
          </button>
        </ul>

      </header>
      <ul
        className={`${open ? 'flex' : 'hidden'} flex-col  gap-4 fixed top-0 z-100 left-0 bottom-0 right-1/2 bg-white backdrop-blur-sm`}
        onClick={() => setOpen(!open)}
      >
        <span
          // href="/"
          className="text-xl nowrap font-semibold text-black text-decoration-none px-6 py-4 border-b border-gray-300"
        >
          📻 Netko Radio
        </span>
        <Link
          href="/"
          className="text-black text-decoration-none text-sm font-medium transition-opacity hover:opacity-80 px-6 py-3 hover:bg-amber-50"
          onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Đăng kí
        </Link>
        <button
          onClick={navigateToDetail}
          className="text-black text-start text-decoration-none text-sm font-medium transition-opacity hover:opacity-80 px-6 py-3 hover:bg-amber-50"
        >
          Của tôi
        </button>
      </ul>
    </>

  );
}
