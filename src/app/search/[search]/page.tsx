import { fetchProducts } from "@/lib/api";
import ProductList from "../ProductList";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

async function SearchPage(props: Props) {
  const searchParams = await props.searchParams;
  const filter = {
    search: searchParams.search || "",
    marketplace: searchParams.marketplace || "",
    sort_by: searchParams.sort_by || "createdAt",
    sort_order: searchParams.sort_order || "-1",
    page: 1,
    limit: 12,
  };

  const initialData = await fetchProducts(filter);
  return (
    <section className="py-12 border-t border-gray-200 mt-8">
      <h2 className="text-2xl font-black mb-6 text-gray-900">
        Top Deals & Offers
      </h2>
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
    </section>
  );
}

export default SearchPage;
