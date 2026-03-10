import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Montserrat, IBM_Plex_Sans_Arabic } from "next/font/google";
import "../globals.css";

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

export const metadata = {
  title: "Saudi Expat Guide",
  description: "Your complete guide to life in Saudi Arabia",
};

export default async function LangLayout({ children, params }) {
  const { lang } = await params

  const isArabic = lang === "ar"

 

  return (
    <html
     suppressHydrationWarning
      className={`${montserrat.variable} ${ibmArabic.variable}`}
    lang={lang} dir={isArabic ? "rtl" : "ltr"}>
      <body className="antialiased">
        
        <Navbar lang={lang} />

        <main >
          {children}
        </main>

       <Footer lang={lang} />

      </body>
    </html>
  )
}