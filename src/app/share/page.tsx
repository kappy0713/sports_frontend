"use client";

import Header from "@/app/Header";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const posts = [
    { id: 1, title: "投稿タイトル1", body: "ここに投稿の内容が入ります。" , url: "https://x.com"},
    { id: 2, title: "投稿タイトル2", body: "ここに投稿の内容が入ります。" , url: "https://x.com"},
  ];

  const SharePost = () => {
    router.push("/share_post")
  }

  return (
    <div className="mt-16 bg-gray-100">
      <Header />
      <div className="flex flex-col items-center p-6 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="max-w-2xl w-full bg-zinc-50 rounded-lg border-2 border-emerald-400 shadow-md">
            <div className="p-6">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{post.title}</h5>
              <p className="text-xl mb-3 font-normal text-gray-700">{post.body}</p>
              <span>URL：</span><a href={post.url} className="text-md mb-3 font-normal text-gray-700 hover:text-emerald-400 underline" target='_blank'>{post.url}</a>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-6 right-6">
        <button 
          className="scale-110 p-4 bg-emerald-400 rounded-full text-white shadow-lg hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={SharePost}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}