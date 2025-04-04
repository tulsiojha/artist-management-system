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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
