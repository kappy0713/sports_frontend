"use client";

import LogOutButton from "@/components/auth/LogOutButton";
import LogInButton from "@/components/auth/LogInButton"
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";
import Cookies from 'js-cookie';

const Header = () => {
  const path = usePathname();
  const [token, setToken] = useState('');

  useEffect(() => {
    const gettoken = Cookies.get('token');
    if (gettoken) {
      setToken(gettoken);
    }
  }, []);

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <a href="/" className="flex items-center">
            <span className="text-accent text-emerald-400">ExecisePlus</span>
          </a>
        </div>
        <nav className="flex space-x-6">
          <a href="/list" className={`text-black hover:text-emerald-400 text-accent capitalize ${path === "/list" || path ==="/post" ? "underline decoration-emerald-400 decoration-2 underline-offset-8" : ""}`}>
            投稿一覧
          </a>
          <a href="/share" className={`text-black hover:text-emerald-400 text-accent capitalize ${path === "/share" || path ==="/share_post" ? "underline decoration-emerald-400 decoration-2 underline-offset-8" : ""}`}>
            情報共有
          </a>
          <a href="/bookmark" className={`text-black hover:text-emerald-400 text-accent capitalize ${path === "/bookmark" ? "underline decoration-emerald-400 decoration-2 underline-offset-8" : ""}`}>
            ブックマーク
          </a>
        </nav>
        {token ? (
          <div className="flex space-x-1 hover:text-accent">
            <a
              href="/mypage"
              className="text-black bg-slate-100 hover:bg-slate-200 hover:text-accent flex items-center bg-secondary black py-2 px-4 rounded"
            >
              <FaUser className="mr-2 " />
              マイページ
            </a>
            <div className="ml-8">
              <LogOutButton />
            </div>
          </div>
        ) : (
          <LogInButton />
        )}
      </div>
    </header>
  );
};

export default Header;