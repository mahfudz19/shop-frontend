"use client";

import Dialog, { DialogTrigger } from "@/components/ui/Dialog";
import Ripple from "@/components/ui/Ripple";
import { ResponsePaginate } from "@/types/respons";
import { User, UserQuery, UserRole, UserStatus } from "@/types/user";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface UsersManagerProps {
  initialData: ResponsePaginate<User>;
  query: UserQuery;
}

export default function UsersManager({
  initialData,
  query,
}: UsersManagerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchValue, setSearchValue] = useState(query.search || "");

  const users = initialData.data;
  const pagination = initialData.meta.pagination;

  const updateQuery = (newParams: Partial<UserQuery>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    // Reset to page 1 if search/limit/filters change
    if (
      newParams.search !== undefined ||
      newParams.limit !== undefined ||
      newParams.role !== undefined ||
      newParams.status !== undefined
    ) {
      params.set("page", "1");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSort = (field: string) => {
    const currentSortBy = query.sort_by;
    const currentSortOrder = query.sort_order;

    let newOrder: "asc" | "desc" = "asc";
    if (currentSortBy === field && currentSortOrder === "asc") {
      newOrder = "desc";
    }

    updateQuery({ sort_by: field, sort_order: newOrder });
  };

  return (
    <div className="space-y-6">
      {/* Toolbar: Search & Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-background-paper/50 backdrop-blur-md p-4 rounded-2xl border border-divider">
        <div className="relative w-full md:w-96 group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-disabled group-focus-within:text-primary-main transition-colors pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search name, email, or ID..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateQuery({ search: searchValue });
              }
            }}
            className="w-full pl-12 pr-24 py-3 bg-background-default border border-divider rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-main/20 focus:border-primary-main transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {searchValue && (
              <button
                onClick={() => {
                  setSearchValue("");
                  updateQuery({ search: "" });
                }}
                className="w-8 h-8 flex items-center justify-center text-text-disabled hover:text-error-main hover:bg-error-main/10 rounded-lg transition-all"
                title="Clear Search"
              >
                ✕
              </button>
            )}
            <button
              onClick={() => updateQuery({ search: searchValue })}
              className="w-10 h-8 flex items-center justify-center bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-all shadow-sm active:scale-95"
              title="Search"
            >
              <span className="text-xs font-black">GO</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <select
            value={query.role || ""}
            onChange={(e) =>
              updateQuery({ role: (e.target.value as UserRole) || undefined })
            }
            className="bg-background-default border border-divider rounded-xl px-4 py-2 text-sm font-bold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-main/20 transition-all cursor-pointer"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          <select
            value={query.status || ""}
            onChange={(e) =>
              updateQuery({
                status: (e.target.value as UserStatus) || undefined,
              })
            }
            className="bg-background-default border border-divider rounded-xl px-4 py-2 text-sm font-bold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-main/20 transition-all cursor-pointer"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <span className="text-xs font-bold text-text-disabled uppercase tracking-widest">
            Show
          </span>
          <select
            value={query.limit || 10}
            onChange={(e) => updateQuery({ limit: e.target.value })}
            className="bg-background-default border border-divider rounded-xl px-4 py-2 text-sm font-bold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-main/20 transition-all cursor-pointer"
          >
            {[5, 10, 25, 50].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-background-paper border border-divider rounded-3xl overflow-hidden shadow-xl shadow-primary-main/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background-default/50 border-b border-divider">
                <SortableHeader
                  field="id"
                  label="ID"
                  currentSortBy={query.sort_by}
                  currentSortOrder={query.sort_order}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="name"
                  label="User Details"
                  currentSortBy={query.sort_by}
                  currentSortOrder={query.sort_order}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="role"
                  label="Role"
                  currentSortBy={query.sort_by}
                  currentSortOrder={query.sort_order}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="status"
                  label="Status"
                  currentSortBy={query.sort_by}
                  currentSortOrder={query.sort_order}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="createdAt"
                  label="Joined Date"
                  currentSortBy={query.sort_by}
                  currentSortOrder={query.sort_order}
                  onSort={handleSort}
                />
                <th className="px-6 py-5 text-[10px] font-black text-text-disabled uppercase tracking-[0.2em] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider/50">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="group hover:bg-primary-main/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-bold text-primary-main">
                        {user.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-text-primary group-hover:text-primary-main transition-colors">
                          {user.name}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {user.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize">{user.role}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${user.status === "active" ? "bg-success-main animate-pulse" : "bg-error-main"}`}
                        />
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${user.status === "active" ? "text-success-main" : "text-error-main"}`}
                        >
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-text-secondary">
                        {new Date(user.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <ActionButton
                          icon="👁️"
                          color="primary"
                          popoverTarget="user-detail-dialog"
                          onClick={() => setSelectedUser(user)}
                        />
                        <ActionButton
                          icon="✏️"
                          color="secondary"
                          popoverTarget="user-edit-dialog"
                          onClick={() => setSelectedUser(user)}
                        />
                        <ActionButton
                          icon="🗑️"
                          color="error"
                          popoverTarget="user-delete-dialog"
                          onClick={() => setSelectedUser(user)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-20 text-center text-text-disabled"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <span className="text-5xl">🔭</span>
                      <p className="font-black uppercase tracking-[0.2em] text-sm">
                        No users found in radar
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-5 bg-background-default/30 border-t border-divider flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-text-disabled uppercase tracking-widest">
            Showing{" "}
            <span className="text-text-primary">
              {(pagination.page - 1) * pagination.limit + 1}
            </span>{" "}
            to{" "}
            <span className="text-text-primary">
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span>{" "}
            of <span className="text-text-primary">{pagination.total}</span>{" "}
            nodes
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuery({ page: pagination.page - 1 })}
              disabled={pagination.page === 1}
              className="px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all bg-background-paper border border-divider text-text-primary disabled:opacity-30"
            >
              Prev
            </button>
            <div className="flex items-center gap-1">
              {[...Array(pagination.total_pages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => updateQuery({ page: i + 1 })}
                  className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${pagination.page === i + 1 ? "bg-primary-main text-white" : "bg-background-paper border border-divider"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => updateQuery({ page: pagination.page + 1 })}
              disabled={pagination.page === pagination.total_pages}
              className="px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all bg-background-paper border border-divider text-text-primary disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog id="user-detail-dialog" className="min-w-[400px]">
        {selectedUser && (
          <div className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-tight">
              User Detail
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col">
                <span className="text-text-disabled uppercase text-[10px] font-bold">
                  Name
                </span>
                <span className="font-bold">{selectedUser.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-text-disabled uppercase text-[10px] font-bold">
                  Email
                </span>
                <span className="font-bold">{selectedUser.email}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-text-disabled uppercase text-[10px] font-bold">
                  Role
                </span>
                <span className="font-bold">{selectedUser.role}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-text-disabled uppercase text-[10px] font-bold">
                  Status
                </span>
                <span className="font-bold">{selectedUser.status}</span>
              </div>
            </div>
          </div>
        )}
      </Dialog>

      <Dialog id="user-edit-dialog" className="min-w-[450px]">
        {selectedUser && (
          <div className="space-y-6">
            <h2 className="text-xl font-black uppercase tracking-tight text-primary-main">
              Edit User
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-disabled">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedUser.name}
                  className="bg-background-default border border-divider p-3 rounded-xl text-sm outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-disabled">
                  Role
                </label>
                <select
                  defaultValue={selectedUser.role}
                  className="bg-background-default border border-divider p-3 rounded-xl text-sm outline-none"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-divider">
              <DialogTrigger
                id="user-edit-dialog"
                className="px-6 py-2 text-xs font-black uppercase tracking-widest"
              >
                Cancel
              </DialogTrigger>
              <button className="px-6 py-2 bg-primary-main text-white rounded-xl text-xs font-black uppercase tracking-widest">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Dialog>

      <Dialog id="user-delete-dialog" className="min-w-[350px]">
        {selectedUser && (
          <div className="space-y-6 py-4 text-center">
            <div className="w-16 h-16 bg-error-main/10 text-error-main rounded-full flex items-center justify-center mx-auto text-3xl">
              🗑️
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight">
              Delete User?
            </h2>
            <p className="text-sm text-text-secondary">
              Are you sure you want to delete{" "}
              <span className="font-bold">{selectedUser.name}</span>?
            </p>
            <div className="flex flex-col gap-2">
              <button className="w-full py-3 bg-error-main text-white rounded-xl text-xs font-black uppercase tracking-widest">
                Yes, Delete Node
              </button>
              <DialogTrigger
                id="user-delete-dialog"
                className="w-full py-3 bg-background-default text-text-secondary rounded-xl text-xs font-black uppercase tracking-widest border border-divider"
              >
                Abort Mission
              </DialogTrigger>
            </div>
          </div>
        )}
      </Dialog>

      <Dialog id="user-create-dialog" className="min-w-[450px]">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-primary-main">
              Create New User
            </h2>
            <p className="text-xs text-text-secondary">
              Register a new access node to the system.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-disabled">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter full name..."
                className="bg-background-default border border-divider p-3 rounded-xl text-sm outline-none focus:border-primary-main"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-disabled">
                Email Address
              </label>
              <input
                type="email"
                placeholder="user@example.com"
                className="bg-background-default border border-divider p-3 rounded-xl text-sm outline-none focus:border-primary-main"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-disabled">
                Initial Role
              </label>
              <select className="bg-background-default border border-divider p-3 rounded-xl text-sm outline-none cursor-pointer">
                <option value="user">User (Standard Node)</option>
                <option value="admin">Admin (Command Node)</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-divider">
            <DialogTrigger
              id="user-create-dialog"
              className="px-6 py-2 text-xs font-black uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors"
            >
              Cancel
            </DialogTrigger>
            <button className="px-6 py-2 bg-primary-main text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-main/20 flex items-center gap-2">
              <Ripple />
              Deploy User
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

function SortableHeader({
  field,
  label,
  currentSortBy,
  currentSortOrder,
  onSort,
}: any) {
  return (
    <th
      onClick={() => onSort(field)}
      className="px-6 py-5 text-[10px] font-black text-text-disabled uppercase tracking-[0.2em] cursor-pointer hover:text-primary-main transition-colors group"
    >
      <div className="flex items-center gap-2">
        {label}
        <div className="flex flex-col text-[8px] leading-[0.5] opacity-30 group-hover:opacity-60 transition-opacity">
          <span
            className={
              currentSortBy === field && currentSortOrder === "asc"
                ? "text-primary-main opacity-100"
                : ""
            }
          >
            ▲
          </span>
          <span
            className={
              currentSortBy === field && currentSortOrder === "desc"
                ? "text-primary-main opacity-100"
                : ""
            }
          >
            ▼
          </span>
        </div>
      </div>
    </th>
  );
}

function ActionButton({ icon, color, popoverTarget, onClick }: any) {
  const colorMap: any = {
    primary:
      "text-primary-main bg-primary-main/10 hover:bg-primary-main hover:text-white",
    secondary:
      "text-text-secondary bg-background-default border border-divider hover:border-primary-main hover:text-primary-main",
    error:
      "text-error-main bg-error-main/10 hover:bg-error-main hover:text-white",
  };

  return (
    <DialogTrigger
      id={popoverTarget}
      onClick={onClick}
      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all relative overflow-hidden group/btn ${colorMap[color]}`}
    >
      <Ripple />
      <span className="text-sm group-hover/btn:scale-110 transition-transform">
        {icon}
      </span>
    </DialogTrigger>
  );
}
