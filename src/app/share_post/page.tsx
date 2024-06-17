"use client";

import { useState } from "react"
import { useRouter } from "next/navigation";
import { SharePost } from "@/utils/post";
import Header from "@/app/Header"

export default function Page () {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [url, setURL] = useState('');
  const router = useRouter();


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ title, body, url});
  };

  const Post = async (event: React.FormEvent) => {
    SharePost(title, body, url);
    
    router.push("/")
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
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label>本文</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full resize-none h-32"
                />
              </div>
              <div>
                <label>URL</label>
                <textarea
                  value={url}
                  onChange={(e) => setURL(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full resize-none h-16"
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={Post}
                  type="submit"
                  className="py-2 px-4 mt-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm md:text-base"
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