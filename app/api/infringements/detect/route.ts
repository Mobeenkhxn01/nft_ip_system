import { NextRequest, NextResponse } from "next/server";
import { infringementDb, assetDb } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { assetId } = await req.json();
    const asset = assetDb.findById(assetId);
    if (!asset) return NextResponse.json({ message: "Asset not found" }, { status: 404 });
    const similarityScore = parseFloat((Math.random() * 35 + 65).toFixed(2));
    const isInfringement = similarityScore > 85;
    if (isInfringement) {
      const infringement = infringementDb.create({
        assetId,
        similarityScore,
        status: "detected",
        evidenceHash: crypto.randomBytes(32).toString("hex"),
        platform: ["Twitter","Instagram","OpenSea","Reddit","TikTok"][Math.floor(Math.random() * 5)],
      });
      return NextResponse.json({ detected: true, infringement, similarityScore });
    }
    return NextResponse.json({ detected: false, similarityScore, message: "No infringement detected" });
  } catch {
    return NextResponse.json({ message: "Detection failed" }, { status: 500 });
  }
}
