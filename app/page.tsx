"use client";

import InputBase from "@/components/Form/inputBase";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createRadio } from "@/lib/api";
import { ItemRadio } from '@/types/item';
import { toast } from "sonner";
import { getLiffId } from "@/components/liff";

const validationSchema = Yup.object({
  baiHat: Yup.string().required("Không gửi thì biết bật bài gì giờ -..-"),
  nguoiGui: Yup.string().required("Who are you???"),
  nguoiNhan: Yup.string().required("Gửi cho ai vậy ?"),
  loiNhan: Yup.string().required("Lời nhắn không được để trống"),
  ghiChu: Yup.string(),
});


export default function SubmitPage() {
  const handleSubmitRadio = async (values: ItemRadio, { setSubmitting, resetForm }: any) => {
    const toastId = toast.loading("Đang gửi...");
    try {
      const lineId = await getLiffId() || '123';
      const payload: ItemRadio = {
        ...values,
        lineId,
      };
      const res = await createRadio(payload)
      toast.success("🎧 Gửi thành công!", {
        id: toastId, // 👈 replace loading
      });
    
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("🎧 Gửi thất bại, hãy thử lại vài lần hoặc liên hệ với Phú nhé!", {
        id: toastId, // 👈 replace loading
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white backdrop-blur-sm rounded-md">
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
        {/* {({ isSubmitting, status }) => ( */}
        <Form className="flex flex-col gap-4">
          <InputBase required label="Bài hát mong muốn (link)" name="baiHat" as="input" placeholder="Bài hát mong muốn (link)" />
          <div className="flex lg:flex-row flex-col lg:gap-4 md:gap-4 gap-2">
            <InputBase required label="Người gửi" name="nguoiGui" as="input" placeholder="Người gửi" className="w-full" />
            <InputBase required label="Người nhận" name="nguoiNhan" as="input" placeholder="Người nhận" className="w-full" />
          </div>
          <InputBase required label="Lời nhắn" name="loiNhan" as="textarea" placeholder="Lời nhắn" rows={4} className="w-full" />
          <InputBase label="Ghi chú" name="ghiChu" as="textarea" placeholder="Ghi chú" rows={2} className="w-full" />
          <button className="bg-blue-500 mt-auto text-white px-4 py-2 rounded-md text-center from-20% to-100%">
            Gửi
          </button>
        </Form>
      </Formik>
    </div>
  );
}
