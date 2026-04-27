"use client";

import Ripple from "@/components/ui/Ripple";
import { User } from "@/types/user";
import React, { useMemo, useState } from "react";
import Dialog, { DialogTrigger } from "@/components/ui/Dialog";

// Dummy data
const DUMMY_USERS: User[] = [
  {
    id: "USR-001",
    name: "Mahfudz Syarifuddin",
    email: "mahfudz@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-03-20T15:30:00Z",
  },
  {
    id: "USR-002",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-02-10T08:45:00Z",
    updatedAt: "2024-02-10T08:45:00Z",
  },
  {
    id: "USR-003",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-02-12T14:20:00Z",
    updatedAt: "2024-03-01T11:10:00Z",
  },
  {
    id: "USR-004",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-03-05T09:15:00Z",
    updatedAt: "2024-03-05T09:15:00Z",
  },
  {
    id: "USR-005",
    name: "Bob Wilson",
    email: "bob.wilson@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-03-10T16:40:00Z",
    updatedAt: "2024-03-10T16:40:00Z",
  },
  {
    id: "USR-006",
    name: "Charlie Brown",
    email: "charlie.b@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-03-15T11:00:00Z",
    updatedAt: "2024-03-15T11:00:00Z",
  },
  {
    id: "USR-007",
    name: "David Miller",
    email: "david.m@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-03-20T13:25:00Z",
    updatedAt: "2024-03-20T13:25:00Z",
  },
  {
    id: "USR-008",
    name: "Eva Davis",
    email: "eva.d@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-03-22T10:10:00Z",
    updatedAt: "2024-03-25T09:00:00Z",
  },
  {
    id: "USR-009",
    name: "Frank White",
    email: "frank.w@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-03-25T15:30:00Z",
    updatedAt: "2024-03-25T15:30:00Z",
  },
  {
    id: "USR-010",
    name: "Grace Hopper",
    email: "grace.h@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-03-28T08:00:00Z",
    updatedAt: "2024-03-28T08:00:00Z",
  },
  {
    id: "USR-011",
    name: "Henry Ford",
    email: "henry.f@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-04-01T12:00:00Z",
    updatedAt: "2024-04-01T12:00:00Z",
  },
  {
    id: "USR-012",
    name: "Ivy Chen",
    email: "ivy.c@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-04-05T14:45:00Z",
    updatedAt: "2024-04-05T14:45:00Z",
  },
];

type SortField = keyof User;
type SortOrder = "asc" | "desc";

export default function UsersPage() {
  // States
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filtered and Sorted Data
  const filteredData = useMemo(() => {
    let result = [...DUMMY_USERS];

    // Search
    if (search) {
      const lowSearch = search.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(lowSearch) ||
          u.email.toLowerCase().includes(lowSearch) ||
          u.id.toLowerCase().includes(lowSearch),
      );
    }

    // Sort
    result.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [search, sortField, sortOrder]);

  // Paginated Data
  const paginatedData = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredData.slice(start, start + limit);
  }, [filteredData, page, limit]);

  const totalPages = Math.ceil(filteredData.length / limit);

  // Handlers
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleAction = (type: string, user: User) => {
    setSelectedUser(user);
    console.log(`Action ${type} for user`, user);
  };

  return (
    <div className="space-y-6">
      {/* Header & toolbar */}
      <div className="bg-background-paper p-6 rounded-3xl border border-divider shadow-sm shadow-primary-main/5">
        <h1 className="text-2xl font-black text-text-primary tracking-tight uppercase">
          User Management
        </h1>
        <p className="text-sm text-text-secondary">
          Manage system users, roles, and access permissions.
        </p>
      </div>

      {/* Toolbar: Search & Limit */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-background-paper/50 backdrop-blur-md p-4 rounded-2xl border border-divider">
        <div className="relative w-full md:w-96 group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-disabled group-focus-within:text-primary-main transition-colors">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-12 pr-4 py-3 bg-background-default border border-divider rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-main/20 focus:border-primary-main transition-all"
          />
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-bold text-text-disabled uppercase tracking-widest">
            Show
          </span>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
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
                <th
                  onClick={() => handleSort("id")}
                  className="px-6 py-5 text-[10px] font-black text-text-disabled uppercase tracking-[0.2em] cursor-pointer hover:text-primary-main transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    ID
                    <SortIcon active={sortField === "id"} order={sortOrder} />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("name")}
                  className="px-6 py-5 text-[10px] font-black text-text-disabled uppercase tracking-[0.2em] cursor-pointer hover:text-primary-main transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    User Details
                    <SortIcon active={sortField === "name"} order={sortOrder} />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("role")}
                  className="px-6 py-5 text-[10px] font-black text-text-disabled uppercase tracking-[0.2em] cursor-pointer hover:text-primary-main transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    Role
                    <SortIcon active={sortField === "role"} order={sortOrder} />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="px-6 py-5 text-[10px] font-black text-text-disabled uppercase tracking-[0.2em] cursor-pointer hover:text-primary-main transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    Status
                    <SortIcon
                      active={sortField === "status"}
                      order={sortOrder}
                    />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("createdAt")}
                  className="px-6 py-5 text-[10px] font-black text-text-disabled uppercase tracking-[0.2em] cursor-pointer hover:text-primary-main transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    Joined Date
                    <SortIcon
                      active={sortField === "createdAt"}
                      order={sortOrder}
                    />
                  </div>
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-text-disabled uppercase tracking-[0.2em] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider/50">
              {paginatedData.length > 0 ? (
                paginatedData.map((user) => (
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
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            user.status === "active"
                              ? "bg-success-main animate-pulse"
                              : "bg-error-main"
                          }`}
                        />
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            user.status === "active"
                              ? "text-success-main"
                              : "text-error-main"
                          }`}
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
                          onClick={() => handleAction("detail", user)}
                          icon="👁️"
                          color="primary"
                          popoverTarget="user-detail-dialog"
                        />
                        <ActionButton
                          onClick={() => handleAction("edit", user)}
                          icon="✏️"
                          color="secondary"
                          popoverTarget="user-edit-dialog"
                        />
                        <ActionButton
                          onClick={() => handleAction("delete", user)}
                          icon="🗑️"
                          color="error"
                          popoverTarget="user-delete-dialog"
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
                      <button
                        onClick={() => setSearch("")}
                        className="text-xs text-primary-main font-bold underline underline-offset-4"
                      >
                        Clear Search
                      </button>
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
            <span className="text-text-primary">{(page - 1) * limit + 1}</span>{" "}
            to{" "}
            <span className="text-text-primary">
              {Math.min(page * limit, filteredData.length)}
            </span>{" "}
            of <span className="text-text-primary">{filteredData.length}</span>{" "}
            nodes
          </p>

          <div className="flex items-center gap-1">
            <PaginationButton
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </PaginationButton>

            <div className="flex items-center gap-1 mx-2">
              {[...Array(totalPages)].map((_, i) => {
                const p = i + 1;
                // Simple logic for ellipsis if many pages
                if (
                  totalPages > 7 &&
                  p > 2 &&
                  p < totalPages - 1 &&
                  Math.abs(p - page) > 1
                ) {
                  if (Math.abs(p - page) === 2)
                    return (
                      <span key={p} className="px-2 text-text-disabled">
                        ...
                      </span>
                    );
                  return null;
                }

                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
                      page === p
                        ? "bg-primary-main text-white shadow-lg shadow-primary-main/20"
                        : "bg-background-paper border border-divider text-text-secondary hover:border-primary-main hover:text-primary-main"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <PaginationButton
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
            >
              Next
            </PaginationButton>
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
                  className="bg-background-default border border-divider p-3 rounded-xl text-sm focus:border-primary-main outline-none"
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
              <button
                popoverTarget="user-edit-dialog"
                popoverTargetAction="hide"
                className="px-6 py-2 text-xs font-black uppercase tracking-widest"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-primary-main text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-main/20">
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
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">
                Delete User?
              </h2>
              <p className="text-sm text-text-secondary mt-2">
                Are you sure you want to delete{" "}
                <span className="font-bold text-text-primary">
                  {selectedUser.name}
                </span>
                ? This action cannot be undone.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="w-full py-3 bg-error-main text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-error-main/20">
                Yes, Delete Node
              </button>
              <button
                popoverTarget="user-delete-dialog"
                popoverTargetAction="hide"
                className="w-full py-3 bg-background-default text-text-secondary rounded-xl text-xs font-black uppercase tracking-widest border border-divider"
              >
                Abort Mission
              </button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}

// Sub-components
function SortIcon({ active, order }: { active: boolean; order: SortOrder }) {
  return (
    <div className="flex flex-col text-[8px] leading-[0.5] opacity-30 group-hover:opacity-60 transition-opacity">
      <span
        className={
          active && order === "asc" ? "text-primary-main opacity-100" : ""
        }
      >
        ▲
      </span>
      <span
        className={
          active && order === "desc" ? "text-primary-main opacity-100" : ""
        }
      >
        ▼
      </span>
    </div>
  );
}

function PaginationButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
        disabled
          ? "opacity-30 cursor-not-allowed"
          : "bg-background-paper border border-divider text-text-primary hover:border-primary-main hover:text-primary-main hover:-translate-y-0.5"
      }`}
    >
      {children}
    </button>
  );
}

function ActionButton({
  onClick,
  icon,
  color,
  popoverTarget,
}: {
  onClick: () => void;
  icon: string;
  color: "primary" | "secondary" | "error";
  popoverTarget: string;
}) {
  const colorMap = {
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
      onClick={(e) => {
        if (e) {
          e.stopPropagation();
        }
        onClick();
      }}
      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all relative overflow-hidden group/btn ${colorMap[color]}`}
    >
      <Ripple />
      <span className="text-sm group-hover/btn:scale-110 transition-transform">
        {icon}
      </span>
    </DialogTrigger>
  );
}
