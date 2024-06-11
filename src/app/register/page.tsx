"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRegister } from "@/utils/auth";
 
export default function Page() {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Name:', username);
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const Register = async (event: React.FormEvent) => {
        if (!username || !email || !password) {
            event.preventDefault();
            alert("全ての項目を入力してください。");
            return;
        }

        const data = await UserRegister(username, email, password);
        console.log("registration successful:", data);

        router.push("/login");
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">新規登録</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                ユーザー名
              </label>
              <input
                type=""
                id="username"
                value={username}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm md:text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <input
                type=""
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm md:text-base"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm md:text-base"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                onClick={Register}
                className="w-full py-2 px-4 mt-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm md:text-base"
              >
                新規登録
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}