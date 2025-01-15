import React from "react"

export const useToken = () => {
  const [token, setTokenInternal] = React.useState(() => {
    return localStorage.getItem("token");
  });

  const setToken = newToken => {
    localStorage.setItem("token", newToken);
    setTokenInternal(newToken);
  }
  return [token, setToken];
}

