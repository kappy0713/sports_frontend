"use client";

import { useState } from "react"
import { useRouter } from "next/navigation";
import { ExecisePost } from "@/utils/post";

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
      //const response = await fetch(`${URL}/post`, {
      //  method: "POST",
      //  headers: {
      //    "Content-Type": "application/json",
      //  },
      //  body: JSON.stringify({
          // name: username,
          //password: password,
      //  }),
      //});
  
      //if (!response.ok) {
      //  console.error("post failed");
      //  return;
      //}

      router.push("/")
    }
    
  return (
    <div>
      <h1>投稿フォーム</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>タイトル:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>本文:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div>
          <label>日付:</label>
          <input
            type="date"
            value={date.toISOString().split('T')[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </div>
        <div>
          <label>運動時間:</label>
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
        <button
          onClick={Post}
          type="submit"
          className="py-2 px-4 mt-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm md:text-base"
        >
          投稿
        </button>
      </form>
    </div>
  )
}