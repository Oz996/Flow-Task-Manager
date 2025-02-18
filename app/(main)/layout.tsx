import "@/app/globals.css";
import Header from "@/components/header/header";
import SidebarContextProvider from "@/context/sidebar-context";
import { Metadata } from "next";
import Sidebar from "@/components/sidebar/sidebar";
import MainLayout from "./main-layout";
import ViewModeContextProvider from "@/context/view-mode-context";
import { Toaster } from "sonner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Flow",
  description: "Manage tasks with your team easily using Flow",
};

const style = {
  background: "hsl(var(--main))",
  border: "1px solid hsl(var(--main))",
  color: "white",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarContextProvider>
      <Toaster toastOptions={{ style }} />
      <ViewModeContextProvider>
        <MainLayout>
          <Header />
          <Sidebar />
          {children}
        </MainLayout>
      </ViewModeContextProvider>
    </SidebarContextProvider>
  );
}
