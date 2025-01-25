"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import DefaultComponent from "./DefaultWrapper";
import { useStore } from "@/store/appStore";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setSession } = useStore();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if window is refreshed
    const handleBeforeUnload = () => {
      setSession(undefined);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Use system or user preference for dark mode
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);

    // Cleanup listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <html lang="en" className={"dark"}>
      <body className="min-h-screen flex flex-col dark:bg-black bg-white">
        <DefaultComponent>{children}</DefaultComponent>
      </body>
    </html>
  );
}
