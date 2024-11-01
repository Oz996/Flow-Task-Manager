import "@/app/globals.css";
import Header from "@/components/header/header";
import SidebarContextProvider from "@/context/sidebar-context";
import { Metadata } from "next";
import Sidebar from "@/components/sidebar/sidebar";
import MainLayout from "./main-layout";
import ViewModeContextProvider from "@/context/view-mode-context";
import ProjectModal from "@/components/modals/project-modal/project-modal";
import TaskModal from "@/components/modals/task-modal/task-modal";
import DeleteModal from "@/components/modals/delete-modal/delete-modal";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Flow",
  description: "Manage tasks with your team easily using Flow",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarContextProvider>
      <ViewModeContextProvider>
        <Header />
        <Sidebar />
        <MainLayout>{children}</MainLayout>
        <ProjectModal />
        <DeleteModal />
      </ViewModeContextProvider>
    </SidebarContextProvider>
  );
}
