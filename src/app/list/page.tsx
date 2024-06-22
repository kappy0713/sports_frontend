"use client";

import Header from "@/app/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThreeDots } from "@agney/react-loading";

interface Post {
  id: number;
  title: string;
  body: string;
  date: string;
  time: number;
}

export default function Page() {
  const router = useRouter();
  const URL = process.env.SERVER_URL
  const [posts, setPosts] = useState<Post[]>([]);
  const [Load, setLoad] = useState(true);

  useEffect(() => {
    const Posts = async () => {
      try{
        const response = await fetch(`${URL}/list`);
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

  const FixDate = (Date: string) => {
    return Date.split("T")[0];
  }

  const Post =() => {
    router.push("/post")
  }

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
          <div className="px-6 pt-6 pb-4 flex justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-gray-800">{post.title}</h5>
            <span className="text-sm text-gray-500">{FixDate(post.date)}</span>
          </div>
          <div className="px-6 pb-6 flex justify-between">
            <p className="text-xl font-normal text-gray-700">{post.body}</p>
            <span className="text-2xl font-bold tracking-tight text-gray-800">
              {post.time < 60 ? `${post.time}m` : `${Math.floor(post.time / 60)}h${post.time % 60}m`}
            </span>
          </div>
        </div>
      ))}
    </div>
      <div className="fixed bottom-6 right-6">
        <button 
          className=" scale-110 p-4 bg-emerald-400 rounded-full text-white shadow-lg hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={Post}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}