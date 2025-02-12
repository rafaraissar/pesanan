import webpush from "web-push";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function POST(req) {
  try {
    const { title, message } = await req.json();
    const subscriptions = await prisma.subscription.findMany();

    const notifications = subscriptions.map((sub) =>
      webpush.sendNotification(
        sub,
        JSON.stringify({ title, message })
      ).catch(err => console.error("Notification failed", err))
    );

    await Promise.all(notifications);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send notifications" }, { status: 500 });
  }
}
