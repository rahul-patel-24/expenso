import { LogOut } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { useAppSelector } from "@/app/hooks";
import { AvatarSection } from "./HeaderAvtar";
import { Button } from "@/components/ui/button";
import { useLogoutHook } from "@/hooks/auth/useLogoutHook";

/**
 * 
 * @description
 * Header component displays the top navigation bar with user avatar, mode toggle, and logout button.
 * It uses the `useLogoutHook` to handle user logout functionality.
 */

export const Header = () => {
  const { handleLogout } = useLogoutHook();

  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="h-16 border-b bg-background px-4 flex items-center justify-between">
      <SidebarTrigger />
      {user && (
        <div className="flex items-center gap-4">
          <AvatarSection user={user} />
          <ModeToggle />
          <Button size="sm" variant="outline" onClick={handleLogout}>
            <LogOut />
          </Button>
        </div>
      )}
    </header>
  );
};