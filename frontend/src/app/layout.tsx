import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import "@zener/nepali-datepicker-react/index.css";

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
      <body className="h-full w-full">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
