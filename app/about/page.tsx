"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Radio, Code2, Coffee, Users, Zap, Heart, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

const sections = [
  { key: "intro", label: "Câu chuyện", icon: Radio },
  { key: "tech", label: "Công nghệ", icon: Code2 },
  { key: "support", label: "Ủng hộ", icon: Coffee },
];

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => Math.max(i - 1, 0));
  const next = () => setActiveIndex((i) => Math.min(i + 1, sections.length - 1));

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX - touchEndX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? next() : prev();
    }
  };

  return (
    <div className="py-6">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          Về trang gửi yêu cầu
        </Link>
        </div>
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-black dark:text-white">
          Giới thiệu về <span className="bg-gradient-to-r from-[#6ca03d] via-[#6ca03d] to-[#8ab862] bg-clip-text text-transparent">NETKO Radio</span>
        </h1>
        <p className="text-neutral-700 dark:text-neutral-300">
          Kết nối yêu thương qua âm nhạc từ năm 2025
        </p>
      </div>

      <div className="relative">
        <div className="absolute -inset-px rounded-3xl bg-white/50 dark:bg-neutral-950/40 to-transparent pointer-events-none" />

        <div className="relative bg-white/80 dark:bg-neutral-950/40 border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden">
          <div className="flex border-b border-black/10 dark:border-white/10">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              const isActive = idx === activeIndex;

              return (
                <button
                  key={section.key}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "text-black dark:text-white bg-gradient-to-b from-[#6ca03d]/10 to-transparent border-b-2 border-[#6ca03d]"
                      : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{section.label}</span>
                </button>
              );
            })}
          </div>

          <div className="relative overflow-hidden">
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 min-w-[44px]! flex justify-center items-center rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white disabled:opacity-20 transition-all cursor-pointer"
              aria-label="Trang trước"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={activeIndex === sections.length - 1}
              className="absolute right-2 top-1/2 min-w-[44px]! flex justify-center items-center -translate-y-1/2 z-10 p-2 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white disabled:opacity-20 transition-all cursor-pointer"
              aria-label="Trang sau"
            >
              <ChevronRight size={18} />
            </button>

            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="w-full shrink-0 p-6 sm:p-6">
                <IntroSection />
              </div>
              <div className="w-full shrink-0 p-6 sm:p-6">
                <TechSection />
              </div>
              <div className="w-full shrink-0 p-6 sm:p-6">
                <SupportSection />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 pb-6">
            {sections.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full min-h-2! transition-all cursor-pointer ${
                  idx === activeIndex
                    ? "w-6 bg-[#6ca03d]"
                    : "w-1.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600"
                }`}
                aria-label={`Chuyển tới mục ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

     
    </div>
  );
}

function IntroSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#6ca03d]/10 to-[#6ca03d]/10 dark:from-[#6ca03d]/20 dark:to-[#6ca03d]/20 text-[#6ca03d]">
          <Radio size={22} />
        </div>
        <h2 className="text-xl font-semibold text-black dark:text-white">Câu chuyện</h2>
      </div>

      <p className="text-neutral-800 dark:text-neutral-300 leading-relaxed">
        <strong className="text-black dark:text-white">NETKO Radio</strong> là chương trình phát sóng vào chiều thứ 5 hàng tuần, nhằm mang đến không gian thư giãn, kết nối và chia sẻ cảm xúc cho mọi người.
      </p>

      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
      Chương trình đã hoạt động được khoảng <strong className="text-black dark:text-white">6 tháng</strong> với sự đồng ý của Ban Lãnh Đạo công ty NETKO.
      </p>

      <div className="bg-neutral-100/80 dark:bg-neutral-900/50 border border-black/5 dark:border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 mb-4">
          <Users size={16} />
          <span className="text-sm font-medium uppercase tracking-wider">Đồng sáng lập</span>
        </div>
        <div className="space-y-3">
          {[
            { name: "Nguyễn Bùi Đại", color: "from-[#8ab862] to-teal-500" },
            { name: "Phí Thị Thu Hường", color: "from-[#6ca03d] to-[#6ca03d]" },
          ].map((person) => (
            <div key={person.name} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${person.color} flex items-center justify-center text-white text-sm font-semibold`}>
                {person.name.charAt(0)}
              </div>
              <span className="font-medium text-black dark:text-white">{person.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TechSection() {
  const stack = [
    { name: "LINE LIFF", color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
    { name: "Next.js", color: "bg-neutral-500/10 text-neutral-800 dark:text-white border-neutral-500/20" },
    { name: "Apps Script", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
    { name: "Vercel", color: "bg-neutral-500/10 text-neutral-800 dark:text-neutral-300 border-neutral-500/20" },
  ];

  const team = [
    { role: "Trưởng nhóm phát triển", name: "Phí Thị Thu Hường", color: "bg-[#6ca03d]" },
    { role: "Trưởng kỹ thuật", name: "Nguyễn Thành Lộc", color: "bg-[#6ca03d]" },
    { role: "Kỹ sư kiểm thử", name: "Nguyễn Phúc Nguyên, Nguyễn Thành Lộc", color: "bg-[#8ab862]" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#6ca03d]/10 to-[#8ab862]/10 dark:from-[#6ca03d]/20 dark:to-[#8ab862]/20 text-[#6ca03d]">
          <Code2 size={22} />
        </div>
        <h2 className="text-xl font-semibold text-black dark:text-white">Công nghệ</h2>
      </div>

      <p className="text-neutral-800 dark:text-neutral-300 leading-relaxed">
      Phiên bản này thay thế cho việc nhập liệu qua Google Form, giúp trải nghiệm người dùng mượt mà và thuận tiện hơn.
      </p>

      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech.name}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg border ${tech.color}`}
          >
            {tech.name}
          </span>
        ))}
      </div>

      <div className="bg-neutral-100/80 dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 rounded-2xl p-5 space-y-3">
        {team.map((member) => (
          <div key={member.role} className="flex items-start gap-3">
            <div className={`w-2 h-2 mt-2 rounded-full ${member.color}`} />
            <div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">{member.role}</p>
              <p className="font-medium text-black dark:text-white">{member.name}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-neutral-700 dark:text-neutral-300 text-sm flex items-start gap-2">
        <Zap size={14} className="text-yellow-500 mt-0.5 shrink-0" />
        Chúng tôi rất mong nhận được góp ý để hoàn thiện hệ thống tốt hơn
      </p>
    </div>
  );
}

function SupportSection() {
  const handleDownloadQR = async () => {
    try {
      const response = await fetch('/QR.jpg');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'NETKO-radio-support-qr.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="space-y-6 text-center ">
      <div className="flex items-center justify-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/10 to-pink-500/10 dark:from-orange-500/20 dark:to-pink-500/20 text-orange-500">
          <Coffee size={22} />
        </div>
        <h2 className="text-xl font-semibold text-black dark:text-white">Ủng hộ chúng tôi</h2>
      </div>

      <p className="text-neutral-800 dark:text-neutral-300 leading-relaxed">
      Nếu bạn yêu thích NETKO Radio, hãy tiếp thêm động lực cho chúng tôi bằng những cốc cà phê / trà sữa nho nhỏ!
      </p>

      <div className="space-y-4 flex flex-col items-center justify-center">
        <div className="relative inline-block">
          <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-[#6ca03d]/20 dark:from-orange-500/30 dark:via-pink-500/30 dark:to-[#6ca03d]/30 rounded-3xl blur-xl" />
          <div className="relative bg-white dark:bg-neutral-950 p-4 rounded-2xl shadow-2xl border border-black/5 dark:border-white/10">
            <img
              src="/QR.jpeg"
              alt="Mã QR ủng hộ NETKO Radio"
              className="w-44 h-44 object-contain rounded-lg"
            />
          </div>
        </div>

        <button
          onClick={handleDownloadQR}
          className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#6ca03d] to-[#8ab862] text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-[#6ca03d]/25 transition-all cursor-pointer active:scale-[0.98]"
        >
          <Download size={16} />
          Lưu mã QR vào ảnh
        </button>
      </div>

      <p className="text-neutral-700 dark:text-neutral-300 text-sm flex items-center justify-center gap-1">
        <Heart size={14} className="text-red-500" />
        NETKO Radio cảm ơn bạn!
      </p>
    </div>
  );
}
