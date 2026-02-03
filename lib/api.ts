import axios from "axios";
import { ItemRadio } from "@/types/item";

export const createRadio = async (values: ItemRadio) => {
  const res = await axios.post("/api/radio-submit", values);
  return res.data;
};
