import { useState } from "react";

export default function useToken() {
  function getToken(): string | null {
    const tokenString: string | null = sessionStorage.getItem("token");
    if (!tokenString) {
      return null;
    }
    return tokenString;
  }

  const [token, setToken] = useState(getToken());

  const saveToken = (token: string) => {
    sessionStorage.setItem("token", JSON.stringify(token));
    setToken(token);
  };

  const deleteToken = () => {
    sessionStorage.removeItem("token");
  };

  return {
    setToken: saveToken,
    deleteToken,
    token,
  };
}
