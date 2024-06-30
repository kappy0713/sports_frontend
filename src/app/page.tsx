"use client";

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Header from "@/app/Header"
import img from "@/img/rain_run.webp"

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
      // router.push("/login");
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
      <main className="flex flex-col items-center justify-center min-h-screen text-center w-full">
        <Header />
        <div className="content flex flex-col lg:flex-row items-center justify-between w-full">
          <div className="text-content lg:w-1/2 text-center lg:text-left px-20 py-8">
            <h1 className="text-emerald-400 text-4xl font-bold mb-4">
              運動記録管理×SNS
            </h1>
            <h2 className="text-emerald-400 text-2xl font-medium mb-6">
              運動を楽しく続けよう！！
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              日々の運動を可視化して、自分の運動習慣を記録できます<br/>
              同じ志を持った仲間たちと切磋琢磨して運動を続けよう！<br/>
              あなたの知らない有益な運動の情報を知れるかも…！？
            </p>
            <a href="/register"><button className="bg-emerald-400 text-white py-2 px-4 rounded hover:bg-emerald-500">
              始める(新規登録)
            </button></a>
          </div>
          <div className="image-content lg:w-1/2 flex justify-center lg:justify-end pr-32 pt-16">
            <img src={img.src} alt="Typing Game" className="w-full max-w-md" />
          </div>
        </div>
      </main>
    </div>
  );
}
