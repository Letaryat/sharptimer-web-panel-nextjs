import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider"
import { Separator } from "@/components/ui/separator";
import Header from "./components/header";
import BreadCrumb from "./components/path";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "SharpTimer",
  description: "SharpTimer app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased container mx-auto mt-5`}>
        <Header />
        <Separator className="my-4 bg-zinc-900" />
        <BreadCrumb/>
        {children}
        </div>
      </body>
    </html>
  );
}
