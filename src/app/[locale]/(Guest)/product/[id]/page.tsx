import Image from "@/components/Image";
import { fetchProductById } from "@/lib/api";
import { getTranslations } from "next-intl/server";
import AnalyticDashboard from "./AnalyticDashboard";

export const generateSlug = (name: string, id: string) => {
  const cleanName = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 100);
  return `/product/${cleanName}~${id}`;
};

/**
 * Mengekstrak title dan product ID dari slug yang dihasilkan oleh generateSlug
 * Format slug: /product/{cleanName}~{id}
 * @param slug - Slug yang akan diparsing (misal: /product/bola-volley-molten~123abc)
 * @returns Object dengan title dan productId
 */
export function unGenerateSlug(slug: string) {
  const fullSlug = decodeURIComponent(slug);

  // Hapus prefix /product/ jika ada
  const slugWithoutPrefix = fullSlug.replace(/^\/product\//, "");

  // Split berdasarkan ~ untuk mendapatkan name dan id
  const lastTildeIndex = slugWithoutPrefix.lastIndexOf("~");

  if (lastTildeIndex === -1) {
    return {
      title: "",
      productId: slugWithoutPrefix,
    };
  }

  const slugName = slugWithoutPrefix.substring(0, lastTildeIndex);
  const productId = slugWithoutPrefix.substring(lastTildeIndex + 1);

  // Convert slug name back to title (reverse dari generateSlug)
  const title = slugName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title,
    productId,
  };
}

export const formatRupiah = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Product(props: Props) {
  const params = await props.params;
  const t = await getTranslations("ProductDetail");

  const { productId } = unGenerateSlug(params.id);

  // 1. Fetch raw product untuk mendapatkan master_product_id
  const productData = await fetchProductById(productId!);
  if (!productData || !productData.data?.id) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-text-secondary">
        <span className="text-6xl mb-4">📡</span>
        <h1 className="text-xl font-black uppercase tracking-widest mb-2">
          {t("sys_404")}
        </h1>
        <p className="text-sm">{t("signal_lost")}</p>
      </div>
    );
  }

  return (
    <AnalyticDashboard
      productId={productData.data.id}
      master_product_id={productData.data.master_product_id}
    >
      {/* Fallback ke gambar offer terbaik jika master.default_image kosong */}
      <Image
        src={`${process.env.NEXT_IMAGES_HOSTNAME}/${productData.data.image_url}`}
        width={950}
        height={950}
        alt={productData.data.name}
        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute top-6 left-6 flex flex-col gap-2">
        <span className="bg-background-paper/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black border border-divider uppercase tracking-widest shadow-sm flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-success-main animate-pulse"></span>
          {t("sys_live_scan_ok")}
        </span>
      </div>
    </AnalyticDashboard>
  );
}
