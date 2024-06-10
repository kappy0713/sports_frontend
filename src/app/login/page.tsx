"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { UserAuth } from "../../utils/auth";
 
export default function Page() {
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Name:', username);
        console.log('Password:', password);
    };
    
    const Login = async (event: React.FormEvent) => {
      const token = await UserAuth(username, password);
      console.log("login successful:", token);
      Cookies.set("token", token.token);

      router.push("/");
    }

    const Register = () => {
        router.push("/register")
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">ログイン</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                ユーザー名
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setName(e.target.value)}
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
            <div className="flex flex-col items-center justify-between">
              <button
                type="submit"
                onClick={Login}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm md:text-base"
              >
                ログイン
              </button>
              <button
                type="button"
                onClick={Register}
                className="w-full py-2 px-4 mt-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm md:text-base"
              >
                新規登録はこちら
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}