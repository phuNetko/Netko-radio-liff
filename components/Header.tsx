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

  const navigateToDetail = async () => {
    const lineIdLocal =
      typeof window !== "undefined"
        ? localStorage.getItem("lineId")
        : null;
    const lineId = await getLiffId() || lineIdLocal;
    router.push(`/list/${lineId}`);
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const navItems = [
    { href: '/', label: 'Gửi yêu cầu', icon: Send },
    { onClick: navigateToDetail, label: 'Yêu cầu của tôi', icon: List },
    { href: '/about', label: 'Giới thiệu', icon: Info },
  ];

  const isActive = (href?: string) => href && pathname === href;

  const closeSidebar = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-black/10 dark:border-white/10'
            : ''
        }`}
      >
        <nav className="max-w-lg mx-auto px-3 sm:px-4 h-16 grid grid-cols-3 items-center">
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="p-2.5 -ml-1 transition-colors cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white rounded-xl hover:bg-black/5 dark:hover:bg-white/10"
              aria-expanded={open}
              aria-label={open ? 'Đóng menu' : 'Mở menu'}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <div className="flex justify-center min-w-0">
            <Link
              href="/"
              onClick={closeSidebar}
              className="flex items-center gap-2 min-w-0 max-w-full cursor-pointer group"
            >
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#6ca03d] to-[#5a8a32] blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative p-1.5 rounded-lg bg-gradient-to-br from-[#6ca03d] to-[#5a8a32]">
                  <Radio size={16} className="text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex flex-col items-start text-left min-w-0">
                <span className="text-sm sm:text-base font-semibold leading-tight tracking-tight text-black dark:text-white truncate">
                 NETKO Radio
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-600 dark:text-neutral-400 truncate max-w-[140px] sm:max-w-[200px]">
                  Chia sẻ qua sóng radio
                </span>
              </div>
            </Link>
          </div>

          <div className="flex justify-end">
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Backdrop */}
      <div
        role="presentation"
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar}
        aria-hidden={!open}
      />

      {/* Sidebar */}
      <aside
        id="main-nav-sidebar"
        className={`fixed left-0 top-0 z-[45] h-dvh w-[min(18rem,88vw)] max-w-full bg-white dark:bg-black border-r border-black/10 dark:border-white/10 shadow-xl transition-transform duration-300 ease-out flex flex-col pt-[calc(env(safe-area-inset-top)+4rem)] pb-[env(safe-area-inset-bottom)] ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Component = item.href ? Link : 'button';
            const props = item.href
              ? { href: item.href, onClick: closeSidebar }
              : { type: 'button' as const, onClick: item.onClick };

            return (
              <Component
                key={item.label}
                {...(props as any)}
                className={`flex items-center gap-4 w-full px-4 py-3.5 text-base font-medium rounded-2xl transition-all cursor-pointer text-left ${
                  active
                    ? 'text-black dark:text-white bg-gradient-to-r from-[#6ca03d]/10 to-[#6ca03d]/10 border border-[#6ca03d]/20'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${active ? 'bg-[#6ca03d]/20' : 'bg-black/5 dark:bg-white/5'}`}>
                  <item.icon size={20} strokeWidth={2} />
                </div>
                {item.label}
              </Component>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
