"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const tabs = [
    { key: "intro", label: "🎙️" },
    { key: "tech", label: "⚙️" },
    { key: "support", label: "☕" },
];

export default function AboutTabs() {
    const [activeIndex, setActiveIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const prev = () => {
        setActiveIndex((i) => Math.max(i - 1, 0));
    };

    const next = () => {
        setActiveIndex((i) => Math.min(i + 1, tabs.length - 1));
    };
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const delta = touchStartX.current - touchEndX.current;
        const threshold = 50;

        if (delta > threshold && activeIndex < tabs.length - 1) {
            setActiveIndex((i) => i + 1); // vuốt trái
        }

        if (delta < -threshold && activeIndex > 0) {
            setActiveIndex((i) => i - 1); // vuốt phải
        }
    };

    return (
        <div
            className="max-w-3xl mx-auto mt-6 pb-10 rounded-xl
        bg-white/90 dark:bg-[#1e1e1e]/90
        text-gray-800 dark:text-gray-100
        backdrop-blur-sm
        shadow-[2.5px_3px_0_#000] dark:shadow-[2.5px_3px_0_#fff]
        overflow-hidden"
        >
            {/* Tabs header – chỉ hiển thị trạng thái */}
            <div className="flex border-b border-gray-300 dark:border-gray-700">
                {tabs.map((tab, idx) => (
                    <div
                        key={tab.key}
                        className={`
              flex-1 px-4 py-3 text-sm font-medium text-center
              ${idx === activeIndex
                                ? "bg-[linear-gradient(90deg,#FF6464_0%,#FFBF59_50%,#47C9FF_100%)] text-white"
                                : "opacity-40"
                            }
            `}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>

            {/* Content + controls */}
            <div className="relative">
                {/* Prev */}
                <button
                    onClick={prev}
                    disabled={activeIndex === 0}
                    className="absolute right-2/3 bottom-[-40px] -translate-y-1/2 z-10
            p-1 rounded-full
            bg-white/80 dark:bg-black/40
            disabled:opacity-30"
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Next */}
                <button
                    onClick={next}
                    disabled={activeIndex === tabs.length - 1}
                    className="absolute left-2/3 bottom-[-40px] -translate-y-1/2 z-10
            p-1 rounded-full
            bg-white/80 dark:bg-black/40
            disabled:opacity-30"
                >
                    <ChevronRight size={18} />
                </button>

                {/* SLIDER */}
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${activeIndex * 100}%)`,
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="w-full shrink-0 p-6">
                            <Intro />
                        </div>
                        <div className="w-full shrink-0 p-6">
                            <Tech />
                        </div>
                        <div className="w-full shrink-0 p-6">
                            <Support />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ===================== TAB CONTENT ===================== */
function Intro() {
    return (<div className="space-y-4">
        <h2 className="text-xl font-semibold">🎙️ Đôi lời giới thiệu</h2>
        <p className="leading-relaxed"> <strong>Netko Radio</strong> là chương trình phát sóng vào chiều thứ 5 hàng tuần, nhằm mang đến không gian thư giãn, kết nối và chia sẻ cảm xúc cho mọi người. </p> <p className="leading-relaxed"> Chương trình đã hoạt động được khoảng <strong>6 tháng</strong> với sự đồng ý của Ban Lãnh Đạo công ty Netko. </p> <div> <h3 className="font-medium mb-1">👥 Đồng sáng lập</h3> <ul className="list-disc list-inside"> <li>Phùng Thiên Phú</li> <li>Nguyễn Bùi Đại</li> </ul> </div> </div>);
} function Tech() { return (<div className="space-y-4"> <h2 className="text-xl font-semibold">⚙️ Phiên bản cải tiến</h2> <p className="leading-relaxed"> Phiên bản này thay thế cho việc nhập liệu qua Google Form, giúp trải nghiệm người dùng mượt mà và thuận tiện hơn. </p> <div className="flex flex-wrap gap-2"> {["LINE LIFF", "Next.js", "Google Apps Script", "Vercel"].map((tech) => (<span key={tech} className="px-2 py-0.5 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200" > {tech} </span>))} </div> <p className="text-sm opacity-90"> 👨‍💻 Chịu trách nhiệm chính: <strong>Phùng Thiên Phú</strong><br /> 🧠 Tech Lead: <strong>Nguyễn Thành Lộc</strong><br /> 🧪 Tester bất đắc dĩ: <strong>Nguyễn Phúc Nguyên</strong>, <strong>Nguyễn Thành Lộc</strong> </p> <p className="italic text-sm opacity-80"> Chúng tôi rất mong nhận được góp ý để hoàn thiện hệ thống tốt hơn 💙 </p> </div>); } function Support() {
    return (<div className="space-y-4 text-center"> <h2 className="text-xl font-semibold">☕ Ủng hộ chúng tôi</h2>
        <p className="leading-relaxed"> Nếu bạn yêu thích Netko Radio, hãy tiếp thêm động lực cho chúng tôi bằng những cốc cà phê hoặc trà sữa nho nhỏ ☺️ </p>
        <img src={'/QR.JPG'} />  <p className="text-xs opacity-70">
        </p> <p className="text-sm opacity-80"> ❤️ Cảm ơn bạn đã đồng hành cùng Netko Radio! </p> </div>);
}