import "@/app/globals.css";
import { Montserrat, IBM_Plex_Sans_Arabic } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-arabic",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en"> {/* Default lang */}
      <body
        className={`flex flex-col min-h-screen antialiased ${montserrat.variable} ${ibmArabic.variable}`}
      >
        {children}
      </body>
    </html>
  );
}