import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "./authSlice";

export function useAutoAuth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);
}
