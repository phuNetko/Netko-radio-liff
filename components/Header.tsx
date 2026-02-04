'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Radio, Send, List, Info } from 'lucide-react';
import ThemeToggle from './Form/ThemeToggle';
import { getLiffId } from './liff';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

// <<<<<<< HEAD
  const navigateToDetail = async () => {
    const lineIdLocal =
      typeof window !== "undefined"
        ? localStorage.getItem("lineId")
        : null;
    const lineId = await getLiffId() || lineIdLocal
    router.push(`/list/${lineId}`)
  }
// =======
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // const navigateToDetail = () => {
  //   const lineId = localStorage.getItem('lineId');
  //   router.push(`/list/${lineId}`);
  // };

  const navItems = [
    { href: '/', label: 'Request', icon: Send },
    { onClick: navigateToDetail, label: 'My Requests', icon: List },
    { href: '/about', label: 'About', icon: Info },
  ];

  const isActive = (href?: string) => href && pathname === href;
// >>>>>>> feat/theme

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5'
            : ''
        }`}
      >
        <nav className="max-w-lg mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#6ca03d] to-[#5a8a32] blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative p-2 rounded-xl bg-gradient-to-br from-[#6ca03d] to-[#5a8a32]">
                <Radio size={18} className="text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold leading-tight tracking-tight text-zinc-900 dark:text-white">
                Netko Radio
              </span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
                Share your vibe
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Component = item.href ? Link : 'button';
              const props = item.href ? { href: item.href } : { onClick: item.onClick };

              return (
                <Component
                  key={item.label}
                  {...(props as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                    active
                      ? 'text-zinc-900 dark:text-white bg-black/5 dark:bg-white/10'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <item.icon size={16} strokeWidth={2} />
                  {item.label}
                </Component>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile: Theme + Menu */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="p-3 -mr-3 transition-colors cursor-pointer text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>
{/* <<<<<<< HEAD
      <ul
        className={`${open ? 'flex' : 'hidden'} flex-col fixed top-0 z-100 left-0 bottom-0 right-1/2 bg-white backdrop-blur-sm`}
        onClick={() => setOpen(!open)}
      >
        <span
          // href="/"
          className="text-xl nowrap font-semibold text-black text-decoration-none px-6 py-3 border-b border-gray-300"
        >
          📻 Netko Radio
        </span>
        <Link
          href="/"
          className="text-black text-decoration-none text-sm font-medium transition-opacity hover:opacity-80 px-3 py-3 mt-3 hover:bg-amber-50 border-b border-gray-300 mx-3"
          onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}

        >
          Đăng ký
        </Link>
        <button
          onClick={navigateToDetail}
          className="text-black text-decoration-none text-start text-sm font-medium transition-opacity hover:opacity-80 px-3 py-3 hover:bg-amber-50 border-b border-gray-300 mx-3"
        >
          Của tôi
        </button>
        <Link
          href="/about"
          className="text-black text-decoration-none text-sm font-medium transition-opacity hover:opacity-80 px-3 py-3 hover:bg-amber-50 border-b border-gray-300 mx-3"
          onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Ủng hộ chúng tôi
        </Link>
      </ul>
    </> */}
{/* // =======
// >>>>>>> feat/theme */}

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute bottom-0 inset-x-0 bg-white dark:bg-zinc-900 border-t border-black/10 dark:border-white/10 rounded-t-3xl transform transition-transform duration-300 ease-out ${
            open ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          </div>

          <nav className="px-4 pb-8 pt-2 space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Component = item.href ? Link : 'button';
              const props = item.href ? { href: item.href } : { onClick: item.onClick };

              return (
                <Component
                  key={item.label}
                  {...(props as any)}
                  className={`flex items-center gap-4 w-full px-4 py-4 text-base font-medium rounded-2xl transition-all cursor-pointer ${
                    active
                      ? 'text-zinc-900 dark:text-white bg-gradient-to-r from-[#6ca03d]/10 to-[#6ca03d]/10 border border-[#6ca03d]/20'
                      : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${active ? 'bg-[#6ca03d]/20' : 'bg-black/5 dark:bg-white/5'}`}>
                    <item.icon size={20} strokeWidth={2} />
                  </div>
                  {item.label}
                </Component>
              );
            })}
          </nav>

          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      </div>
    </>
  );
}
