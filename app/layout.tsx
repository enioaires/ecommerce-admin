import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import { ModalProvider } from "@/providers/modalProvider";
import { ToastProvider } from "@/providers/toastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin - Next.js",
  description: "Admin - Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToastProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
