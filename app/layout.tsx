import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Header from "@/components/header/header";
import SidebarContextProvider from "@/context/sidebar-context";
import { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Flow",
  description: "Manage tasks with your team easily using Flow",
};

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarContextProvider>
            <Header />
            <main>{children}</main>
          </SidebarContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
