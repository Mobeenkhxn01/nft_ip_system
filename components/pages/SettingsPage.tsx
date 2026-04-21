"use client";

import { Settings, Wallet, Database, Cpu, Bell, Shield, Globe, Key } from "lucide-react";

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Icon size={16} color="var(--accent-cyan)" />
        <span style={{ fontWeight: 700, fontSize: 14 }}>{title}</span>
      </div>
      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
}

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        padding: "12px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
        {description && (
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{description}</div>
        )}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  return (
    <div
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: defaultOn ? "var(--accent-cyan)" : "rgba(255,255,255,0.1)",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s",
        boxShadow: defaultOn ? "0 0 12px rgba(0,212,255,0.4)" : "none",
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "white",
          position: "absolute",
          top: 3,
          left: defaultOn ? 23 : 3,
          transition: "left 0.2s",
        }}
      />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div style={{ padding: "32px", maxWidth: 760 }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <Settings size={16} color="var(--accent-cyan)" />
          <span style={{ fontSize: 12, color: "var(--accent-cyan)", fontWeight: 700, letterSpacing: "0.1em" }} className="font-mono">
            CONFIGURATION
          </span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em" }}>
          System <span className="gradient-text">Settings</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: 6, fontSize: 14 }}>
          Configure blockchain, AI engine, storage, and notification preferences.
        </p>
      </div>

      <Section title="Wallet & Blockchain" icon={Wallet}>
        <SettingRow label="Connected Wallet" description="Your Ethereum wallet for signing transactions">
          <div
            style={{
              padding: "7px 14px",
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.2)",
              borderRadius: 8,
              fontSize: 12,
              color: "#10b981",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            0x742d35Cc…3456
          </div>
        </SettingRow>
        <SettingRow label="Network" description="Active blockchain network">
          <select className="input" style={{ width: "auto", minWidth: 180 }}>
            <option>Ethereum Mainnet</option>
            <option>Polygon</option>
            <option>Arbitrum</option>
            <option>Sepolia Testnet</option>
          </select>
        </SettingRow>
        <SettingRow label="Gas Price Strategy" description="Transaction speed preference">
          <select className="input" style={{ width: "auto", minWidth: 140 }}>
            <option>Standard</option>
            <option>Fast</option>
            <option>Economy</option>
          </select>
        </SettingRow>
      </Section>

      <Section title="AI Engine" icon={Cpu}>
        <SettingRow label="Detection Sensitivity" description="Minimum similarity score to flag as infringement">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              className="input"
              type="range"
              min="50"
              max="99"
              defaultValue="85"
              style={{ width: 140, padding: 0, border: "none", background: "none", accentColor: "var(--accent-cyan)" }}
            />
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent-cyan)", minWidth: 36 }} className="font-mono">
              85%
            </span>
          </div>
        </SettingRow>
        <SettingRow label="Multimodal Scan" description="Scan images, text, audio, and video simultaneously">
          <Toggle defaultOn />
        </SettingRow>
        <SettingRow label="Auto-scan on mint" description="Run infringement detection automatically when minting">
          <Toggle defaultOn />
        </SettingRow>
        <SettingRow label="Continuous monitoring" description="Monitor registered assets 24/7 across platforms">
          <Toggle />
        </SettingRow>
      </Section>

      <Section title="Storage" icon={Database}>
        <SettingRow label="IPFS Gateway" description="Content addressing for off-chain files">
          <input
            className="input"
            defaultValue="https://ipfs.io/ipfs/"
            style={{ width: 260 }}
          />
        </SettingRow>
        <SettingRow label="On-chain metadata" description="Store full metadata on blockchain (higher gas)">
          <Toggle />
        </SettingRow>
        <SettingRow label="Encryption" description="Encrypt off-chain content before IPFS upload">
          <Toggle defaultOn />
        </SettingRow>
      </Section>

      <Section title="API Keys" icon={Key}>
        <SettingRow label="Infura API Key" description="Ethereum node provider">
          <input
            className="input font-mono"
            type="password"
            defaultValue="••••••••••••••••••••••••"
            style={{ width: 220, fontSize: 12 }}
          />
        </SettingRow>
        <SettingRow label="IPFS API Key" description="Pinata / Web3.Storage for file pinning">
          <input
            className="input font-mono"
            type="password"
            defaultValue="••••••••••••••••••••••••"
            style={{ width: 220, fontSize: 12 }}
          />
        </SettingRow>
      </Section>

      <Section title="Notifications" icon={Bell}>
        <SettingRow label="Email alerts" description="Send email when infringement is detected">
          <Toggle defaultOn />
        </SettingRow>
        <SettingRow label="Webhook URL" description="POST notification to your endpoint">
          <input className="input" placeholder="https://your-app.com/webhook" style={{ width: 280 }} />
        </SettingRow>
      </Section>

      <Section title="Jurisdiction" icon={Globe}>
        <SettingRow label="Primary jurisdiction" description="For legal evidence and compliance">
          <select className="input" style={{ width: "auto", minWidth: 180 }}>
            <option>India</option>
            <option>United States</option>
            <option>European Union</option>
            <option>United Kingdom</option>
          </select>
        </SettingRow>
        <SettingRow label="GDPR compliance mode" description="Apply EU data protection rules">
          <Toggle />
        </SettingRow>
      </Section>

      <Section title="Security" icon={Shield}>
        <SettingRow label="Two-factor authentication" description="Require 2FA for sensitive operations">
          <Toggle defaultOn />
        </SettingRow>
        <SettingRow label="Audit log" description="Record all system actions to blockchain">
          <Toggle defaultOn />
        </SettingRow>
      </Section>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 8 }}>
        <button className="btn-secondary">Reset to Defaults</button>
        <button className="btn-primary">Save Changes</button>
      </div>
    </div>
  );
}
