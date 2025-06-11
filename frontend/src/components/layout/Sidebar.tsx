import { useLocation, Link } from "react-router-dom";
import { Wallet } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarItems } from "@/utils/sidebarItems";

/**
 * 
 * @description
 * AppSidebar component renders the sidebar navigation for the application.
 */

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-center h-14 px-4 border-b">
            <Wallet className="w-5 h-5 text-primary mr-2" />
            <span className="text-lg font-semibold tracking-wide">Expenso</span>
          </div>

          <SidebarGroupContent className="mt-5">
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const isActive = currentPath === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors ${
                          isActive
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
