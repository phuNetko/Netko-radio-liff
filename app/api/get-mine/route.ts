import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lineId = searchParams.get("lineId");

    if (!lineId) {
      return NextResponse.json(
        { success: false, error: "Missing lineId" },
        { status: 400 }
      );
    }

    const gasUrl =
      `${process.env.NEXT_PUBLIC_API_URL}/exec` +
      `?action=list&lineId=${(lineId)}`;

    const res = await fetch(gasUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
