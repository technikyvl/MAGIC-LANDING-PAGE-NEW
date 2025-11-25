import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Szkolenia - Magic Life",
  description: "PRAKTYK Techniki HIPNOZY MARZEŃ - Kurs stacjonarny 24-25 października 2025",
  themeColor: "#FF5A3D",
  openGraph: {
    title: "Szkolenia - Magic Life",
    description: "PRAKTYK Techniki HIPNOZY MARZEŃ - Kurs stacjonarny 24-25 października 2025"
  }
};

export default function TrainingLayout({ children }) {
  return (
    <html lang="pl">
      <body className={inter.className + " antialiased bg-white text-neutral-900"}>{children}</body>
    </html>
  );
}
