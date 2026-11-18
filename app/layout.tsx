import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhaka City Smart Dashboard",
  description:
    "Dhaka city dashboard with live weather, model-based air quality, maps and news search. Traffic, transit status, camera footage and availability are clearly labelled demo samples.",
  applicationName: "Dhaka City Smart Dashboard",
  keywords: ["Dhaka", "weather", "air quality", "city dashboard", "Open-Meteo", "GDELT"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var s=JSON.parse(localStorage.getItem("dhaka-city:settings")||"null");if(s){if(s.theme==="dark"){document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark"}if(s.lang==="bn"){document.documentElement.lang="bn"}}}catch(e){}',
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
