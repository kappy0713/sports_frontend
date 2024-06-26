"use client";

import Header from "@/app/Header";
import { useEffect, useState } from "react";
import { BarChart } from '@tremor/react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { ThreeDots } from "@agney/react-loading";


interface Post {
  id: number;
  title: string;
  body: string;
  date: string;
  time: number;
}

interface Times {
  date: string;
  time: number;
}

export default function Page() {
  const URL = process.env.SERVER_URL
  const [posts, setPosts] = useState<Post[]>([]);
  const [times, setTimes] = useState<Times[]>([]);
  const [Load, setLoad] = useState(true);

  useEffect(() => {
    const MyPage = async () => {
      try{
        const post = await fetch(`${URL}/mypage`);
        const post_data = await post.json()
        const time = await fetch(`${URL}/time`);
        const times_data = await time.json()
        console.log(times_data)
        setPosts(post_data);
        setTimes(times_data);
      } catch (error) {
        console.error("falied to fetch data");
      } finally {
        setLoad(false);
      }
    };

    MyPage();
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

  // const posts = [
  //   { id: 1, title: "投稿タイトル1", body: "ここに投稿の内容が入ります。" , date: "2024-06-23", time: 30},
  //   { id: 2, title: "投稿タイトル2", body: "ここに投稿の内容が入ります。" , date: "2024-06-23", time: 30},
  // ];
  
  const dataFormatter = (number: number) =>
    Intl.NumberFormat('us').format(number).toString();

  const FixDate = (Date: string) => {
    return Date.split("T")[0];
  }

  return (
    <div className="mt-16 bg-gray-100">
      <Header />
      <h1 className="p-4 text-bold text-2xl">〇〇さん、こんにちは！</h1>
      <div className="">
        <h1 className="px-4 text-bold text-2xl">直近7日間の記録</h1>
        <BarChart
          className="mt-6 z-0"
          data={times}
          index="date"
          categories={["time"]}
          colors={['emerald']}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
        />
      </div>
      <div>
        <h1 className="pt-4 px-4 text-bold text-2xl">カレンダー</h1>
        <div className="flex justify-center items-center w-full">
          <div className="w-full min-h-screen">
            <FullCalendar 
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin
              ]}
              headerToolbar={{
                left: 'prev, next today',
                center: 'title',
                right: 'resourceTimelineWook, dayGridMonth, timeGridWeek'
              }}
              contentHeight="auto"
              height="100vh"
            />
          </div>
        </div>
      </div>
      <div>
        <h1 className="pt-4 px-4 text-bold text-2xl">〇〇さんの記録</h1>
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
      </div>
    </div>
  );
}