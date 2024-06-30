"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

function LogInButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const ClickLogInButton = () => {
    startTransition(async () => {
      router.push("/login")
    });
  };

  return (
    <button
      onClick={() => ClickLogInButton()}
      disabled={isPending}
      className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
    >
      ログイン
    </button>
  );
}

export default LogInButton;