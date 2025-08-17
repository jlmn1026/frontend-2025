import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./AppSideber";
import { cn } from "@/lib/utils";

const CommonLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={cn("w-full flex")}>
        <SidebarTrigger />
        <div className={cn("w-[calc(100%-260px)] flex justify-center")}>
          <div
            className={cn("min-w-[1024px] w-[1024px] h-[calc(100vh)] bg-white")}
          >
            <Outlet />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default CommonLayout;
