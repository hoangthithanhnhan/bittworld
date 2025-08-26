import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import Header from "components/Header";
import Footer from "components/footer";
import { LangProvider } from "../lang/LangProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bittworld",
  description: "A Next.js application with TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <LangProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
