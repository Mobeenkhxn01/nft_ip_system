"use client";

import { useState } from "react";
import { useInfringements, useDetectInfringement, useAssets } from "@/hooks/use-api";
import { AlertTriangle, Scan, CheckCircle2, ExternalLink, Hash, Globe, BarChart3 } from "lucide-react";

function SimilarityBar({ score }: { score: number }) {
  const color = score >= 90 ? "#f43f5e" : score >= 75 ? "#f59e0b" : "#10b981";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          flex: 1,
          height: 6,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${score}%`,
            height: "100%",
            background: color,
            borderRadius: 3,
            boxShadow: `0 0 8px ${color}80`,
            transition: "width 1s ease",
          }}
        />
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color, minWidth: 40 }} className="font-mono">
        {score.toFixed(1)}%
      </span>
    </div>
  );
}

export default function InfringementsPage() {
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [detectResult, setDetectResult] = useState<{ detected: boolean; similarityScore: number } | null>(null);
  const { data: infringements, isLoading } = useInfringements();
  const { data: assetsData } = useAssets();
  const detect = useDetectInfringement();

  const list = Array.isArray(infringements) ? infringements : [];
  const assets = assetsData?.assets || [];

  const handleDetect = async () => {
    if (!selectedAssetId) return;
    const result = await detect.mutateAsync(selectedAssetId);
    setDetectResult(result);
  };

  return (
    <div style={{ padding: "32px", maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <AlertTriangle size={16} color="#f43f5e" />
          <span style={{ fontSize: 12, color: "#f43f5e", fontWeight: 700, letterSpacing: "0.1em" }} className="font-mono">
            AI DETECTION ENGINE
          </span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em" }}>
          Infringement{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#f43f5e,#f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Monitor
          </span>
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: 6, fontSize: 14 }}>
          AI-powered multimodal similarity analysis with blockchain-linked evidence generation.
        </p>
      </div>

      {/* Detect panel */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid rgba(244,63,94,0.2)",
          borderRadius: 14,
          padding: 24,
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <Scan size={16} color="#f43f5e" />
          <span style={{ fontWeight: 700, fontSize: 15 }}>Run AI Detection Scan</span>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <label style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 6 }}>
              SELECT ASSET TO SCAN
            </label>
            <select
              className="input"
              value={selectedAssetId}
              onChange={(e) => { setSelectedAssetId(e.target.value); setDetectResult(null); }}
            >
              <option value="">Choose a registered asset…</option>
              {assets.map((a: { id: string; title: string; status: string }) => (
                <option key={a.id} value={a.id}>{a.title} ({a.status})</option>
              ))}
            </select>
          </div>
          <button
            className="btn-primary"
            onClick={handleDetect}
            disabled={!selectedAssetId || detect.isPending}
            style={{ flexShrink: 0 }}
          >
            <Scan size={15} />
            {detect.isPending ? "Scanning…" : "Run AI Scan"}
          </button>
        </div>

        {/* Result */}
        {detectResult && (
          <div
            style={{
              marginTop: 16,
              padding: "14px 18px",
              borderRadius: 10,
              background: detectResult.detected ? "rgba(244,63,94,0.08)" : "rgba(16,185,129,0.08)",
              border: `1px solid ${detectResult.detected ? "rgba(244,63,94,0.25)" : "rgba(16,185,129,0.25)"}`,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            {detectResult.detected ? (
              <AlertTriangle size={20} color="#f43f5e" />
            ) : (
              <CheckCircle2 size={20} color="#10b981" />
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: detectResult.detected ? "#f43f5e" : "#10b981", marginBottom: 4 }}>
                {detectResult.detected ? "⚠ Potential Infringement Detected" : "✓ No Infringement Found"}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                Similarity score: {detectResult.similarityScore.toFixed(2)}%
                {detectResult.detected && " — Evidence package generated and linked to blockchain record."}
              </div>
            </div>
            <div>
              <SimilarityBar score={detectResult.similarityScore} />
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Detections", value: list.length, color: "#f43f5e", icon: AlertTriangle },
          { label: "Avg Similarity", value: list.length ? (list.reduce((s: number, i: { similarityScore: number }) => s + i.similarityScore, 0) / list.length).toFixed(1) + "%" : "—", color: "#f59e0b", icon: BarChart3 },
          { label: "Platforms Scanned", value: [...new Set(list.map((i: { platform?: string }) => i.platform))].filter(Boolean).length, color: "#00d4ff", icon: Globe },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <Icon size={15} color={s.color} />
                <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }} className="font-mono">
                  {s.label}
                </span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Infringement list */}
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
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 14 }}>Detected Infringements</span>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }} className="font-mono">
            {list.length} RECORDS
          </span>
        </div>

        {isLoading ? (
          <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>Loading…</div>
        ) : list.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center" }}>
            <CheckCircle2 size={40} color="#10b981" style={{ margin: "0 auto 12px" }} />
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>All clear</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>No infringements detected yet. Run a scan to check.</div>
          </div>
        ) : (
          list.map((inf: {
            id: string;
            asset: { title: string };
            similarityScore: number;
            platform?: string;
            status: string;
            evidenceHash?: string;
            detectedAt: string;
          }, i: number) => (
            <div
              key={inf.id}
              style={{
                padding: "18px 24px",
                borderBottom: i < list.length - 1 ? "1px solid var(--border)" : "none",
                display: "grid",
                gridTemplateColumns: "1fr 200px 120px auto",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{inf.asset?.title}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {inf.platform && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Globe size={11} color="var(--text-muted)" />
                      <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{inf.platform}</span>
                    </div>
                  )}
                  {inf.evidenceHash && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Hash size={11} color="var(--text-muted)" />
                      <span style={{ fontSize: 11, color: "var(--text-muted)" }} className="font-mono">
                        {inf.evidenceHash.slice(0, 12)}…
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 6 }} className="font-mono">
                  SIMILARITY SCORE
                </div>
                <SimilarityBar score={inf.similarityScore} />
              </div>

              <div>
                <span className={`badge badge-${inf.status}`}>{inf.status}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }} className="font-mono">
                  {new Date(inf.detectedAt).toLocaleDateString()}
                </div>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--accent-cyan)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  <ExternalLink size={12} /> Evidence
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
