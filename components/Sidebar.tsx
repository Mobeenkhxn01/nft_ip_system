"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Shield,
  FileKey2,
  AlertTriangle,
  Settings,
  ChevronLeft,
  ChevronRight,
  Hexagon,
  Cpu,
  Zap,
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "assets", label: "IP Assets", icon: Shield },
  { id: "licenses", label: "Licenses", icon: FileKey2 },
  { id: "infringements", label: "Infringements", icon: AlertTriangle },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? 72 : 240,
        minHeight: "100vh",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
        position: "relative",
        zIndex: 10,
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? "24px 16px" : "24px 20px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 0 20px rgba(0,212,255,0.3)",
          }}
        >
          <Hexagon size={18} color="white" fill="white" />
        </div>
        {!collapsed && (
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
              className="gradient-text"
            >
              ChainIP
            </div>
            <div
              style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.08em", marginTop: 2 }}
              className="font-mono"
            >
              IP PROTECTION
            </div>
          </div>
        )}
      </div>

      {/* Network Status */}
      {!collapsed && (
        <div
          style={{
            margin: "12px 16px",
            padding: "10px 14px",
            background: "rgba(16,185,129,0.06)",
            border: "1px solid rgba(16,185,129,0.2)",
            borderRadius: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--accent-emerald)",
                boxShadow: "0 0 8px rgba(16,185,129,0.8)",
              }}
            />
            <span style={{ fontSize: 11, color: "#10b981", fontWeight: 600 }} className="font-mono">
              ETHEREUM MAINNET
            </span>
          </div>
          <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4 }} className="font-mono">
            Block: #21,847,329
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`nav-link ${isActive ? "active" : ""}`}
              style={{
                justifyContent: collapsed ? "center" : "flex-start",
                padding: collapsed ? "10px" : "10px 16px",
              }}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* AI Status */}
      {!collapsed && (
        <div
          style={{
            margin: "12px 16px",
            padding: "12px 14px",
            background: "rgba(124,58,237,0.06)",
            border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Cpu size={13} color="var(--accent-violet)" />
            <span style={{ fontSize: 11, color: "#a78bfa", fontWeight: 700 }} className="font-mono">
              AI ENGINE
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Zap size={11} color="#f59e0b" />
            <span style={{ fontSize: 10, color: "var(--text-muted)" }} className="font-mono">
              91.3% accuracy · online
            </span>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          margin: "12px",
          padding: "8px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          color: "var(--text-muted)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-bright)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
        }}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
