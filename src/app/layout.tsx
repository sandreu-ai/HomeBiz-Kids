import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { DemoUserSwitcher } from "@/components/dev/DemoUserSwitcher";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HomeBiz Kids — A family marketplace that rewires the brain",
  description:
    "Form capable, goal-oriented kids through family missions, sibling service, delayed gratification, and a parent-controlled token economy.",
  applicationName: "HomeBiz Kids",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HomeBiz Kids",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
      { url: "/icons/icon-167.png", sizes: "167x167" },
      { url: "/icons/icon-152.png", sizes: "152x152" },
      { url: "/icons/icon-120.png", sizes: "120x120" },
    ],
  },
  openGraph: {
    title: "HomeBiz Kids",
    description: "A family marketplace that rewires the brain.",
    type: "website",
    siteName: "HomeBiz Kids",
  },
  twitter: {
    card: "summary",
    title: "HomeBiz Kids",
    description: "A family marketplace that rewires the brain.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#FAF7F2" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} ${caveat.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bone font-sans">
        <Providers>
          {children}
          <DemoUserSwitcher />
        </Providers>
      </body>
    </html>
  );
}
