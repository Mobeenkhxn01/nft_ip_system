"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardPage from "@/components/pages/DashboardPage";
import AssetsPage from "@/components/pages/AssetsPage";
import LicensesPage from "@/components/pages/LicensesPage";
import InfringementsPage from "@/components/pages/InfringementsPage";
import SettingsPage from "@/components/pages/SettingsPage";
import { Bell, Search } from "lucide-react";

const pages: Record<string, React.ComponentType> = {
  dashboard: DashboardPage,
  assets: AssetsPage,
  licenses: LicensesPage,
  infringements: InfringementsPage,
  settings: SettingsPage,
};

export default function Home() {
  const [activePage, setActivePage] = useState("dashboard");
  const PageComponent = pages[activePage] || DashboardPage;

  return (
    <div style={{ display: "flex", minHeight: "100vh", position: "relative", zIndex: 1 }}>
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <header
          style={{
            height: 60,
            borderBottom: "1px solid var(--border)",
            background: "rgba(10,15,30,0.8)",
            backdropFilter: "blur(20px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "7px 14px",
              flex: 1,
              maxWidth: 360,
            }}
          >
            <Search size={14} color="var(--text-muted)" />
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Search assets, licenses…</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Bell size={18} />
              <span
                style={{
                  position: "absolute",
                  top: -3,
                  right: -3,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#f43f5e",
                  boxShadow: "0 0 8px rgba(244,63,94,0.8)",
                }}
              />
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 12px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 800,
                  color: "white",
                }}
              >
                CU
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1 }}>CU Research</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1, marginTop: 2 }} className="font-mono">
                  Creator
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: "auto" }}>
          <PageComponent />
        </main>
      </div>
    </div>
  );
}
