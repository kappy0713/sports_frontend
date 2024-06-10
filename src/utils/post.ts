import Cookies from "js-cookie"

// サーバーサイドに運動記録を送信する関数
export const ExecisePost = async(title: string, body: string, date: Date, time: number) => {
  const token = Cookies.get("token")
  const URL = process.env.SERVER_URL

  try {
    const response = await fetch(`${URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title,
        body: body,
        date: date,
        time: time
      }),
    });

    if (!response.ok) {
      console.error("post failed");
    }
  } catch (error) {
    console.error(error);
  }
  
}