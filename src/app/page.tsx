"use client";

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const URL = process.env.SERVER_URL

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
    } else {
      fetch(`${URL}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response => response.json())
      .then(data => setUser(data));
    }
  }, []);

  const Logout = () => {
    document.cookie = "token=; max-age=0";
    router.push("/login")
  }

  const Post = () => {
    router.push("/post")
  }

  const SharePost = () => {
    router.push("/share_post")
  }

  return (
    <div>
      <h1>Hello World</h1>
      <h1 onClick={Post}>
        投稿ページ(運動記録)
      </h1>
      <h1 onClick={SharePost}>
        投稿ページ(運動情報)
      </h1>
      {user && <div>
        <h2>ユーザー情報</h2>
        <p>ID：{user.id}</p>
        <p>名前：{user.name}</p>
        <p>Eメール：{user.email}</p>
      </div>}
      <button
        type="submit"
        onClick={Logout}
        className="py-2 px-4 mt-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm md:text-base"
      >
        ログアウト
      </button>
    </div>
  );
}
