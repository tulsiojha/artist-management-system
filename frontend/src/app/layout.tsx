import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Artist management system",
  description: "Artist management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="h-full w-full bg-gray-50">{children}</body>
    </html>
  );
}
