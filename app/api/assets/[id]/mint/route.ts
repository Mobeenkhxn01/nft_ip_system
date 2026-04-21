import { NextRequest, NextResponse } from "next/server";
import { assetDb } from "@/lib/db";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asset = assetDb.findById(id);
  if (!asset) return NextResponse.json({ message: "Not found" }, { status: 404 });
  if (asset.status === "minted") return NextResponse.json({ message: "Already minted" }, { status: 400 });
  const updated = assetDb.mint(id);
  return NextResponse.json({ asset: updated, message: "NFT minted successfully" });
}
