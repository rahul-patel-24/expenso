
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "@/features/auth/authAPI";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "@/features/auth/authSlice";

export const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({ email, password }).unwrap();

      if (response.success && response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
        dispatch(setUser(response.user));
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed: Invalid email or password. Please try again.");
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    isLoading,
    handleSubmit,
  };
};
