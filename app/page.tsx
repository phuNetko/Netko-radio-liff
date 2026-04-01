"use client";

import InputBase from "@/components/Form/inputBase";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { createRadio } from "@/lib/api";
import { ItemRadio } from '@/types/item';
import { toast } from "sonner";
import { getLiffId } from "@/components/liff";
import { Send, Music2, UserCircle, Sparkles } from "lucide-react";

const validationSchema = Yup.object({
  baiHat: Yup.string().required("Vui lòng nhập bài hát hoặc liên kết"),
  nguoiGui: Yup.string().required("Vui lòng cho biết tên người gửi"),
  nguoiNhan: Yup.string().required("Vui lòng nhập tên người nhận"),
  loiNhan: Yup.string().required("Vui lòng nhập lời nhắn"),
  ghiChu: Yup.string(),
});

export default function SubmitPage() {
  const handleSubmitRadio = async (values: ItemRadio, { setSubmitting, resetForm }: any) => {
    const toastId = toast.loading("Đang gửi yêu cầu...");
    try {
      const lineIdLocal =
        typeof window !== "undefined"
          ? localStorage.getItem("lineId")
          : null;
      const lineId = await getLiffId() || lineIdLocal || '';
      const payload: ItemRadio = {
        ...values,
        lineId,
      };
      await createRadio(payload);
      toast.success("Gửi thành công!", { id: toastId });
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-6" >
      {/* Hero Section */}
      <section className="text-center mb-10" >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-[#6ca03d]/10 border border-[#6ca03d]/20">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#8ab862] opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6ca03d]" />
          </span>
          <span className="text-xs font-medium text-[#5a8a32] dark:text-[#a4c97a] uppercase tracking-wider">
            Phát sóng mỗi thứ Năm
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight text-black dark:text-white">
          Chia sẻ <span className="bg-gradient-to-r from-[#6ca03d] via-[#6ca03d] to-[#8ab862] bg-clip-text text-transparent">cảm hứng</span>
        </h1>

        <p className="text-neutral-700 dark:text-neutral-300 text-base max-w-sm mx-auto">
          Đăng ký bài hát và gửi lời nhắn tới người thân qua sóng radio
        </p>
      </section>

      {/* Form Card */}
      <div className="relative">
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-black/5 dark:from-white/10 to-transparent pointer-events-none" />
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#6ca03d]/10 via-[#6ca03d]/10 to-[#8ab862]/10 dark:from-[#6ca03d]/20 dark:via-[#6ca03d]/20 dark:to-[#8ab862]/20 blur-2xl opacity-50 pointer-events-none" />

        <div className="relative bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-3xl p-6 sm:p-8">
          <Formik
            initialValues={{
              lineId: "",
              baiHat: "",
              nguoiGui: "",
              nguoiNhan: "",
              loiNhan: "",
              ghiChu: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmitRadio}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                <InputBase
                  required
                  label="Bài hát"
                  name="baiHat"
                  as="input"
                  placeholder="Tên bài hoặc liên kết YouTube / Spotify"
                  icon={<Music2 size={18} />}
                />

                <div className="grid  lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-3">
                  <InputBase
                    required
                    label="Người gửi"
                    name="nguoiGui"
                    as="input"
                    placeholder="Tên của bạn"
                    icon={<UserCircle size={18} />}
                  />
                  <InputBase
                    required
                    label="Người nhận"
                    name="nguoiNhan"
                    as="input"
                    placeholder="Tên người nhận"
                    icon={<UserCircle size={18} />}
                  />
                </div>

                <InputBase
                  required
                  label="Lời nhắn"
                  name="loiNhan"
                  as="textarea"
                  placeholder="Viết lời nhắn của bạn..."
                  rows={4}
                />

                <InputBase
                  label="Ghi chú"
                  name="ghiChu"
                  as="textarea"
                  placeholder="Ghi chú thêm cho DJ (nếu có)"
                  rows={2}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full mt-4 group cursor-pointer"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#6ca03d] via-[#6ca03d] to-[#8ab862] blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />

                  <div className="relative flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#6ca03d] via-[#6ca03d] to-[#8ab862] text-white font-semibold text-base shadow-lg shadow-[#6ca03d]/25 hover:shadow-[#6ca03d]/40 transition-all active:scale-[0.98]">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send size={18} strokeWidth={2.5} />
                        Gửi yêu cầu
                      </>
                    )}
                  </div>
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <p className="text-center text-neutral-600 dark:text-neutral-400 text-sm mt-6 flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-[#6ca03d]" />
        Yêu cầu của bạn sẽ được lên sóng vào thứ Năm
      </p>
    </div>
  );
}
