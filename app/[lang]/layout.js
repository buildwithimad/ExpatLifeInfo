import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LangLayout({ children, params }) {
  const { lang } = params;
  const allowedLangs = ["en", "ar"];
  if (!allowedLangs.includes(lang)) return notFound();

  const isArabic = lang === "ar";

  return (
    <div className={isArabic ? "rtl" : "ltr"}>
      <Navbar lang={lang} />
      <main>{children}</main>
      <Footer lang={lang} />
    </div>
  );
}