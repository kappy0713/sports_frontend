"use client";

import Header from "@/app/Header";
import { useEffect, useState } from "react";
import { ThreeDots } from "@agney/react-loading";
import Cookies from "js-cookie"

interface Post {
  id: number;
  title: string;
  body: string;
  url: string;
}

export default function Page() {
  const URL = process.env.SERVER_URL
  const [posts, setPosts] = useState<Post[]>([]);
  const [Load, setLoad] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    const Posts = async () => {
      try{
        const response = await fetch(`${URL}/bookmark`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json()
        setPosts(data);
      } catch (error) {
        console.error("falied to fetch data");
      } finally {
        setLoad(false);
      }
    };

    Posts();
  }, []);

  if (Load) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Header />
        <div className="absolute">
          <ThreeDots width="50" color="#3db70f"/>
        </div>
      </div>
    )
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
    </div>
  );
}