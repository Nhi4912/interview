"use client";

import { Inter } from "next/font/google";
import { ThemeProvider } from "styled-components";
import { StyledComponentsRegistry } from "@/components/StyledComponentsRegistry";
import GlobalStyles from "@/styles/GlobalStyles";
import { theme } from "@/styles/theme";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Frontend Interview Prep 2025 - Big Tech Interview Guide</title>
        <meta
          name="description"
          content="Comprehensive frontend interview preparation for Big Tech companies including React, TypeScript, algorithms, and system design."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1a1a1a" />
        <meta property="og:title" content="Frontend Interview Prep 2025" />
        <meta
          property="og:description"
          content="Complete guide for frontend engineers targeting Big Tech companies"
        />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Navigation />
              <main style={{ flex: 1 }}>{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
