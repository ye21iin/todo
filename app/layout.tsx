import type { Metadata } from "next";
import "./globals.css";
import Provider from "./provider";

export const metadata: Metadata = {
  title: "My Todo List",
  description: "support self-based todo management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
