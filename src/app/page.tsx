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

  return (
    <div>
      <h1>Hello World</h1>
      {user && <div>
        <h2>ユーザー情報</h2>
        <p>ID：{user.id}</p>
        <p>名前：{user.name}</p>
        <p>Eメール：{user.email}</p>
      </div>}
    </div>
  );
}
