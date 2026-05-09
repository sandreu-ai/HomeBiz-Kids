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

const baseUrl = "https://www.homebizkids.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HomeBiz Kids",
  url: baseUrl,
  logo: `${baseUrl}/icons/icon-512.png`,
  description:
    "A privacy-first family app for parent-led missions, proof, praise, and rewards that help kids practice character and entrepreneurial thinking.",
};

const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HomeBiz Kids",
  url: baseUrl,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  audience: {
    "@type": "Audience",
    audienceType: "Parents and families",
  },
  description:
    "HomeBiz Kids turns real family needs into missions where kids practice responsibility, service, courage, and value creation.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free forever for one child.",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.homebizkids.com"),
  title: "HomeBiz Kids — Gamified character formation for families",
  description:
    "Help your child become a better human being with an entrepreneurial mindset through parent-led family missions, proof, praise, and rewards.",
  applicationName: "HomeBiz Kids",
  alternates: { canonical: "/" },
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
    description: "Gamified character formation for entrepreneurial kids.",
    type: "website",
    siteName: "HomeBiz Kids",
  },
  twitter: {
    card: "summary",
    title: "HomeBiz Kids",
    description: "Gamified character formation for entrepreneurial kids.",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bone font-sans">
        <Providers>
          {children}
          <DemoUserSwitcher />
        </Providers>
      </body>
    </html>
  );
}
