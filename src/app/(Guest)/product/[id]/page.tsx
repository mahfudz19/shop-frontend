export const generateSlug = (name: string, id: string) => {
  const cleanName = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 100);
  return `/product/${cleanName}~${id}`;
};

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Product(props: Props) {
  const params = await props.params;

  const fullSlug = decodeURIComponent(params.id);
  const productId = fullSlug.split("~").pop();
  return <div>productId: {productId}</div>;
}
