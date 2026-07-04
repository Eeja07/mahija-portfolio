import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mahija | Infrastructure & Fullstack Engineer",
    template: "%s | Mahija",
  },
  description:
    "Portfolio of Mahija, optimized for recruiters and engineering managers. Specializing in Debian 12 infrastructure, Docker orchestrations, Cloudflare Tunnels, IoT, Edge AI, and full-stack SaaS development.",
  metadataBase: new URL("https://portfolio.eeja.fun"),
  alternates: {
    canonical: "https://portfolio.eeja.fun",
  },
  openGraph: {
    title: "Mahija | Infrastructure & Fullstack & Edge AI Engineer",
    description:
      "Portfolio of Mahija, optimized for recruiters and engineering managers. Specializing in Debian 12 infrastructure, Docker orchestrations, Cloudflare Tunnels, IoT, Edge AI, and full-stack SaaS development.",
    url: "https://portfolio.eeja.fun",
    siteName: "Mahija Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Mahija Ibad Pradipta - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahija | Infrastructure & Fullstack Engineer",
    description:
      "Portfolio of Mahija, optimized for recruiters and engineering managers.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" }
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mahija Ibad Pradipta",
  "url": "https://portfolio.eeja.fun",
  "image": "https://portfolio.eeja.fun/og.png",
  "jobTitle": "Computer Engineering Student",
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Institut Teknologi Sepuluh Nopember (ITS)"
  },
  "sameAs": [
    "https://github.com/Eeja07",
    "https://linkedin.com/in/mahijaibad"
  ],
  "knowsAbout": [
    "Docker",
    "Linux",
    "Debian",
    "IoT",
    "MQTT",
    "Cloudflare",
    "Computer Vision",
    "ROS",
    "Embedded Systems",
    "Robotics"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased font-sans selection:bg-primary/20 selection:text-primary",
        inter.variable,
        geistMono.variable
      )}
    >
      <head>
        {/* Privacy-friendly self-hosted analytics */}
        <script
          async
          src="https://analytics.eeja.fun/script.js"
          data-website-id="745cf199-059f-4889-ae2d-d74139187546"
        />
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
