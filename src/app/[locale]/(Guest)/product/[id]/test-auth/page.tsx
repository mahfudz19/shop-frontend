import { getMasterProductTest, getMyData } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function TestAuthProduct(props: Props) {
  const params = await props.params;

  const myAcount = await getMyData();
  const master = await getMasterProductTest(params.id);

  console.log({ myAcount, master });
  return (
    <div className="container mx-auto bg-background-paper p-6 rounded-xl shadow border border-divider">
      <p>
        Halaman ini otomatis terproteksi oleh Middleware. Hanya user dengan
        cookie valid yang bisa melihat ini.
      </p>
    </div>
  );
}
