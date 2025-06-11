import { useLogoutMutation } from "@/features/auth/authAPI";
import { clearUser } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks";

export const useLogoutHook = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(clearUser());
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return { handleLogout };
};