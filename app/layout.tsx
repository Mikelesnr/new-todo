import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Sidebar from "./components/Sidebar/Sidebar";
import NextTopLoader from "nextjs-toploader";

import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Appbar from "./components/Appbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getServerSession } from "next-auth";
import ContextProvider from "./providers/ContextProvider";
import GlobalStyleProvider from "./providers/GlobalStyleProvider";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const getId = async () => {
  const session = await getServerSession();
  const id = session?.user.id;
  return id;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = getId;
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js"
          defer
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js" />
      </head>
      <body className={nunito.className}>
        <NextTopLoader
          height={2}
          color="#27AE60"
          easing="cubic-bezier(0.53,0.21,0,1)"
        />
        <Providers>
          <ContextProvider>
            <GlobalStyleProvider>
              {userId && <Sidebar />}
              <div className="w-full">{children}</div>
            </GlobalStyleProvider>
          </ContextProvider>
        </Providers>
      </body>
    </html>
  );
}
