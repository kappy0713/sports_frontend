import Cookies from "js-cookie"

// サーバーサイドにブックマークした投稿を送信する関数
export const PostBookmark = async(id: number) => {
  const token = Cookies.get("token")
  const URL = process.env.SERVER_URL

  try {
    const response = await fetch(`${URL}/post_bookmark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    if (!response.ok) {
      console.error("execise post failed");
    }
  } catch (error) {
    console.error(error);
  }
  
}