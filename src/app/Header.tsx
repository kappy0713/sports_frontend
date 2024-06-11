import LogOutButton from "@/components/auth/LogOutButton";
import React from "react";
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-99">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <a href="/" className="flex items-center">
            <span className="text-accent">ExecisePlus</span>
          </a>
        </div>
        <nav className="flex space-x-6">
          <a href="/" className="black hover:text-accent">
            投稿一覧
          </a>
          <a href="/" className="black hover:text-accent">
            情報共有
          </a>
          <a href="/" className="black hover:text-accent">
            ブックマーク
          </a>
        </nav>
        <div className="flex space-x-1 hover:text-accent">
          <a
            href="/my-page"
            className="black hover:text-accent flex items-center bg-secondary black py-2 px-4 rounded"
          >
            <FaUser className="mr-2 " />
            マイページ
          </a>
          <div className="ml-8">
            <LogOutButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;