"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser, clearUser, setLoading } from "@/src/store/slices/AuthSlice";
import Cookies from "js-cookie";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      dispatch(clearUser());
      dispatch(setLoading(false));
      return;
    }

    axios
      .get("http://34.18.76.114/v1/api/profiles/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch(() => {
        dispatch(clearUser());
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  return <>{children}</>;
}
