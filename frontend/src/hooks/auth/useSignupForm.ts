import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSignupMutation } from "@/features/auth/authAPI";

export const useSignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signup({ name, email, password }).unwrap();
      toast.success("Signup successful! You can now login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(
        "Signup failed. Please check your details or try a different email."
      );
    }
  };

  return {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    handleSubmit,
    isLoading,
  };
};