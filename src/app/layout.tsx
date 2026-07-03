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
  metadataBase: new URL("https://eeja.fun"),
  alternates: {
    canonical: "https://eeja.fun",
  },
  openGraph: {
    title: "Mahija | Infrastructure & Fullstack & Edge AI Engineer",
    description:
      "Portfolio of Mahija, optimized for recruiters and engineering managers. Specializing in Debian 12 infrastructure, Docker orchestrations, Cloudflare Tunnels, IoT, Edge AI, and full-stack SaaS development.",
    url: "https://eeja.fun",
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
