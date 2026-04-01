"use client";

import { useEffect, useState, use } from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { Music2, User, Clock, MessageCircle, ArrowLeft, Radio, Inbox } from "lucide-react";
import Link from "next/link";

dayjs.locale("vi");

type RadioItem = {
  timestamp: string;
  lineId: string;
  baiHat: string;
  loiNhan: string;
  nguoiGui: string;
  nguoiNhan: string;
  ghiChu?: string;
};

export default function ListPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const lineId = decodeURIComponent(id);

  const [list, setList] = useState<RadioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch(`/api/get-mine?lineId=${encodeURIComponent(lineId)}`);
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setList(data.data);
      } catch (e) {
        setError("Không tải được danh sách yêu cầu");
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [lineId]);

  return (
    <div className="py-6">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors mb-4 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Về trang gửi yêu cầu
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-black dark:text-white">
          Yêu cầu của tôi
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Theo dõi các bài hát và lời nhắn bạn đã gửi
        </p>
      </div>

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-neutral-100/80 dark:bg-neutral-950/40 border border-black/5 dark:border-white/10 rounded-2xl p-5"
            >
              <div className="animate-pulse space-y-4">
                <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-800 rounded" />
                <div className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded" />
                <div className="h-16 w-full bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
                <div className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-red-300 rounded-xl transition-colors cursor-pointer"
          >
            Thử lại
          </button>
        </div>
      )}

      {!loading && !error && list.length === 0 && (
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#6ca03d]/5 to-transparent pointer-events-none" />
          <div className="relative bg-white/80 dark:bg-neutral-950/40 border border-black/5 dark:border-white/10 rounded-3xl p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#6ca03d]/10 to-[#8ab862]/10 dark:from-[#6ca03d]/20 dark:to-[#8ab862]/20 flex items-center justify-center">
              <Inbox size={28} className="text-[#6ca03d]" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
              Chưa có yêu cầu nào
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 max-w-xs mx-auto">
              Hãy gửi bài hát và lời nhắn đầu tiên của bạn
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#6ca03d] to-[#8ab862] text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-[#6ca03d]/25 transition-all cursor-pointer"
            >
              <Radio size={16} />
              Gửi yêu cầu
            </Link>
          </div>
        </div>
      )}

      {!loading && !error && list.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-medium bg-[#6ca03d]/10 text-[#5a8a32] dark:text-[#a4c97a] rounded-lg">
              {list.length} yêu cầu
            </span>
          </div>

          {list.map((item, i) => (
            <article
              key={i}
              className="group relative bg-white/80 dark:bg-neutral-950/40 border border-black/5 dark:border-white/10 hover:border-[#6ca03d]/30 rounded-2xl p-5 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#6ca03d]/5 to-[#8ab862]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative">
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-4">
                  <Clock size={12} />
                  {dayjs(item.timestamp).format("D MMM YYYY · HH:mm")}
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#6ca03d]/10 to-[#8ab862]/10 dark:from-[#6ca03d]/20 dark:to-[#8ab862]/20 text-[#6ca03d]">
                    <Music2 size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-neutral-500 mb-1 uppercase tracking-wider">Bài hát</p>
                    <p className="font-medium break-words leading-snug text-black dark:text-white">
                      {item.baiHat}
                    </p>
                  </div>
                </div>

                <div className="bg-neutral-100/80 dark:bg-neutral-900/50 border border-black/5 dark:border-white/10 rounded-xl p-4 mb-4">
                  <p className="text-xs text-neutral-500 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                    <MessageCircle size={12} />
                    Lời nhắn
                  </p>
                  <p className="text-neutral-800 dark:text-neutral-300 leading-relaxed">
                    &ldquo;{item.loiNhan}&rdquo;
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#8ab862]/20 flex items-center justify-center">
                      <User size={12} className="text-[#8ab862]" />
                    </div>
                    <span className="text-neutral-500">Từ</span>
                    <span className="text-emerald-600 dark:text-[#a4c97a] font-medium">{item.nguoiGui}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <User size={12} className="text-orange-500" />
                    </div>
                    <span className="text-neutral-500">Tới</span>
                    <span className="text-orange-600 dark:text-orange-400 font-medium">{item.nguoiNhan}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
