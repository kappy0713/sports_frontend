"use client";

import Header from "@/app/Header";

export default function Page() {
  const posts = [
    { id: 1, title: "投稿タイトル1", body: "ここに投稿の内容が入ります。" , url: "https://x.com"},
    { id: 2, title: "投稿タイトル2", body: "ここに投稿の内容が入ります。" , url: "https://x.com"},
  ];

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
    </div>
  );
}