import localFont from "next/font/local";

export const anekLatinCondensed = localFont({
  src: [
    {
      path: "./anek-latin/AnekLatin-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./anek-latin/AnekLatin-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./anek-latin/AnekLatin-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-anek-latin",
  display: "swap",
  adjustFontFallback: "Arial",
  preload: true, // keep true only if used above-the-fold (hero/header)
});