import { NextRequest, NextResponse } from "next/server";
import { assetDb } from "@/lib/db";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const result = assetDb.findAll({
    type: searchParams.get("type") || undefined,
    status: searchParams.get("status") || undefined,
    page: parseInt(searchParams.get("page") || "1"),
  });
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, assetType, creatorId, creatorAddress, licenseType, content } = body;
    const cryptoHash = crypto.createHash("sha256").update(content || title + Date.now()).digest("hex");
    const perceptualHash = crypto.createHash("md5").update(title + description).digest("hex");
    const asset = assetDb.create({ title, description, assetType, creatorId, creatorAddress, licenseType, cryptoHash, perceptualHash, status: "registered" });
    return NextResponse.json(asset, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "Failed to create asset" }, { status: 500 });
  }
}
