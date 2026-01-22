import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/shared/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
