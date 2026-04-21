import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { assetsApi, licensesApi, infringementsApi, dashboardApi } from "@/lib/api-client";

// ─── Asset Hooks ──────────────────────────────────────────────────────────────

export function useAssets(params?: { type?: string; status?: string; page?: number }) {
  return useQuery({
    queryKey: ["assets", params],
    queryFn: () => assetsApi.getAll(params).then((r) => r.data),
  });
}

export function useAsset(id: string) {
  return useQuery({
    queryKey: ["assets", id],
    queryFn: () => assetsApi.getById(id).then((r) => r.data),
    enabled: !!id,
  });
}

export function useCreateAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => assetsApi.create(data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["assets"] }),
  });
}

export function useMintAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => assetsApi.mint(id).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["assets"] }),
  });
}

// ─── License Hooks ───────────────────────────────────────────────────────────

export function useLicenses(assetId?: string) {
  return useQuery({
    queryKey: ["licenses", assetId],
    queryFn: () => licensesApi.getAll(assetId).then((r) => r.data),
  });
}

export function useCreateLicense() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      assetId: string;
      licenseeId: string;
      licenseType: string;
      terms: string;
      royaltyPercent: number;
      expiresAt?: string;
    }) => licensesApi.create(data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["licenses"] }),
  });
}

export function useRevokeLicense() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => licensesApi.revoke(id).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["licenses"] }),
  });
}

// ─── Infringement Hooks ──────────────────────────────────────────────────────

export function useInfringements(assetId?: string) {
  return useQuery({
    queryKey: ["infringements", assetId],
    queryFn: () => infringementsApi.getAll(assetId).then((r) => r.data),
  });
}

export function useDetectInfringement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (assetId: string) =>
      infringementsApi.detect(assetId).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["infringements"] }),
  });
}

// ─── Dashboard Hooks ─────────────────────────────────────────────────────────

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: () => dashboardApi.getStats().then((r) => r.data),
    refetchInterval: 30000,
  });
}
