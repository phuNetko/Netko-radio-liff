"use client";

import { useEffect, useState, use } from "react";
import dayjs from "dayjs";
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
  // ✅ unwrap params Promise
  const { id } = use(params);
  const lineId = decodeURIComponent(id);

  const [list, setList] = useState<RadioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch(
          `/api/get-mine?lineId=${encodeURIComponent(lineId)}`
        );
        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();
        setList(data.data);
      } catch (e) {
        setError("Không tải được danh sách");
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [lineId]);

  // if (loading) return <div className="p-6">⏳ Đang tải...</div>;
  // if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-4 rounded-md space-y-4 bg-white/70">
      <h1 className="text-xl font-semibold">📻 Danh sách lời nhắn của bạn</h1>
      {loading && <div className="p-6">Đang tải...</div>}
      {error && !loading && <div className="p-6 text-red-500">{error}</div>}
      {list.length === 0 && error && !loading && (
        <div className="text-gray-500">Chưa có lời nhắn nào</div>
      )}

      {list.map((item, i) => (
        <div key={i} className="border rounded-lg p-4 bg-white">
          <div className="text-sm text-gray-400">{dayjs(item.timestamp).format("DD/MM/YYYY HH:mm")}</div>
          <div className="font-medium mt-1 flex flex-col ">
            Tên bài hát(link nhạc):
            <span>{item.baiHat}</span>
          </div>
          <div className="italic mt-2 flex flex-col">
            Lời nhắn:
            <span className="border rounded-sm border-gray-50 px-1 py-2">
              “{item.loiNhan}”
            </span>
          </div>
          <div className="text-sm mt-3 flex gap-3">
            Gửi từ: <p className="text-green-400">{item.nguoiGui}</p> tới <p className="text-orange-300">{item.nguoiNhan}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
