"use client";

import { useDashboardStats } from "@/hooks/use-api";
import {
  Shield,
  Cpu,
  FileKey2,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle2,
  Activity,
} from "lucide-react";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  sub,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  sub?: string;
}) {
  return (
    <div className="stat-card animate-fade-in-up">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `${color}18`,
            border: `1px solid ${color}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={20} color={color} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <TrendingUp size={12} color="#10b981" />
          <span style={{ fontSize: 11, color: "#10b981", fontWeight: 600 }} className="font-mono">
            +12%
          </span>
        </div>
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 6, fontWeight: 600 }}>{label}</div>
      {sub && (
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }} className="font-mono">
          {sub}
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const { data, isLoading } = useDashboardStats();

  const stats = data?.stats || { totalAssets: 0, mintedAssets: 0, activeLicenses: 0, pendingInfringements: 0 };
  const recentAssets = data?.recentAssets || [];
  const recentInfringements = data?.recentInfringements || [];

  return (
    <div style={{ padding: "32px", maxWidth: 1200 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <Activity size={16} color="var(--accent-cyan)" />
          <span style={{ fontSize: 12, color: "var(--accent-cyan)", fontWeight: 700, letterSpacing: "0.1em" }} className="font-mono">
            SYSTEM OVERVIEW
          </span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          IP Protection{" "}
          <span className="gradient-text">Dashboard</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: 8, fontSize: 15 }}>
          Real-time monitoring of your digital intellectual property ecosystem.
        </p>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatCard label="Total IP Assets" value={isLoading ? "—" : stats.totalAssets} icon={Shield} color="#00d4ff" sub="Registered on-chain" />
        <StatCard label="Minted NFTs" value={isLoading ? "—" : stats.mintedAssets} icon={Cpu} color="#7c3aed" sub="ERC-721 / ERC-1155" />
        <StatCard label="Active Licenses" value={isLoading ? "—" : stats.activeLicenses} icon={FileKey2} color="#10b981" sub="Smart contract managed" />
        <StatCard label="Infringements" value={isLoading ? "—" : stats.pendingInfringements} icon={AlertTriangle} color="#f43f5e" sub="Pending review" />
      </div>

      {/* Two column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Recent Assets */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "18px 20px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Shield size={15} color="var(--accent-cyan)" />
              <span style={{ fontWeight: 700, fontSize: 14 }}>Recent Assets</span>
            </div>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }} className="font-mono">
              LATEST 5
            </span>
          </div>
          <div>
            {isLoading ? (
              <div style={{ padding: 32, textAlign: "center", color: "var(--text-muted)" }}>Loading…</div>
            ) : recentAssets.length === 0 ? (
              <div style={{ padding: 32, textAlign: "center", color: "var(--text-muted)", fontSize: 14 }}>
                No assets registered yet
              </div>
            ) : (
              recentAssets.map((asset: { id: string; title: string; assetType: string; status: string; createdAt: string }, i: number) => (
                <div
                  key={asset.id}
                  style={{
                    padding: "14px 20px",
                    borderBottom: i < recentAssets.length - 1 ? "1px solid var(--border)" : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{asset.title}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }} className="font-mono">
                      {asset.assetType} · {new Date(asset.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <span className={`badge badge-${asset.status}`}>{asset.status}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Infringements */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "18px 20px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <AlertTriangle size={15} color="#f43f5e" />
              <span style={{ fontWeight: 700, fontSize: 14 }}>Recent Detections</span>
            </div>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }} className="font-mono">
              AI MONITOR
            </span>
          </div>
          <div>
            {isLoading ? (
              <div style={{ padding: 32, textAlign: "center", color: "var(--text-muted)" }}>Loading…</div>
            ) : recentInfringements.length === 0 ? (
              <div style={{ padding: 32, textAlign: "center" }}>
                <CheckCircle2 size={32} color="#10b981" style={{ margin: "0 auto 10px" }} />
                <div style={{ fontSize: 14, color: "var(--text-muted)" }}>No infringements detected</div>
              </div>
            ) : (
              recentInfringements.map((inf: { id: string; asset: { title: string }; similarityScore: number; platform?: string; detectedAt: string; status: string }, i: number) => (
                <div
                  key={inf.id}
                  style={{
                    padding: "14px 20px",
                    borderBottom: i < recentInfringements.length - 1 ? "1px solid var(--border)" : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{inf.asset?.title}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }} className="font-mono">
                      {inf.platform || "Unknown"} · {inf.similarityScore.toFixed(1)}% match
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Clock size={11} color="var(--text-muted)" />
                    <span style={{ fontSize: 10, color: "var(--text-muted)" }} className="font-mono">
                      {new Date(inf.detectedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* System metrics strip */}
      <div
        style={{
          marginTop: 20,
          padding: "16px 24px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Avg Mint Time", value: "11.2s" },
          { label: "Gas Cost (mint)", value: "0.0034 ETH" },
          { label: "License Tx Cost", value: "0.0019 ETH" },
          { label: "Detection Accuracy", value: "91.3%" },
          { label: "Storage", value: "IPFS + On-chain" },
          { label: "Contracts", value: "ERC-721 / ERC-1155" },
        ].map((m) => (
          <div key={m.label}>
            <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.08em" }} className="font-mono">
              {m.label}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--accent-cyan)", marginTop: 2 }}>
              {m.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
