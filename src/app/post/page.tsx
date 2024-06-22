"use client";

import { useState } from "react"
import { useRouter } from "next/navigation";
import { ExecisePost } from "@/utils/post";
import Header from "@/app/Header"
import toast from "react-hot-toast";

export default function Page () {
  const today = new Date().toISOString().split('T')[0];
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const router = useRouter();

  const time = Number(hours) * 60 + Number(minutes);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ title, body, date, time });
  };

  const Post = async (event: React.FormEvent) => {
    ExecisePost(title, body, date, time);
    
    toast.success("投稿を送信しました");

    router.push("/list");
  }
    
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-16">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div>
                <label>タイトル</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label>本文</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full resize-none h-32 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label>日付：</label>
                <input
                  type="date"
                  value={date.toISOString().split('T')[0]}
                  onChange={(e) => setDate(new Date(e.target.value))}
                />
              </div>
              <div>
                <label>運動時間：</label>
                <select value={hours} onChange={(e) => setHours(e.target.value)}>
                  {[...Array(24)].map((_, i) => (
                    <option key={i} value={i}>{i} 時間</option>
                  ))}
                </select>
                <select value={minutes} onChange={(e) => setMinutes(e.target.value)}>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={i * 5}>{i * 5} 分</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={Post}
                  type="submit"
                  className="py-2 px-4 mt-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-400 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:text-sm md:text-base"
                >
                  投稿
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}