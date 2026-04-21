"use client";

import { useState } from "react";
import { useAssets, useCreateAsset, useMintAsset } from "@/hooks/use-api";
import {
  Shield,
  Plus,
  X,
  Zap,
  Image,
  FileText,
  Music,
  Code2,
  ExternalLink,
  Hash,
  Calendar,
} from "lucide-react";

const assetTypeIcons: Record<string, React.ElementType> = {
  image: Image,
  text: FileText,
  audio: Music,
  code: Code2,
};

function RegisterModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    assetType: "image",
    creatorId: "user_001",
    creatorAddress: "0x742d35Cc6634C0532925a3b8D4C9b8dB2Cc3456",
    licenseType: "exclusive",
    content: "",
  });
  const createAsset = useCreateAsset();

  const handleSubmit = async () => {
    if (!form.title || !form.description) return;
    await createAsset.mutateAsync(form as any);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: 20,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-bright)",
          borderRadius: 16,
          padding: 32,
          width: "100%",
          maxWidth: 520,
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            color: "var(--text-muted)",
            cursor: "pointer",
            padding: 6,
            display: "flex",
          }}
        >
          <X size={16} />
        </button>

        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <Shield size={18} color="var(--accent-cyan)" />
            <h2 style={{ fontSize: 20, fontWeight: 800 }}>Register IP Asset</h2>
          </div>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
            Your asset will be fingerprinted and linked to an NFT on-chain.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 6 }}>
              TITLE
            </label>
            <input
              className="input"
              placeholder="Enter asset title..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 6 }}>
              DESCRIPTION
            </label>
            <textarea
              className="input"
              placeholder="Describe your intellectual property..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              style={{ resize: "vertical" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 6 }}>
                ASSET TYPE
              </label>
              <select
                className="input"
                value={form.assetType}
                onChange={(e) => setForm({ ...form, assetType: e.target.value })}
              >
                <option value="image">Image / Art</option>
                <option value="text">Text / Document</option>
                <option value="audio">Audio / Music</option>
                <option value="code">Code / Software</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 6 }}>
                LICENSE TYPE
              </label>
              <select
                className="input"
                value={form.licenseType}
                onChange={(e) => setForm({ ...form, licenseType: e.target.value })}
              >
                <option value="exclusive">Exclusive</option>
                <option value="non-exclusive">Non-Exclusive</option>
                <option value="time-bound">Time-Bound</option>
                <option value="use-based">Use-Based</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 6 }}>
              CREATOR WALLET ADDRESS
            </label>
            <input
              className="input font-mono"
              style={{ fontSize: 12 }}
              placeholder="0x..."
              value={form.creatorAddress}
              onChange={(e) => setForm({ ...form, creatorAddress: e.target.value })}
            />
          </div>

          <div
            style={{
              padding: 12,
              background: "rgba(0,212,255,0.05)",
              border: "1px solid rgba(0,212,255,0.15)",
              borderRadius: 8,
              fontSize: 12,
              color: "var(--text-muted)",
            }}
          >
            <span style={{ color: "var(--accent-cyan)", fontWeight: 700 }}>ℹ</span>
            &nbsp; SHA-256 cryptographic hash + perceptual fingerprint will be generated automatically and stored on-chain.
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={createAsset.isPending || !form.title}
            >
              {createAsset.isPending ? "Registering…" : "Register Asset"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AssetsPage() {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("");
  const { data, isLoading } = useAssets();
  const mintAsset = useMintAsset();

  const assets = data?.assets || [];

  return (
    <div style={{ padding: "32px", maxWidth: 1200 }}>
      {showModal && <RegisterModal onClose={() => setShowModal(false)} />}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <Shield size={16} color="var(--accent-cyan)" />
            <span style={{ fontSize: 12, color: "var(--accent-cyan)", fontWeight: 700, letterSpacing: "0.1em" }} className="font-mono">
              IP REGISTRY
            </span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em" }}>
            IP <span className="gradient-text">Assets</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: 6, fontSize: 14 }}>
            Register, fingerprint, and mint NFTs for your digital creations.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Register Asset
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {["", "image", "text", "audio", "code"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              padding: "7px 16px",
              borderRadius: 100,
              border: `1px solid ${filter === type ? "var(--accent-cyan)" : "var(--border)"}`,
              background: filter === type ? "rgba(0,212,255,0.1)" : "transparent",
              color: filter === type ? "var(--accent-cyan)" : "var(--text-muted)",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "'Syne', sans-serif",
            }}
          >
            {type === "" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Assets grid */}
      {isLoading ? (
        <div style={{ textAlign: "center", padding: 64, color: "var(--text-muted)" }}>
          <div className="animate-float">
            <Shield size={40} color="var(--accent-cyan)" style={{ margin: "0 auto 12px" }} />
          </div>
          Loading assets…
        </div>
      ) : assets.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: 64,
            background: "var(--bg-card)",
            border: "1px dashed var(--border-bright)",
            borderRadius: 16,
          }}
        >
          <Shield size={48} color="var(--text-muted)" style={{ margin: "0 auto 16px" }} />
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No assets registered</div>
          <p style={{ color: "var(--text-muted)", marginBottom: 20, fontSize: 14 }}>
            Register your first IP asset to get started.
          </p>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Register Your First Asset
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {assets
            .filter((a: { assetType: string }) => !filter || a.assetType === filter)
            .map((asset: {
              id: string;
              title: string;
              description: string;
              assetType: string;
              status: string;
              licenseType: string;
              cryptoHash: string;
              nftTokenId?: string;
              ipfsHash?: string;
              createdAt: string;
              mintedAt?: string;
            }) => {
              const Icon = assetTypeIcons[asset.assetType] || FileText;
              return (
                <div
                  key={asset.id}
                  className="card-hover"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  {/* Asset header */}
                  <div
                    style={{
                      padding: "20px",
                      borderBottom: "1px solid var(--border)",
                      background: "linear-gradient(135deg, rgba(0,212,255,0.04), rgba(124,58,237,0.04))",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            background: "rgba(0,212,255,0.1)",
                            border: "1px solid rgba(0,212,255,0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={18} color="var(--accent-cyan)" />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>{asset.title}</div>
                          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3, textTransform: "capitalize" }}>
                            {asset.assetType}
                          </div>
                        </div>
                      </div>
                      <span className={`badge badge-${asset.status}`}>{asset.status}</span>
                    </div>
                  </div>

                  <div style={{ padding: "16px 20px" }}>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 14 }}>
                      {asset.description.length > 80 ? asset.description.slice(0, 80) + "…" : asset.description}
                    </p>

                    {/* Metadata */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Hash size={11} color="var(--text-muted)" />
                        <span style={{ fontSize: 11, color: "var(--text-muted)" }} className="font-mono">
                          {asset.cryptoHash.slice(0, 24)}…
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Calendar size={11} color="var(--text-muted)" />
                        <span style={{ fontSize: 11, color: "var(--text-muted)" }} className="font-mono">
                          {new Date(asset.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {asset.nftTokenId && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <ExternalLink size={11} color="var(--accent-emerald)" />
                          <span style={{ fontSize: 11, color: "#10b981" }} className="font-mono">
                            {asset.nftTokenId}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* License badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                      <span
                        style={{
                          fontSize: 10,
                          padding: "3px 8px",
                          borderRadius: 4,
                          background: "rgba(124,58,237,0.1)",
                          color: "#a78bfa",
                          border: "1px solid rgba(124,58,237,0.2)",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                        className="font-mono"
                      >
                        {asset.licenseType}
                      </span>
                    </div>

                    {/* Action */}
                    {asset.status !== "minted" ? (
                      <button
                        className="btn-primary"
                        style={{ width: "100%", justifyContent: "center" }}
                        onClick={() => mintAsset.mutate(asset.id)}
                        disabled={mintAsset.isPending}
                      >
                        <Zap size={14} />
                        {mintAsset.isPending ? "Minting…" : "Mint NFT"}
                      </button>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                          padding: "9px",
                          background: "rgba(16,185,129,0.06)",
                          border: "1px solid rgba(16,185,129,0.2)",
                          borderRadius: 8,
                          fontSize: 13,
                          color: "#10b981",
                          fontWeight: 700,
                        }}
                      >
                        ✓ NFT Minted
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
