"use client";

import Header from "@/app/Header";
import { useEffect, useState } from "react";
import { BarChart } from '@tremor/react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { ThreeDots } from "@agney/react-loading";
import Cookies from "js-cookie"
import { useRouter } from 'next/navigation';


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
  const router = useRouter();
  const [name, setName] =useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [times, setTimes] = useState<Times[]>([]);
  const [monthtimes, setMonthTimes] = useState<Times[]>([]);
  const [Load, setLoad] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
  
    if (!token) {
      router.push("/login");
    } else {
      const MyPage = async () => {
        try {
          const nameResponse = await fetch(`${URL}/name`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
          const name_data = await nameResponse.json();
          
          const postResponse = await fetch(`${URL}/mypage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
          const post_data = await postResponse.json();
  
          const timeResponse = await fetch(`${URL}/time`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
          const times_data = await timeResponse.json();
  
          const monthtimeResponse = await fetch(`${URL}/month`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
          const monthtime_data = await monthtimeResponse.json();
          
          setName(name_data.name);
          setPosts(post_data);
          setTimes(times_data);
          setMonthTimes(monthtime_data);
          console.log(monthtimes)
        } catch (error) {
          console.error("Failed to fetch data", error);
        } finally {
          setLoad(false);
        }
      };
  
      MyPage();
    }
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

  const dataFormatter = (number: number) =>
    Intl.NumberFormat('us').format(number).toString();

  const FixDate = (Date: string) => {
    return Date.split("T")[0];
  }

  const backgroundEvents = monthtimes.map(day => ({
    start: day.date,
    backgroundColor: day.time === 0 ? 'white' :
                     day.time >= 1 && day.time < 15 ? '#bbf7d0' :
                     day.time >= 15 && day.time < 30 ? '#86efac' :
                     day.time >= 30 && day.time < 60 ? '#4ade80' : '#22c55e',
    display: 'background'
  }));

  const Greeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 10) {
      return 'おはようございます';
    } else if (hour >= 10 && hour < 18) {
      return 'こんにちは';
    } else {
      return 'こんばんは';
    }
  };

  return (
    <div className="mt-16 bg-gray-100">
      <Header />
      <h1 className="p-4 text-bold text-2xl">{name}さん、{Greeting()}！</h1>
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
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              events={backgroundEvents}
              headerToolbar={{
                left: 'prev, next today',
                center: 'title',
                right: 'resourceTimelineWook, dayGridMonth, timeGridWeek'
              }}
              contentHeight="{600px}"
              height="100vh"
            />
          </div>
        </div>
      </div>
      <div>
        <h1 className="pt-4 px-4 text-bold text-2xl">{name}さんの記録</h1>
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