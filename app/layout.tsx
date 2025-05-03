import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Providers } from "../src/Providers";

const montserrat = localFont({
  src: [
    {
      path: "./fonts/Montserrat-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = localFont({
  src: [
    {
      path: "./fonts/Inter-VariableFont.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mega Start Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable}`}>
        <Providers>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
