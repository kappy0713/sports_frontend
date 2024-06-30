"use client";

import Header from "@/app/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThreeDots } from "@agney/react-loading";
import { PostBookmark } from "@/utils/bookmark";
import toast from "react-hot-toast";


interface Post {
  id: number;
  title: string;
  body: string;
  url: string;
}

export default function Page() {
  const router = useRouter();
  const URL = process.env.SERVER_URL
  const [posts, setPosts] = useState<Post[]>([]);
  const [Load, setLoad] = useState(true);

  useEffect(() => {
    const Posts = async () => {
      try{
        const response = await fetch(`${URL}/share`);
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

  const SharePost = () => {
    router.push("/share_post")
  }

  const Bookmark = async (id: number) => {
    console.log(id)
    PostBookmark(id);
    
    toast.success("投稿をブックマークしました");

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
          <div key={post.id} className="max-w-2xl w-full bg-zinc-50 rounded-lg border-2 border-emerald-400 shadow-md flex justify-between">
            <div className="p-6">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{post.title}</h5>
              <p className="text-xl mb-3 font-normal text-gray-700">{post.body}</p>
              <span>URL：</span><a href={post.url} className="text-md mb-3 font-normal text-gray-700 hover:text-emerald-400 underline" target='_blank'>{post.url}</a>
            </div>
            <button
              className="my-8 mx-6 p-4 bg-emerald-400 rounded-full text-white shadow-lg hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => Bookmark(post.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v17l7-5 7 5V3z" />
              </svg>
            </button>
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