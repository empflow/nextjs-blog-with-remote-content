import "./globals.css";
import Navbar from "./components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dave's Blog",
  description: "Created by Dave Gray",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-slate-800">
        <main className="m-auto px-4 md:px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
          <Navbar />

          {children}
        </main>
      </body>
    </html>
  );
}
