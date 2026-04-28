"use client";
import Dialog, { DialogTrigger } from "@/components/ui/Dialog";
import Ripple from "@/components/ui/Ripple";
import toast from "@/components/ui/Toast";
import { toastError, updateUser } from "@/lib/api";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function DialogEdit(user: User) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await updateUser(user.id, {
        name: data.name as string,
        email: data.email as string,
        role: data.role as User["role"],
        status: data.status as User["status"],
      });
      toast.success("User configuration updated");
      (document.getElementById(`user-edit-dialog-${user.id}`) as any)?.hidePopover();
      router.refresh();
    } catch (err) {
      toastError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DialogTrigger
        id={`user-edit-dialog-${user.id}`}
        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all relative overflow-hidden group/btn text-text-secondary bg-background-default border border-divider hover:border-primary-main hover:text-primary-main`}
      >
        <Ripple />
        <span className="text-sm group-hover/btn:scale-110 transition-transform">
          ✏️
        </span>
      </DialogTrigger>

      <Dialog id={`user-edit-dialog-${user.id}`} className="min-w-[450px]">
        {user && (
          <form onSubmit={handleEdit} className="space-y-6 text-left">
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
                  name="name"
                  required
                  defaultValue={user.name}
                  className="bg-background-default border border-divider p-3 rounded-xl text-sm outline-none focus:border-primary-main"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-disabled">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={user.email}
                  placeholder="user@example.com"
                  className="bg-background-default border border-divider p-3 rounded-xl text-sm outline-none focus:border-primary-main"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-disabled">
                  Role
                </label>
                <select
                  name="role"
                  defaultValue={user.role}
                  className="bg-background-default border border-divider p-3 rounded-xl text-sm outline-none cursor-pointer"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-disabled">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={user.status}
                  className="bg-background-default border border-divider p-3 rounded-xl text-sm outline-none cursor-pointer"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-divider">
              <DialogTrigger
                id={`user-edit-dialog-${user.id}`}
                className="px-6 py-2 text-xs font-black uppercase tracking-widest"
              >
                Cancel
              </DialogTrigger>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-primary-main text-white rounded-xl text-xs font-black uppercase tracking-widest disabled:opacity-50"
              >
                {isLoading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </Dialog>
    </>
  );
}

export default DialogEdit;
