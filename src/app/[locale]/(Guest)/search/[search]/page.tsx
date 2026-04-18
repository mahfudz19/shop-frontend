import { fetchProducts } from "@/lib/api";
import Filter from "./Filter";
import ProductGrid from "./ProductGrid";

type Props = {
  params: Promise<{ search: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function SearchPage(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  // Ambil keyword dari URL (misal: /search/laptop)
  const searchQuery = decodeURIComponent(params.search);

  const filter = {
    search: searchQuery,
    marketplace: searchParams.marketplace || "",
    min_price: searchParams.min_price || "",
    max_price: searchParams.max_price || "",
    rating: searchParams.rating || "",
    sort_by: searchParams.sort_by || "createdAt",
    sort_order: searchParams.sort_order || "-1",
    page: 1,
    limit: 12,
  };

  const initialData = await fetchProducts(filter);

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 py-8">
        <Filter
          currentFilters={{
            search: filter.search,
            marketplace: filter.marketplace,
            min_price: filter.min_price,
            max_price: filter.max_price,
            rating: filter.rating,
            sort_by: filter.sort_by,
            sort_order: filter.sort_order,
          }}
        />
        <ProductGrid
          initialProducts={initialData.data}
          initialMeta={initialData.meta}
          searchQuery={filter.search}
        />
      </div>
    </div>
  );
}
