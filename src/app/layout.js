import "./globals.css";
import Header from "@/components/Header";
import { Navigator } from "@/components/Navigator";
import { Toaster } from "sonner";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Costos App",
  description: "Aplicacion de calculo de costos",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#fff" }],
  authors: [
    {
      name: "Damian Barzola",
      url: "https://github.com/DamianBarzola",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "favicon.ico" },
    { rel: "icon", url: "favicon.ico" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        <div className="flex justify-center min-h-screen">
          <main className="w-full max-w-[750px] px-2 sm:px-6 lg:px-8">
            <Toaster position="top-center" />
            <Header />
            <div className="mb-36  relative top-14">{children}</div>
            <Navigator />
          </main>
        </div>
      </body>
    </html>
  );
}
