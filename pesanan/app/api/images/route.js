import { NextResponse } from "next/server";

export async function GET() {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
        return NextResponse.json({ error: "Missing Cloudinary API keys" }, { status: 500 });
    }

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`;

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

    const res = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });

    const data = await res.json();

    if (!res.ok) {
        console.error("Cloudinary API Error:", data);
        return NextResponse.json({ error: data }, { status: res.status });
    }

    return NextResponse.json(data.resources);
}
