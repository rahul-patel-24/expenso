import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

/**
 * @description
 * AppLayout component serves as the main layout for authenticated users.
 * It includes the sidebar, header, and main content area where nested routes will render. 
 */

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-4 overflow-y-auto bg-background text-foreground">
            <Outlet /> 
          </main>
          <Toaster />
        </div>
      </div>
    </SidebarProvider>
  );
};
