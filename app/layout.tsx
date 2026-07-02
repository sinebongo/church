import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { ContentProvider } from "./context/ContentProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Evangelical Lutheran Church in Southern Africa - Central Diocese Youth League",
  description: "Empowering Youth in Faith and Fellowship",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable}`}>
        <ContentProvider>
          <NavBar/>
          {children}
          <Footer />
        </ContentProvider>
      </body>
    </html>
  );
}
