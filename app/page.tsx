"use client";

import InputBase from "@/components/Form/inputBase";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { createRadio } from "@/lib/api";
import { ItemRadio } from '@/types/item';
import { toast } from "sonner";
import { getLiffId } from "@/components/liff";
import { Send, Music2, UserCircle, MessageCircle, FileText, Sparkles } from "lucide-react";

const validationSchema = Yup.object({
  baiHat: Yup.string().required("What song should we play?"),
  nguoiGui: Yup.string().required("Let us know who you are"),
  nguoiNhan: Yup.string().required("Who is this for?"),
  loiNhan: Yup.string().required("Add your message"),
  ghiChu: Yup.string(),
});

export default function SubmitPage() {
  const handleSubmitRadio = async (values: ItemRadio, { setSubmitting, resetForm }: any) => {
    const toastId = toast.loading("Sending your request...");
    try {
// <<<<<<< HEAD
      const lineIdLocal =
        typeof window !== "undefined"
          ? localStorage.getItem("lineId")
          : null;
      const lineId = await getLiffId() || lineIdLocal || '';
      const payload: ItemRadio = {
        ...values,
        lineId,
      };
      // const res = await createRadio(payload)
      // toast.success("🎧 Gửi thành công!", {
      //   id: toastId, // 👈 replace loading
      // });

// =======
      // const lineId = await getLiffId() || localStorage.getItem('lineId') || '';
      // const payload: ItemRadio = { ...values, lineId };
      await createRadio(payload);
      toast.success("Request sent successfully!", { id: toastId });
// >>>>>>> feat/theme
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-6">
      {/* Hero Section */}
      <section className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-[#6ca03d]/10 border border-[#6ca03d]/20">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#8ab862] opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6ca03d]" />
          </span>
          <span className="text-xs font-medium text-[#5a8a32] dark:text-[#a4c97a] uppercase tracking-wider">
            Live every Thursday
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight text-zinc-900 dark:text-white">
          Share Your <span className="bg-gradient-to-r from-[#6ca03d] via-[#6ca03d] to-[#8ab862] bg-clip-text text-transparent">Vibe</span>
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 text-base max-w-sm mx-auto">
          Request a song and send a message to someone special through the radio waves
        </p>
      </section>

      {/* Form Card */}
      <div className="relative">
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-black/5 dark:from-white/10 to-transparent pointer-events-none" />
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#6ca03d]/10 via-[#6ca03d]/10 to-[#8ab862]/10 dark:from-[#6ca03d]/20 dark:via-[#6ca03d]/20 dark:to-[#8ab862]/20 blur-2xl opacity-50 pointer-events-none" />

        <div className="relative bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm border border-black/5 dark:border-white/5 rounded-3xl p-6 sm:p-8">
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
                  label="Song"
                  name="baiHat"
                  as="input"
                  placeholder="Song name or YouTube/Spotify link"
                  icon={<Music2 size={18} />}
                />

                <div className="grid grid-cols-2 gap-3">
                  <InputBase
                    required
                    label="From"
                    name="nguoiGui"
                    as="input"
                    placeholder="Your name"
                    icon={<UserCircle size={18} />}
                  />
                  <InputBase
                    required
                    label="To"
                    name="nguoiNhan"
                    as="input"
                    placeholder="Recipient"
                    icon={<UserCircle size={18} />}
                  />
                </div>

                <InputBase
                  required
                  label="Message"
                  name="loiNhan"
                  as="textarea"
                  placeholder="Write your heartfelt message..."
                  rows={4}
                  icon={<MessageCircle size={18} />}
                />

                <InputBase
                  label="Notes (optional)"
                  name="ghiChu"
                  as="textarea"
                  placeholder="Any special instructions for the DJ"
                  rows={2}
                  icon={<FileText size={18} />}
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
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} strokeWidth={2.5} />
                        Send Request
                      </>
                    )}
                  </div>
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <p className="text-center text-zinc-500 text-sm mt-6 flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-[#6ca03d]" />
        Your request will be featured on Thursday's broadcast
      </p>
    </div>
  );
}
