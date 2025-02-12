import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { endpoint, keys } = await req.json();

    // Simpan subscription ke database
    await prisma.subscription.upsert({
      where: { endpoint },
      update: { keys },
      create: { endpoint, keys },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save subscription" }, { status: 500 });
  }
}
