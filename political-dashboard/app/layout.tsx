import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "US Political Climate Dashboard",
  description: "Track US presidential approval ratings, party favorability, and political trend forecasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
