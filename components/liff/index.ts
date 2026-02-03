import liff from "@line/liff";

const getLiffId = async () => {
  try {
    await liff.init({ liffId: "LIFF_ID_CỦA_BẠN" });
    const profile = await liff.getProfile();
    const lineId = profile.userId;
    return lineId;
  } catch (error) {
    console.log("oh no");
  }
};
export { getLiffId };
