"use client";

import Ripple from "@/components/ui/Ripple";
import { fetchMasterProductById } from "@/lib/api";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { formatRupiah } from "./page";

interface Props {
  children: React.ReactNode;
  productId: string;
  master_product_id?: string;
}

const AnalyticDashboard = (props: Props) => {
  const { children, productId, master_product_id } = props;
  const t = useTranslations("ProductDetail");

  // Menggunakan SWR untuk data fetching
  const data = useSWR(
    master_product_id ? ["master-product", master_product_id] : null,
    ([, id]) => fetchMasterProductById(id),
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const master = data?.data?.data;
  const loading = data.isLoading;
  const error = data.error ? t("sys_error_connection") : null;

  const offers = master?.offers || [];
  const bestOffer = offers.length > 0 ? offers[0] : null;
  const totalOffers = master?.total_offers || 0;
  const savings = master?.savings || 0;
  const specifications = master?.specifications || {};

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* SISI KIRI: VISUAL & SPECS */}
      <div className="lg:col-span-5 space-y-6">
        <div className="aspect-square rounded-3xl bg-background-paper border border-divider overflow-hidden relative shadow-xl shadow-primary-main/5 p-4 flex items-center justify-center group">
          {children}
        </div>

        <div className="p-6 bg-background-paper border border-divider rounded-2xl shadow-sm min-h-[200px] flex flex-col">
          <h2 className="text-xs font-black text-text-disabled uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <span className="text-primary-main">⚙️</span> {t("sys_parameters")}
          </h2>

          {loading ? (
            <div className="space-y-4 animate-pulse flex-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 bg-divider/20 rounded-lg w-full"
                ></div>
              ))}
            </div>
          ) : error || !master_product_id || !master ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <span className="text-2xl mb-2">{error ? "📡" : "🔍"}</span>
              <p className="text-[10px] font-black text-text-disabled uppercase tracking-widest">
                {error || t("sys_not_compared")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-[11px]">
              <div className="flex flex-col gap-1">
                <span className="text-text-disabled">{t("lbl_brand")}</span>
                <span className="text-text-primary font-bold uppercase">
                  {master.brand || t("val_generic")}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-text-disabled">{t("lbl_model")}</span>
                <span className="text-text-primary font-bold uppercase">
                  {master.model || t("val_na")}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-text-disabled">
                  {t("lbl_data_sources")}
                </span>
                <span className="text-text-primary font-bold">
                  {totalOffers} {t("lbl_verified_nodes")}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-text-disabled">
                  {t("lbl_baseline_min")}
                </span>
                <span className="text-text-primary font-bold">
                  {formatRupiah(master.baseline_price_min)}
                </span>
              </div>

              {Object.entries(specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-col gap-1 col-span-2 border-t border-divider/50 pt-2"
                >
                  <span className="text-text-disabled uppercase">
                    {key.replace(/_/g, " ")}
                  </span>
                  <span className="text-text-primary font-bold">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SISI KANAN: ANALYTIC DASHBOARD */}
      <div className="lg:col-span-7 flex flex-col min-h-[500px]">
        {loading ? (
          <div className="flex-1 flex flex-col space-y-8 animate-pulse">
            <div className="space-y-4">
              <div className="h-12 bg-divider/20 rounded-xl w-3/4"></div>
              <div className="h-6 bg-divider/20 rounded-full w-1/2"></div>
            </div>
            <div className="h-40 bg-primary-main/10 rounded-2xl border border-primary-main/20"></div>
            <div className="space-y-4">
              <div className="h-4 bg-divider/20 rounded-full w-1/4"></div>
              <div className="h-64 bg-background-paper border border-divider rounded-2xl"></div>
            </div>
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
            <span className="text-6xl mb-6">⚠️</span>
            <h2 className="text-xl font-black text-error-main uppercase tracking-widest mb-4">
              {error}
            </h2>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-error-main text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:-translate-y-0.5 transition-all shadow-lg shadow-error-main/20"
            >
              <Ripple />
              {t("action_retry")}
            </button>
          </div>
        ) : !master_product_id ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-background-paper border border-divider rounded-3xl shadow-xl shadow-primary-main/5">
            <div className="w-20 h-20 bg-primary-main/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-text-primary mb-4 tracking-tight">
              {t("sys_not_compared")}
            </h2>
            <p className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed text-sm">
              {t("sys_not_compared_desc")}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-main text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:-translate-y-0.5 transition-all shadow-lg shadow-primary-main/20"
            >
              <Ripple />
              {t("back_home")}
            </Link>
          </div>
        ) : master ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary leading-[1.1] mb-4 tracking-tighter">
                {master.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <div className="flex items-center gap-1.5 bg-background-paper border border-divider px-3 py-1 rounded-full shadow-sm">
                  <span className="text-lg">⭐</span>
                  <span className="font-black text-sm">4.8</span>
                  <span className="text-[9px] text-text-disabled uppercase font-bold tracking-widest ml-1">
                    {t("avg_score")}
                  </span>
                </div>
                {bestOffer && (
                  <div className="text-[10px] font-black text-text-secondary uppercase tracking-widest">
                    {bestOffer.sold_count}+{" "}
                    <span className="text-text-disabled">
                      {t("units_decoded")}
                    </span>
                  </div>
                )}
                <Link
                  href={`/product/${productId}/test-auth`}
                  className="text-primary-main hover:text-primary-dark transition-colors"
                >
                  <Ripple color="primary" />
                  Test Auth Product
                </Link>
              </div>
            </div>

            {offers.length > 0 ? (
              <div className="bg-linear-to-br from-primary-main to-primary-dark rounded-2xl p-6 md:p-8 text-primary-contrast shadow-xl shadow-primary-main/20 relative overflow-hidden mb-8 transform transition-transform hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                  <div>
                    <span className="inline-block bg-white/20 text-white px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-[0.3em] mb-3">
                      &gt;&gt; {t("sys_engine_verdict")}
                    </span>
                    <p className="text-xl md:text-2xl font-medium leading-tight">
                      {t("execution_at")}{" "}
                      <span className="font-black underline decoration-4 underline-offset-4">
                        {bestOffer?.marketplace}
                      </span>
                      .
                    </p>
                  </div>
                  <div className="text-left md:text-right w-full md:w-auto border-t border-white/20 md:border-none pt-4 md:pt-0">
                    <p className="text-[10px] font-bold uppercase opacity-80 mb-1 tracking-widest">
                      {savings > 0
                        ? t("sys_potential_savings")
                        : t("sys_best_price")}
                    </p>
                    {bestOffer && (
                      <p className="text-4xl md:text-5xl font-black tracking-tighter">
                        {formatRupiah(bestOffer.price_rp)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-error-light/10 border border-error-main/30 rounded-2xl p-6 mb-8 text-center">
                <span className="text-error-main text-2xl mb-2 block">⚠️</span>
                <p className="text-sm font-bold text-error-main uppercase tracking-widest">
                  {t("sys_no_active_offers")}
                </p>
              </div>
            )}

            <div className="space-y-4 mb-8">
              <h3 className="text-[10px] font-black text-text-disabled uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-main animate-ping"></span>
                {t("sys_price_matrix")}
              </h3>

              <div className="bg-background-paper border border-divider rounded-2xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 divide-y divide-divider/50">
                  {offers.map((offer: any, idx: number) => {
                    const isBest = idx === 0;
                    return (
                      <div
                        key={offer.id}
                        className={`p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:bg-divider/5 ${isBest ? "bg-success-light/5 relative" : ""}`}
                      >
                        {isBest && (
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-success-main"></div>
                        )}

                        <div className="flex items-center gap-4 w-full md:w-auto">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg shrink-0 shadow-sm ${
                              offer.marketplace.toLowerCase() === "shopee"
                                ? "bg-[#EE4D2D]"
                                : offer.marketplace.toLowerCase() ===
                                    "tokopedia"
                                  ? "bg-[#42B549]"
                                  : offer.marketplace.toLowerCase() === "lazada"
                                    ? "bg-[#0F146D]"
                                    : "bg-gray-800"
                            }`}
                          >
                            {offer.marketplace[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-black text-sm uppercase tracking-tight text-text-primary">
                                {offer.marketplace}
                              </span>
                              {isBest && (
                                <span className="bg-success-main text-white text-[9px] px-1.5 py-0.5 rounded font-black tracking-widest uppercase">
                                  {t("sys_best_value")}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-text-secondary font-medium">
                              {offer.shop}{" "}
                              <span className="opacity-50 mx-1">•</span>{" "}
                              <span className="uppercase text-[10px] tracking-wider">
                                {offer.location}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-8 mt-2 md:mt-0">
                          <div className="text-left md:text-right">
                            {offer.price_original > offer.price_rp && (
                              <p className="text-[10px] text-text-disabled line-through mb-0.5">
                                {formatRupiah(offer.price_original)}
                              </p>
                            )}
                            <p
                              className={`text-xl md:text-2xl font-black tracking-tighter leading-none ${isBest ? "text-success-main" : "text-text-primary"}`}
                            >
                              {formatRupiah(offer.price_rp)}
                            </p>
                          </div>

                          <Link
                            href={offer.url || offer.clean_url || "#"}
                            target="_blank"
                            className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shrink-0 ${
                              isBest
                                ? "bg-primary-main text-white shadow-lg shadow-primary-main/20 hover:-translate-y-0.5"
                                : "bg-background-default text-text-secondary border border-divider hover:border-primary-main hover:text-primary-main"
                            }`}
                          >
                            <Ripple color={isBest ? undefined : "primary"} />
                            {isBest ? t("action_execute") : t("action_visit")}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-auto flex items-start gap-3 p-4 border border-divider/50 rounded-xl bg-background-default/50 text-text-secondary text-[10px] leading-relaxed">
              <span className="text-lg leading-none mt-0.5">💡</span>
              <p>
                <strong className="text-text-primary">
                  {t("sys_disclaimer")}:
                </strong>{" "}
                {t("disclaimer_text_1")}{" "}
                <span className="uppercase">
                  {bestOffer?.marketplace || "marketplace"}
                </span>
                {t("disclaimer_text_2")}
              </p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AnalyticDashboard;
