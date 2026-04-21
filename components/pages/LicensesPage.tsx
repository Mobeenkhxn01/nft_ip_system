"use client";

import { useState } from "react";
import { useLicenses, useCreateLicense, useRevokeLicense, useAssets } from "@/hooks/use-api";
import { FileKey2, Plus, X, CheckCircle2, XCircle, Clock, Percent } from "lucide-react";

function LicenseModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    assetId: "",
    licenseeId: "user_" + Math.random().toString(36).slice(2, 8),
    licenseType: "non-exclusive",
    terms: "",
    royaltyPercent: "10",
    expiresAt: "",
  });
  const createLicense = useCreateLicense();
  const { data: assetsData } = useAssets();
  const mintedAssets = (assetsData?.assets || []).filter((a: { status: string }) => a.status === "minted");

  const handleSubmit = async () => {
    if (!form.assetId || !form.terms) return;
    await createLicense.mutateAsync({ ...form, royaltyPercent: parseFloat(form.royaltyPercent) });
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
          maxWidth: 500,
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
            <FileKey2 size={18} color="#10b981" />
            <h2 style={{ fontSize: 20, fontWeight: 800 }}>Create License</h2>
          </div>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
            Smart contract will enforce license terms automatically on-chain.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 6 }}>
              SELECT MINTED ASSET
            </label>
            <select className="input" value={form.assetId} onChange={(e) => setForm({ ...form, assetId: e.target.value })}>
              <option value="">Choose an asset…</option>
              {mintedAssets.map((a: { id: string; title: string }) => (
                <option key={a.id} value={a.id}>{a.title}</option>
              ))}
            </select>
            {mintedAssets.length === 0 && (
              <div style={{ fontSize: 11, color: "#f59e0b", marginTop: 4 }}>
                ⚠ No minted assets yet. Mint an asset first.
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 6 }}>
                LICENSE TYPE
              </label>
              <select className="input" value={form.licenseType} onChange={(e) => setForm({ ...form, licenseType: e.target.value })}>
                <option value="exclusive">Exclusive</option>
                <option value="non-exclusive">Non-Exclusive</option>
                <option value="time-bound">Time-Bound</option>
                <option value="use-based">Use-Based</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 6 }}>
                ROYALTY %
              </label>
              <input
                className="input"
                type="number"
                min="0"
                max="100"
                value={form.royaltyPercent}
                onChange={(e) => setForm({ ...form, royaltyPercent: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 6 }}>
              LICENSE TERMS
            </label>
            <textarea
              className="input"
              placeholder="Define permitted uses, restrictions, territories..."
              value={form.terms}
              onChange={(e) => setForm({ ...form, terms: e.target.value })}
              rows={3}
              style={{ resize: "vertical" }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 6 }}>
              EXPIRY DATE (optional)
            </label>
            <input
              className="input"
              type="date"
              value={form.expiresAt}
              onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
            />
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={createLicense.isPending || !form.assetId || !form.terms}
            >
              {createLicense.isPending ? "Creating…" : "Create License"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LicensesPage() {
  const [showModal, setShowModal] = useState(false);
  const { data: licenses, isLoading } = useLicenses();
  const revoke = useRevokeLicense();

  const licenseList = Array.isArray(licenses) ? licenses : [];

  return (
    <div style={{ padding: "32px", maxWidth: 1100 }}>
      {showModal && <LicenseModal onClose={() => setShowModal(false)} />}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <FileKey2 size={16} color="#10b981" />
            <span style={{ fontSize: 12, color: "#10b981", fontWeight: 700, letterSpacing: "0.1em" }} className="font-mono">
              SMART CONTRACTS
            </span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em" }}>
            IP <span style={{ background: "linear-gradient(135deg,#10b981,#00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Licenses</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: 6, fontSize: 14 }}>
            Automated royalty distribution and access control via smart contracts.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} /> New License
        </button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: 64, color: "var(--text-muted)" }}>Loading licenses…</div>
      ) : licenseList.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: 64,
            background: "var(--bg-card)",
            border: "1px dashed var(--border-bright)",
            borderRadius: 16,
          }}
        >
          <FileKey2 size={48} color="var(--text-muted)" style={{ margin: "0 auto 16px" }} />
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No licenses created</div>
          <p style={{ color: "var(--text-muted)", marginBottom: 20, fontSize: 14 }}>
            Create your first smart contract license for a minted asset.
          </p>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Create First License
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {licenseList.map((license: {
            id: string;
            asset: { title: string; assetType: string };
            licenseType: string;
            royaltyPercent: number;
            isActive: boolean;
            terms: string;
            expiresAt?: string;
            transactionHash?: string;
            createdAt: string;
          }) => (
            <div
              key={license.id}
              className="card-hover"
              style={{
                background: "var(--bg-card)",
                border: `1px solid ${license.isActive ? "var(--border)" : "rgba(244,63,94,0.15)"}`,
                borderRadius: 12,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              {/* Status icon */}
              <div>
                {license.isActive ? (
                  <CheckCircle2 size={22} color="#10b981" />
                ) : (
                  <XCircle size={22} color="#f43f5e" />
                )}
              </div>

              {/* Asset info */}
              <div style={{ flex: "1 1 180px", minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{license.asset?.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                  {license.asset?.assetType}
                </div>
              </div>

              {/* License type */}
              <div style={{ flex: "0 0 auto" }}>
                <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 3 }} className="font-mono">TYPE</div>
                <span
                  style={{
                    fontSize: 11,
                    padding: "3px 10px",
                    borderRadius: 6,
                    background: "rgba(124,58,237,0.1)",
                    color: "#a78bfa",
                    border: "1px solid rgba(124,58,237,0.2)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                  className="font-mono"
                >
                  {license.licenseType}
                </span>
              </div>

              {/* Royalty */}
              <div style={{ flex: "0 0 80px", textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 3 }} className="font-mono">ROYALTY</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <Percent size={12} color="var(--accent-cyan)" />
                  <span style={{ fontWeight: 800, fontSize: 18, color: "var(--accent-cyan)" }}>
                    {license.royaltyPercent}
                  </span>
                </div>
              </div>

              {/* Expiry */}
              <div style={{ flex: "0 0 auto" }}>
                <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 3 }} className="font-mono">EXPIRES</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                  <Clock size={11} color="var(--text-muted)" />
                  <span className="font-mono" style={{ color: "var(--text-secondary)" }}>
                    {license.expiresAt ? new Date(license.expiresAt).toLocaleDateString() : "Perpetual"}
                  </span>
                </div>
              </div>

              {/* Tx hash */}
              {license.transactionHash && (
                <div style={{ flex: "0 0 auto" }}>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 3 }} className="font-mono">TX HASH</div>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }} className="font-mono">
                    {license.transactionHash.slice(0, 14)}…
                  </span>
                </div>
              )}

              {/* Revoke */}
              {license.isActive && (
                <button
                  className="btn-danger"
                  onClick={() => revoke.mutate(license.id)}
                  disabled={revoke.isPending}
                  style={{ flexShrink: 0 }}
                >
                  {revoke.isPending ? "Revoking…" : "Revoke"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
