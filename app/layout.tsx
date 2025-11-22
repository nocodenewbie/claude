import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProfitMax AI - B2B Sales Virtual Assistant",
  description: "Transform your website into a 24/7 automated sales channel with Max, your intelligent virtual sales assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body className="antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
