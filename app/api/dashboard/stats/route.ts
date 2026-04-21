import { NextResponse } from "next/server";
import { assetDb, licenseDb, infringementDb } from "@/lib/db";

export async function GET() {
  const assetStats = assetDb.stats();
  const result = assetDb.findAll();
  const recentAssets = result.assets.slice(0, 5).map(a => ({
    id: a.id, title: a.title, assetType: a.assetType, status: a.status, createdAt: a.createdAt
  }));
  const recentInfringements = infringementDb.findAll().slice(0, 5);

  return NextResponse.json({
    stats: {
      totalAssets: assetStats.total,
      mintedAssets: assetStats.minted,
      activeLicenses: licenseDb.count(),
      pendingInfringements: infringementDb.count(),
    },
    recentAssets,
    recentInfringements,
    assetsByType: Object.entries(assetStats.byType).map(([k, v]) => ({ assetType: k, _count: v })),
  });
}
