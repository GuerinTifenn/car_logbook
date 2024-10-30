import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AuthChecker from "@/components/authChecker";
import ReduxProvider from "../../store/ReduxProvider"; // Importez le ReduxProvider


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Autolog",
  description: "Digital vehicle maintenance tracking",
  icons: {
    icon: "/icon.ico",
    shortcut: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ReduxProvider>
          <AuthChecker>
            <Header></Header>
            <main className="flex-grow">{children}</main>
            <Footer></Footer>
          </AuthChecker>
        </ReduxProvider>
      </body>
    </html>
  );
}
