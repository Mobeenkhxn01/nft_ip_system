import { NextRequest, NextResponse } from "next/server";
import { licenseDb } from "@/lib/db";

export async function PATCH(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const license = licenseDb.revoke(id);
  if (!license) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(license);
}
