import { ReactNode } from "react";
import "@/app/globals.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <div className="w-[90%] sm:w-[20rem]">{children}</div>
    </section>
  );
}
