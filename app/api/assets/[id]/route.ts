import { NextRequest, NextResponse } from "next/server";
import { assetDb } from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asset = assetDb.findById(id);
  if (!asset) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(asset);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  assetDb.delete(id);
  return NextResponse.json({ message: "Deleted" });
}
