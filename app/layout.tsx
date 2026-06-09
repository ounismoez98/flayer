import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BTU Hub | The Future of Collaborative Ecosystems",
  description: "A microservices architecture powered by AI for hiring, learning, and collaboration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased selection:bg-cyan-500/30`}>
        {children}
      </body>
    </html>
  );
}
