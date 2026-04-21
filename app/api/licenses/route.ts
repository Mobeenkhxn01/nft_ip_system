import { NextRequest, NextResponse } from "next/server";
import { licenseDb, assetDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  const assetId = new URL(req.url).searchParams.get("assetId") || undefined;
  return NextResponse.json(licenseDb.findAll(assetId));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { assetId, licenseeId, licenseType, terms, royaltyPercent, expiresAt } = body;
    const asset = assetDb.findById(assetId);
    if (!asset) return NextResponse.json({ message: "Asset not found" }, { status: 404 });
    if (asset.status !== "minted") return NextResponse.json({ message: "Asset must be minted first" }, { status: 400 });
    const txHash = "0x" + Buffer.from(Date.now().toString()).toString("hex").slice(0, 64);
    const license = licenseDb.create({ assetId, licenseeId, licenseType, terms, royaltyPercent: parseFloat(royaltyPercent), expiresAt: expiresAt || undefined, isActive: true, transactionHash: txHash });
    return NextResponse.json(license, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}
