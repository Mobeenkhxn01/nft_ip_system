/**
 * In-memory data store for development/demo.
 * In production, replace `db` calls with `prisma` queries.
 */

import crypto from "crypto";

export interface Asset {
  id: string;
  title: string;
  description: string;
  assetType: string;
  creatorId: string;
  creatorAddress: string;
  licenseType: string;
  cryptoHash: string;
  perceptualHash: string;
  ipfsHash?: string;
  nftTokenId?: string;
  nftContract?: string;
  status: string;
  mintedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface License {
  id: string;
  assetId: string;
  licenseeId: string;
  licenseType: string;
  terms: string;
  royaltyPercent: number;
  expiresAt?: string;
  isActive: boolean;
  transactionHash?: string;
  createdAt: string;
  updatedAt: string;
  asset?: { title: string; assetType: string };
}

export interface Infringement {
  id: string;
  assetId: string;
  similarityScore: number;
  detectedAt: string;
  status: string;
  evidenceHash?: string;
  reportUrl?: string;
  platform?: string;
  asset?: { title: string; creatorAddress: string };
}

// Seed data
const seedAssets: Asset[] = [
  {
    id: "asset_001",
    title: "Digital Landscape Art — Series I",
    description: "A generative art piece depicting AI-rendered mountain landscapes with neural aesthetic blending.",
    assetType: "image",
    creatorId: "user_001",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C9b8dB2Cc3456",
    licenseType: "exclusive",
    cryptoHash: crypto.createHash("sha256").update("landscape_art_001").digest("hex"),
    perceptualHash: "a4f2b9c1d3e5f7a8",
    ipfsHash: "QmX9kLmN2pQrS4tUvW6xYzA8bCdE0fG1hIjKlMnOpQr",
    nftTokenId: "NFT-A1B2C3D4E5F6G7H8",
    nftContract: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    status: "minted",
    mintedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "asset_002",
    title: "Blockchain Research Paper — Q1 2026",
    description: "Academic paper exploring NFT-based intellectual property protection frameworks for academic institutions.",
    assetType: "text",
    creatorId: "user_001",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C9b8dB2Cc3456",
    licenseType: "non-exclusive",
    cryptoHash: crypto.createHash("sha256").update("research_paper_002").digest("hex"),
    perceptualHash: "b5c3d8e2f4a6b1c9",
    status: "registered",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "asset_003",
    title: "Ambient Soundscape — Neural Drift",
    description: "AI-composed ambient music track blending synthetic instruments with neural audio synthesis.",
    assetType: "audio",
    creatorId: "user_001",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C9b8dB2Cc3456",
    licenseType: "time-bound",
    cryptoHash: crypto.createHash("sha256").update("audio_003").digest("hex"),
    perceptualHash: "c6d4e9f3a5b7c2d0",
    ipfsHash: "QmY8jKmM1pPrR3sTuU5wVxX7yCzD9eF0gH1iJkLmNoPq",
    nftTokenId: "NFT-F7G8H9I0J1K2L3M4",
    nftContract: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
    status: "minted",
    mintedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "asset_004",
    title: "Smart Contract Library v2.3",
    description: "Open-source Solidity library for ERC-721 NFT minting with built-in royalty enforcement.",
    assetType: "code",
    creatorId: "user_001",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C9b8dB2Cc3456",
    licenseType: "use-based",
    cryptoHash: crypto.createHash("sha256").update("code_004").digest("hex"),
    perceptualHash: "d7e5f0a4b6c8d3e1",
    status: "registered",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const seedLicenses: License[] = [
  {
    id: "lic_001",
    assetId: "asset_001",
    licenseeId: "user_002",
    licenseType: "exclusive",
    terms: "Permitted for commercial use in digital media, excluding physical prints. Territory: worldwide.",
    royaltyPercent: 12.5,
    expiresAt: new Date(Date.now() + 86400000 * 365).toISOString(),
    isActive: true,
    transactionHash: "0xabc123def456abc123def456abc123def456abc123def456abc123def456abc1",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    asset: { title: "Digital Landscape Art — Series I", assetType: "image" },
  },
  {
    id: "lic_002",
    assetId: "asset_003",
    licenseeId: "user_003",
    licenseType: "time-bound",
    terms: "Non-exclusive streaming rights for background music in video content. Duration: 1 year.",
    royaltyPercent: 8,
    expiresAt: new Date(Date.now() + 86400000 * 180).toISOString(),
    isActive: true,
    transactionHash: "0xdef789abc012def789abc012def789abc012def789abc012def789abc012def7",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    asset: { title: "Ambient Soundscape — Neural Drift", assetType: "audio" },
  },
];

const seedInfringements: Infringement[] = [
  {
    id: "inf_001",
    assetId: "asset_001",
    similarityScore: 93.7,
    detectedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: "detected",
    evidenceHash: crypto.randomBytes(32).toString("hex"),
    platform: "OpenSea",
    asset: { title: "Digital Landscape Art — Series I", creatorAddress: "0x742d35Cc6634C0532925a3b8D4C9b8dB2Cc3456" },
  },
  {
    id: "inf_002",
    assetId: "asset_003",
    similarityScore: 87.2,
    detectedAt: new Date(Date.now() - 86400000).toISOString(),
    status: "detected",
    evidenceHash: crypto.randomBytes(32).toString("hex"),
    platform: "Instagram",
    asset: { title: "Ambient Soundscape — Neural Drift", creatorAddress: "0x742d35Cc6634C0532925a3b8D4C9b8dB2Cc3456" },
  },
];

// In-memory store (persists during server lifetime)
const store = {
  assets: [...seedAssets] as Asset[],
  licenses: [...seedLicenses] as License[],
  infringements: [...seedInfringements] as Infringement[],
};

function newId(prefix: string) {
  return `${prefix}_${crypto.randomBytes(6).toString("hex")}`;
}

function now() {
  return new Date().toISOString();
}

// ─── Asset DB ─────────────────────────────────────────────────────────────────

export const assetDb = {
  findAll(params?: { type?: string; status?: string; page?: number }) {
    let items = [...store.assets];
    if (params?.type) items = items.filter((a) => a.assetType === params.type);
    if (params?.status) items = items.filter((a) => a.status === params.status);
    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const page = params?.page || 1;
    const limit = 10;
    return {
      assets: items.slice((page - 1) * limit, page * limit),
      total: items.length,
      page,
      pages: Math.ceil(items.length / limit),
    };
  },

  findById(id: string) {
    const asset = store.assets.find((a) => a.id === id);
    if (!asset) return null;
    return {
      ...asset,
      licenses: store.licenses.filter((l) => l.assetId === id),
      infringements: store.infringements.filter((i) => i.assetId === id),
    };
  },

  create(data: Omit<Asset, "id" | "createdAt" | "updatedAt">) {
    const asset: Asset = { ...data, id: newId("asset"), createdAt: now(), updatedAt: now() };
    store.assets.push(asset);
    return asset;
  },

  mint(id: string) {
    const asset = store.assets.find((a) => a.id === id);
    if (!asset) return null;
    asset.nftTokenId = `NFT-${crypto.randomBytes(8).toString("hex").toUpperCase()}`;
    asset.nftContract = `0x${crypto.randomBytes(20).toString("hex")}`;
    asset.ipfsHash = `Qm${crypto.randomBytes(23).toString("hex")}`;
    asset.status = "minted";
    asset.mintedAt = now();
    asset.updatedAt = now();
    return asset;
  },

  delete(id: string) {
    const idx = store.assets.findIndex((a) => a.id === id);
    if (idx === -1) return false;
    store.assets.splice(idx, 1);
    return true;
  },

  stats() {
    const total = store.assets.length;
    const minted = store.assets.filter((a) => a.status === "minted").length;
    const byType = store.assets.reduce<Record<string, number>>((acc, a) => {
      acc[a.assetType] = (acc[a.assetType] || 0) + 1;
      return acc;
    }, {});
    return { total, minted, byType };
  },
};

// ─── License DB ───────────────────────────────────────────────────────────────

export const licenseDb = {
  findAll(assetId?: string) {
    let items = [...store.licenses];
    if (assetId) items = items.filter((l) => l.assetId === assetId);
    return items
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((l) => ({
        ...l,
        asset: store.assets.find((a) => a.id === l.assetId)
          ? { title: store.assets.find((a) => a.id === l.assetId)!.title, assetType: store.assets.find((a) => a.id === l.assetId)!.assetType }
          : l.asset,
      }));
  },

  create(data: Omit<License, "id" | "createdAt" | "updatedAt" | "asset">) {
    const license: License = { ...data, id: newId("lic"), createdAt: now(), updatedAt: now() };
    store.licenses.push(license);
    return license;
  },

  revoke(id: string) {
    const lic = store.licenses.find((l) => l.id === id);
    if (!lic) return null;
    lic.isActive = false;
    lic.updatedAt = now();
    return lic;
  },

  count() {
    return store.licenses.filter((l) => l.isActive).length;
  },
};

// ─── Infringement DB ──────────────────────────────────────────────────────────

export const infringementDb = {
  findAll(assetId?: string) {
    let items = [...store.infringements];
    if (assetId) items = items.filter((i) => i.assetId === assetId);
    return items
      .sort((a, b) => new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime())
      .map((i) => ({
        ...i,
        asset: store.assets.find((a) => a.id === i.assetId)
          ? { title: store.assets.find((a) => a.id === i.assetId)!.title, creatorAddress: store.assets.find((a) => a.id === i.assetId)!.creatorAddress }
          : i.asset,
      }));
  },

  create(data: Omit<Infringement, "id" | "detectedAt" | "asset">) {
    const inf: Infringement = { ...data, id: newId("inf"), detectedAt: now() };
    store.infringements.push(inf);
    return inf;
  },

  count() {
    return store.infringements.filter((i) => i.status === "detected").length;
  },
};
