import toast from "react-hot-toast";

// サーバーサイドにログイン情報を送信する関数
export const UserAuth = async(username: string, password: string): Promise<any> => {
  const URL = process.env.SERVER_URL;
  try {
    const response = await fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        password: password,
      }),
    });

    if (!response.ok) {
      toast.error("ログインできませんでした")
      return "";
    }

    toast.success("ログイン成功")

    const token = await response.json();
    return token;
  } catch (error) {
    console.error("An error occurred during login:", error);
    return "";
  }
}

// サーバーサイドに新規登録情報を送信する関数
export const UserRegister = async(username: string, email: string, password: string): Promise<any> => {
  const URL = process.env.SERVER_URL;
  try {
    const response = await fetch(`${URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      toast.error("新規登録に失敗しました");
      return "";
    }

    toast.success("新規登録が完了しました")

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred during registration:", error);
    return "";
  }
}