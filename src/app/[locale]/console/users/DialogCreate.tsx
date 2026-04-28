"use client";
import Dialog, { DialogTrigger } from "@/components/ui/Dialog";
import Ripple from "@/components/ui/Ripple";
import toast from "@/components/ui/Toast";
import { register, toastError } from "@/lib/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function DialogCreate() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      setIsLoading(true);
      await register({
        name: data.name as string,
        email: data.email as string,
        password: data.password as string,
        confirmPassword: data.confirmPassword as string,
      });
      toast.success("User successfully deployed to the system");
      (document.getElementById("user-create-dialog") as any)?.hidePopover();
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
        id="user-create-dialog"
        className="px-6 py-3 bg-primary-main text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:-translate-y-0.5 transition-all shadow-lg shadow-primary-main/20 flex items-center gap-2"
      >
        <Ripple />
        <span className="text-lg leading-none">+</span>
        New User
      </DialogTrigger>
      <Dialog id="user-create-dialog" className="min-w-[450px]">
        <form onSubmit={handleCreate} className="space-y-6">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-primary-main">
              Create New User
            </h2>
            <p className="text-xs text-text-secondary">
              Register a new access node to the system
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-disabled">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
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
                name="email"
                required
                placeholder="user@example.com"
                className="bg-background-default border border-divider p-3 rounded-xl text-sm outline-none focus:border-primary-main"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-disabled">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="bg-background-default border border-divider p-3 rounded-xl text-sm outline-none focus:border-primary-main"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-disabled">
                  Confirm
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="••••••••"
                  className="bg-background-default border border-divider p-3 rounded-xl text-sm outline-none focus:border-primary-main"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-disabled">
                Initial Role
              </label>
              <select
                name="role"
                className="bg-background-default border border-divider p-3 rounded-xl text-sm outline-none cursor-pointer"
              >
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
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-primary-main text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-main/20 flex items-center gap-2 disabled:opacity-50"
            >
              <Ripple />
              {isLoading ? "Deploying..." : "Deploy User"}
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
}

export default DialogCreate;
