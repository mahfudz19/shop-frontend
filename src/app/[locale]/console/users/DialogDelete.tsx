"use client";
import Dialog, { DialogTrigger } from "@/components/ui/Dialog";
import Ripple from "@/components/ui/Ripple";
import toast from "@/components/ui/Toast";
import { deleteUser, toastError } from "@/lib/api";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function DialogDelete(user: User) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteUser(user.id);
      toast.success("User successfully purged from the system");
      (
        document.getElementById(`user-delete-dialog-${user.id}`) as any
      )?.hidePopover();
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
        id={`user-delete-dialog-${user.id}`}
        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all relative overflow-hidden group/btn text-error-main bg-error-main/10 hover:bg-error-main hover:text-white`}
      >
        <Ripple />
        <span className="text-sm group-hover/btn:scale-110 transition-transform">
          🗑️
        </span>
      </DialogTrigger>

      <Dialog id={`user-delete-dialog-${user.id}`} className="min-w-[350px]">
        <div className="space-y-6 py-4 text-center">
          <div className="w-16 h-16 bg-error-main/10 text-error-main rounded-full flex items-center justify-center mx-auto text-3xl">
            🗑️
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight text-error-main">
            Purge User?
          </h2>
          <p className="text-sm text-text-secondary px-4">
            Warning: This action is permanent. Are you sure you want to delete{" "}
            <span className="font-bold text-text-primary">{user.name}</span>?
          </p>
          <div className="flex flex-col gap-2 px-6">
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="w-full py-3 bg-error-main text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-error-main/20 active:scale-95 transition-all disabled:opacity-50"
            >
              {isLoading ? "Purging..." : "Yes, Purge Node"}
            </button>
            <DialogTrigger
              id={`user-delete-dialog-${user.id}`}
              className="w-full py-3 bg-background-default text-text-secondary rounded-xl text-xs font-black uppercase tracking-widest border border-divider hover:text-text-primary transition-colors"
            >
              Abort Mission
            </DialogTrigger>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default DialogDelete;
