import { fetchProducts } from "@/lib/api";
import ProductList from "./ProductList";

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
    sort_by: searchParams.sort_by || "createdAt",
    sort_order: searchParams.sort_order || "-1",
    page: 1,
    limit: 12,
  };

  const initialData = await fetchProducts(filter);

  return (
    <ProductList
      initialProducts={initialData.data}
      initialMeta={initialData.meta}
      currentFilters={{
        search: filter.search,
        marketplace: filter.marketplace,
        sort_by: filter.sort_by,
        sort_order: filter.sort_order,
      }}
    />
  );
}
