import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Foundry — AI app builder",
  description: "Prompt to running app: agent writes files, sandbox builds, preview reloads.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
