"use client";

import { syncElasticsearch } from "@/lib/api";
import { toastError } from "@/lib/api";
import toast from "@/components/ui/Toast";
import { useState } from "react";

/**
 * Halaman dashboard admin dengan fitur sync Elasticsearch
 */
export default function AdminDashboard() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncResult, setLastSyncResult] = useState<{
    synced: number;
    status: string;
    message: string;
  } | null>(null);

  /**
   * Handler untuk trigger sync Elasticsearch
   */
  const handleSyncElasticsearch = async () => {
    setIsSyncing(true);
    try {
      const result = await syncElasticsearch();
      setLastSyncResult(result.data);
      toast.success(
        `Elasticsearch sync completed: ${result.data.synced} products synced`,
      );
    } catch (err) {
      toastError(err);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="container mx-auto bg-[var(--bg-paper)] p-6 rounded-xl shadow-md border border-[var(--divider)] space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-[var(--text-secondary)]">
          Kelola dan sinkronisasi data Elasticsearch dari dashboard ini.
        </p>
      </div>

      {/* Elasticsearch Sync Card */}
      <div className="border border-[var(--divider)] rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Elasticsearch Sync</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-4">
          Sinkronkan semua produk dari MongoDB ke Elasticsearch. Proses ini
          mungkin memakan waktu beberapa saat tergantung jumlah data.
        </p>

        <button
          onClick={handleSyncElasticsearch}
          disabled={isSyncing}
          className="px-4 py-2 bg-[var(--primary-main)] text-[var(--primary-contrast)] rounded-md hover:bg-[var(--primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSyncing ? "Syncing..." : "Sync Elasticsearch"}
        </button>

        {/* Last Sync Result */}
        {lastSyncResult && (
          <div className="mt-4 p-4 bg-[var(--success-main)]/10 border border-[var(--success-main)] rounded-md">
            <p className="text-sm font-medium text-[var(--success-contrast)]">
              Last Sync Result:
            </p>
            <ul className="text-sm mt-2 space-y-1">
              <li>Products Synced: {lastSyncResult.synced}</li>
              <li>Status: {lastSyncResult.status}</li>
              <li>Message: {lastSyncResult.message}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
