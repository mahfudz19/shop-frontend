import { DialogTrigger } from "@/components/ui/Dialog";
import Ripple from "@/components/ui/Ripple";
import { getUsers } from "@/lib/api";
import { UserQuery } from "@/types/user";
import { cookies } from "next/headers";
import UsersManager from "./UsersManager";
import DialogCreate from "./DialogCreate";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function UsersPage(props: Props) {
  const query = await props.searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  // Standardize query params
  const userQuery: UserQuery = {
    page: query.page || 1,
    limit: query.limit || 10,
    search: query.search,
    sort_by: query.sort_by || "createdAt",
    sort_order: (query.sort_order as "asc" | "desc") || "desc",
    role: query.role as UserQuery["role"],
    status: query.status as UserQuery["status"],
  };

  // Fetch data from API (SSR)
  const response = await getUsers(userQuery, token);

  return (
    <div className="space-y-6">
      {/* Header & toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-background-paper p-6 rounded-3xl border border-divider shadow-sm shadow-primary-main/5">
        <div>
          <h1 className="text-2xl font-black text-text-primary tracking-tight uppercase">
            User Management
          </h1>
          <p className="text-sm text-text-secondary">
            Manage system users, roles, and access permissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DialogCreate />
        </div>
      </div>

      {/* Render the Client Manager which handles interactivity via URL params */}
      <UsersManager initialData={response} query={userQuery} token={token} />
    </div>
  );
}
