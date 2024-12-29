import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return <main className="pt-16 h-screen">{children}</main>;
}
