"use client";
import liff from "@line/liff";

export async function initLiff() {
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

  if (!liffId) {
    throw new Error("Missing NEXT_PUBLIC_LIFF_ID");
  }

  await liff.init({ liffId });

  if (!liff.isLoggedIn()) {
    liff.login();
    return null;
  }

  return await liff.getProfile();
}

const getLiffId = async () => {
  const liffID = process.env.NEXT_PUBLIC_LIFF_ID;
  try {
    await liff.init({ liffId: liffID || "" });
    const profile = await liff.getProfile();
    console.log(profile);
    
    const lineId = profile.userId;
    return lineId;
  } catch (error) {
    console.log("oh no");
  }
};
export { getLiffId };
