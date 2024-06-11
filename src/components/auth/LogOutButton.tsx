"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function LogOutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const ClickLogOutButton = () => {
    startTransition(async () => {
      await sleep(1200)

      document.cookie = "token=; max-age=0";

      toast.success("ログアウト成功")
      router.push("/login")
    });
  };

  return (
    <button
      onClick={() => ClickLogOutButton()}
      disabled={isPending}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      {isPending ? "ログアウト中..." : "ログアウト"}
    </button>
  );
}

export default LogOutButton;