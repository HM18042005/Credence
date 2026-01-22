import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Credence - Consent-Driven Credit Intelligence Platform",
  description: "Transparent, explainable credit assessments using consented financial data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
