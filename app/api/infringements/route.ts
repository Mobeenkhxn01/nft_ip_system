import { NextRequest, NextResponse } from "next/server";
import { infringementDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  const assetId = new URL(req.url).searchParams.get("assetId") || undefined;
  return NextResponse.json(infringementDb.findAll(assetId));
}
