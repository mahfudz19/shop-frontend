"use client";
import Dialog, { DialogTrigger } from "@/components/ui/Dialog";
import Ripple from "@/components/ui/Ripple";
import { User } from "@/types/user";

function DialogDetail(user: User) {
  return (
    <>
      <DialogTrigger
        id={`user-detail-dialog-${user.id}`}
        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all relative overflow-hidden group/btn text-primary-main bg-primary-main/10 hover:bg-primary-main hover:text-white`}
      >
        <Ripple />
        <span className="text-sm group-hover/btn:scale-110 transition-transform">
          👁️
        </span>
      </DialogTrigger>

      <Dialog id={`user-detail-dialog-${user.id}`} className="min-w-[400px]">
        <div className="space-y-4 text-left">
          <h2 className="text-xl font-black uppercase tracking-tight">
            User Detail
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <span className="text-text-disabled uppercase text-[10px] font-bold">
                Name
              </span>
              <span className="font-bold">{user.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-text-disabled uppercase text-[10px] font-bold">
                Email
              </span>
              <span className="font-bold">{user.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-text-disabled uppercase text-[10px] font-bold">
                Role
              </span>
              <span className="font-bold">{user.role}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-text-disabled uppercase text-[10px] font-bold">
                Status
              </span>
              <span className="font-bold">{user.status}</span>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default DialogDetail;
