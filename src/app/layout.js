import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Navigator } from "@/components/Navigator";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Clavelina App",
  description: "It's a simple progressive web application made with NextJS",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "damianbarzola",
      url: "",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-center min-h-screen">
          <main className="w-full max-w-[750px] px-2 sm:px-6 lg:px-8">
            <Toaster position="top-center" />

            <Header />
            <div className="mb-20 sm:mb-0">{children}</div>
            <Navigator />
          </main>
        </div>
      </body>
    </html>
  );
}
