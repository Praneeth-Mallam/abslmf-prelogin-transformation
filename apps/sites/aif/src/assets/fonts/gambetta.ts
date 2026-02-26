import localFont from "next/font/local";

export const gambetta = localFont({
  src: [
    {
      path: "./gambetta/Gambetta-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./gambetta/Gambetta-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./gambetta/Gambetta-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./gambetta/Gambetta-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./gambetta/Gambetta-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gambetta",
  display: "swap",
  adjustFontFallback: "Arial",
  preload: true, // keep true only if used above-the-fold (hero/header)
});