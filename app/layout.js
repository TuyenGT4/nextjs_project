"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import TopNav from "@/component/nav/TopNav";
import Navbar from "@/component/nav/Navbar";
import { SessionProvider } from "next-auth/react";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-roboto",
  display: "swap",
});

import { ToastContainer } from "react-toastify";

import { Provider } from "react-redux";
import { store } from "./store";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAsminDashboard = pathname === "/dashboard/admin";

  return (
    <html lang="vi">
      <SessionProvider>
        <Provider store={store}>
          <body
            className={roboto.variable}
            style={{
              fontFamily: "var(--font-roboto), Roboto, Arial, sans-serif",
            }}
          >
            <ToastContainer />

            {!isAsminDashboard && (
              <>
                <TopNav />
                <Navbar />
              </>
            )}
            {children}
          </body>
        </Provider>
      </SessionProvider>
    </html>
  );
}
