"use client";
import { useSidebar } from "@/hooks/useSidebar";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, House } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const { sidebarOpen } = useSidebar();
  const iconSize = 18;

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.aside
          key="sidebar"
          aria-expanded={sidebarOpen}
          className="bg-main fixed w-[18.5rem] left-0 bottom-0 top-12 h-screen"
          initial={{ left: "-18.5rem" }}
          animate={{ left: 0 }}
          exit={{ left: "-18.5rem" }}
          transition={{ duration: 0.2, ease: "linear" }}
        >
          <motion.div
            key="sidebar-content"
            className="overflow-hidden text-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "linear" }}
          >
            <nav className="py-5 border-b border-b-main-light">
              <ul className="flex flex-col text-white text-sm px-4">
                <li>
                  <Link
                    href="/"
                    className="flex gap-2 items-center rounded-lg px-3 py-2 hover:bg-main-light duration-200"
                  >
                    <House size={iconSize} />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="flex gap-2 items-center rounded-lg px-3 py-2 hover:bg-main-light duration-200"
                  >
                    <CircleCheck size={iconSize} />
                    <span>My Tasks</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
