import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Magic Life — Hipnoterapia",
  description: "Hipnoterapia metodą SET: szybka, skuteczna i bezpieczna droga do trwałej zmiany.",
  themeColor: "#FF5A3D",
  openGraph: {
    title: "Magic Life — Hipnoterapia",
    description: "Hipnoterapia metodą SET: szybka, skuteczna i bezpieczna droga do trwałej zmiany."
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={inter.className + " antialiased bg-white text-neutral-900"}>{children}</body>
    </html>
  );
}
