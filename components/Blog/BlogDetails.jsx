"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

// --------------------------------------------------------------------------
// 🌟 PREMIUM EDITORIAL TYPOGRAPHY & CLEAN FLAT DESIGN
// --------------------------------------------------------------------------

const richTextComponents = {
  // ADDED TYPES: This prevents PortableText from silently deleting text if it encounters an image!
  types: {
    image: ({ value }) => {
      if (!value) return null;
      // Fallback placeholder to prevent crashing. To show actual images inside text, 
      // you will need to implement Sanity's urlFor() builder here later.
      return (
        <div className="my-10 p-6 bg-[#0d1a0f]/5 rounded-2xl text-center text-[#4a5e4d] font-semibold">
          [Image embedded here - Configure urlFor() to display]
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="text-lg md:text-xl lg:text-[1.25rem] leading-[1.8] text-[#2c382e] mb-8 font-sans font-normal">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-[#0d1a0f] mt-16 mb-8 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.25rem] font-bold text-[#0d1a0f] mt-16 mb-6 leading-tight tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#b5651d] mt-12 mb-4 leading-snug">
        {children}
      </h3>
    ),
    // ADDED h4, h5, h6 to prevent missing text blocks
    h4: ({ children }) => <h4 className="font-serif text-xl font-bold text-[#0d1a0f] mt-8 mb-4">{children}</h4>,
    h5: ({ children }) => <h5 className="font-serif text-lg font-bold text-[#0d1a0f] mt-6 mb-3">{children}</h5>,
    h6: ({ children }) => <h6 className="font-serif text-base font-bold text-[#0d1a0f] mt-6 mb-3">{children}</h6>,
    blockquote: ({ children }) => (
      <blockquote className="my-12 bg-[#0d1a0f]/5 p-8 md:p-10 rounded-2xl transition-transform hover:scale-[1.01] duration-500">
        <p className="font-serif italic text-2xl md:text-3xl text-[#0d1a0f] leading-relaxed">
          {children}
        </p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-10 space-y-4 ms-2 md:ms-4 text-lg md:text-xl lg:text-[1.25rem] text-[#2c382e]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-10 space-y-5 ms-6 list-decimal list-outside text-lg md:text-xl lg:text-[1.25rem] text-[#2c382e] font-sans marker:text-[#b5651d] marker:font-bold">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-4 leading-[1.8]">
        <span className="mt-[0.6rem] w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#b5651d] shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="pl-2 leading-[1.8]">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-[#0d1a0f]">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="font-serif italic text-[#b5651d]">{children}</em>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#b5651d] font-semibold underline decoration-2 decoration-[#b5651d]/30 underline-offset-4 hover:decoration-[#b5651d] transition-colors"
      >
        {children}
      </a>
    ),
  },
};

// --------------------------------------------------------------------------
// SHARE COMPONENT
// --------------------------------------------------------------------------
function ShareButton({ platform, onClick }) {
  const icons = {
    twitter: <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>,
    linkedin: <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>,
    whatsapp: <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
    copy: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
  };

  const colors = {
    twitter: "hover:bg-[#1da1f2] hover:text-white",
    linkedin: "hover:bg-[#0a66c2] hover:text-white",
    whatsapp: "hover:bg-[#25d366] hover:text-white",
    copy: "hover:bg-[#b5651d] hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#4a5e4d] ${colors[platform]} hover:-translate-y-1 transition-all duration-300`}
      aria-label={platform}
    >
      {icons[platform]}
    </button>
  );
}

// --------------------------------------------------------------------------
// READING PROGRESS BAR
// --------------------------------------------------------------------------
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-transparent">
      <div 
        className="h-full bg-[#b5651d] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// --------------------------------------------------------------------------
// BACK TO TOP BUTTON
// --------------------------------------------------------------------------
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-[#b5651d] text-white flex items-center justify-center hover:bg-[#0d1a0f] transition-all duration-300 hover:scale-110"
      aria-label="Back to top"
    >
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

// --------------------------------------------------------------------------
// MOBILE SHARE BAR
// --------------------------------------------------------------------------
function MobileShareBar({ url, title, isArabic }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      name: "Twitter",
      icon: <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>,
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank"),
      color: "bg-[#1da1f2]",
    },
    {
      name: "LinkedIn",
      icon: <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>,
      action: () => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, "_blank"),
      color: "bg-[#0a66c2]",
    },
    {
      name: "WhatsApp",
      icon: <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`, "_blank"),
      color: "bg-[#25d366]",
    },
    {
      name: copied ? (isArabic ? "تم!" : "Copied!") : (isArabic ? "نسخ" : "Copy"),
      icon: copied ? (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      ),
      action: () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      color: "bg-[#b5651d]",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white px-4 py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2"
      >
        <span className="font-semibold text-[#0d1a0f]">
          {isArabic ? "مشاركة" : "Share"}
        </span>
        <svg 
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" 
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="flex justify-around pt-3 pb-2 animate-in slide-in-from-bottom duration-300">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={option.action}
              className={`flex flex-col items-center gap-1 ${option.color} text-white px-4 py-2 rounded-xl min-w-[70px] transition-transform hover:scale-105 active:scale-95`}
            >
              {option.icon}
              <span className="text-xs font-medium">{option.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// AUTHOR BIO COMPONENT
// --------------------------------------------------------------------------
function AuthorBio({ author, lang, isArabic }) {
  if (!author) return null;

  const getValue = (value) => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value[lang]) return value[lang];
    if (typeof value === 'object' && value.en) return value.en;
    return '';
  };

  const t = {
    aboutAuthor: isArabic ? "عن الكاتب" : "About the Author",
    viewProfile: isArabic ? "عرض الملف" : "View Profile",
  };

  return (
    <div className="mt-16 pt-10">
      <div className="bg-white rounded-[2rem] p-8 md:p-10 transition-transform hover:scale-[1.01] duration-500">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {author.image && (
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shrink-0">
              <Image 
                src={author.image} 
                alt={getValue(author.name)} 
                fill 
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#b5651d] mb-2 block">
              {t.aboutAuthor}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#0d1a0f] mb-3">
              {getValue(author.name)}
            </h3>
            {author.bio && (
              <p className="text-[#4a5e4d] text-lg leading-relaxed mb-4">
                {getValue(author.bio)}
              </p>
            )}
            {author.slug && (
              <Link 
                href={`/${lang}/author/${author.slug}`}
                className="inline-flex items-center gap-2 text-[#b5651d] font-semibold hover:text-[#0d1a0f] transition-colors group"
              >
                {t.viewProfile}
                <svg 
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" 
                  className={`w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${isArabic ? "rotate-180" : ""}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------------------------------
export default function BlogDetails({ post, relatedPosts, lang }) {
  const isArabic = lang === "ar";

  if (!post) return null;

  const getValue = (value) => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value[lang]) return value[lang];
    if (typeof value === 'object' && value.en) return value.en;
    return '';
  };

  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const categoryTitle = post.category ? getValue(post.category.title) : '';

  const t = {
    by: isArabic ? "بواسطة" : "By",
    readTime: isArabic ? "دقائق للقراءة" : "min read",
    related: isArabic ? "مقالات ذات صلة" : "Related Articles",
    share: isArabic ? "مشاركة" : "Share",
    tags: isArabic ? "الوسوم:" : "Tags:",
    backToCategory: isArabic ? `العودة إلى ${categoryTitle}` : `Back to ${categoryTitle}`,
    copyLink: isArabic ? "نسخ الرابط" : "Copy Link",
    copied: isArabic ? "تم النسخ!" : "Copied!",
    minRead: isArabic ? "دقيقة للقراءة" : "min read",
  };

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    isArabic ? "ar-SA" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const handleShare = (platform) => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const encodedTitle = encodeURIComponent(getValue(post.title));
    
    switch (platform) {
      case 'twitter': window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodeURIComponent(shareUrl)}`, "_blank"); break;
      case 'linkedin': window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodedTitle}`, "_blank"); break;
      case 'whatsapp': window.open(`https://wa.me/?text=${encodeURIComponent(getValue(post.title) + " " + shareUrl)}`, "_blank"); break;
      case 'copy': navigator.clipboard.writeText(shareUrl); break;
    }
  };

  return (
    <>
      <ReadingProgress />
      <article 
        dir={isArabic ? "rtl" : "ltr"} 
        className="bg-[#f5f0e8] text-[#0d1a0f] min-h-screen selection:bg-[#b5651d] selection:text-[#f5f0e8] pb-24 lg:pb-16 font-sans"
      >
        {/* Hero Section */}
        <header className="max-w-[1000px] mx-auto px-5 lg:px-8 pt-16 md:pt-24 pb-12 flex flex-col items-center text-center">
          {post.category && (
            <Link 
              href={`/${lang}/category/${post.category.slug}`}
              className="text-xs font-bold tracking-[0.15em] uppercase text-[#b5651d] mb-6 hover:text-white transition-colors px-6 py-2 rounded-full bg-white hover:bg-[#b5651d]"
            >
              {categoryTitle}
            </Link>
          )}

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0d1a0f] tracking-tight leading-[1.1] mb-8">
            {getValue(post.title)}
          </h1>

          {post.excerpt && (
            <p className="text-xl md:text-2xl text-[#4a5e4d] max-w-4xl leading-relaxed mb-10 font-serif italic opacity-90">
              "{getValue(post.excerpt)}"
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm font-medium tracking-wide uppercase text-[#4a5e4d]/80 py-5 w-full max-w-3xl bg-white/50 rounded-2xl">
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.image && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image src={post.author.image} alt={getValue(post.author.name)} fill className="object-cover" />
                  </div>
                )}
                <span>{t.by} <span className="font-bold text-[#0d1a0f]">{getValue(post.author.name)}</span></span>
              </div>
            )}
            
            <div className="w-px h-8 bg-[#0d1a0f]/10 hidden md:block" />
            
            <div className="flex items-center gap-2">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 text-[#b5651d]">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
              <span>{formattedDate}</span>
            </div>

            {post.readTime && (
              <div className="flex items-center gap-2">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 text-[#b5651d]">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>{post.readTime} {t.minRead}</span>
              </div>
            )}
          </div>
        </header>

        {/* Main Featured Image */}
        {post.mainImage && (
          <div className="max-w-[1200px] mx-auto px-5 lg:px-8 mb-16 md:mb-24">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-[#0d1a0f]/5">
              <Image 
                src={post.mainImage} 
                alt={getValue(post.title)} 
                fill 
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover hover:scale-105 transition-transform duration-[2s]"
              />
            </div>
          </div>
        )}

        {/* Article Body Layout */}
        <div className="max-w-[1100px] mx-auto px-5 lg:px-8 flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          <aside className="hidden lg:flex flex-col gap-4 sticky top-32 h-fit shrink-0 w-12 z-10">
            <span className={`text-xs font-bold uppercase tracking-widest text-[#4a5e4d] mb-2 whitespace-nowrap ${isArabic ? "rotate-90 origin-center" : "-rotate-90 origin-left translate-y-8"}`}>
              {t.share}
            </span>
            <div className="w-[1px] h-12 bg-[#0d1a0f]/20 mx-auto mb-2" />
            
            <ShareButton platform="twitter" onClick={() => handleShare('twitter')} />
            <ShareButton platform="linkedin" onClick={() => handleShare('linkedin')} />
            <ShareButton platform="whatsapp" onClick={() => handleShare('whatsapp')} />
            <ShareButton platform="copy" onClick={() => handleShare('copy')} />
          </aside>

          <div className="flex-1 max-w-[800px]">
            {/* PORTABLE TEXT FIX: Value passed properly without double [lang] extraction */}
            {post.body && (
              <div className="article-content">
                <PortableText value={post.body || []} components={richTextComponents} />
              </div>
            )}

            <AuthorBio author={post.author} lang={lang} isArabic={isArabic} />

            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap items-center gap-3">
                <span className={`text-xs font-bold uppercase tracking-widest text-[#0d1a0f] ${isArabic ? "ms-2" : "me-2"}`}>{t.tags}</span>
                {post.tags.map(tag => (
                  <span key={tag} className="bg-white text-[#4a5e4d] text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#b5651d] hover:text-[#f5f0e8] transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Articles Grid */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="mt-24 pt-16 md:pt-24 px-5 lg:px-8">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
                <div className="flex items-stretch gap-4">
                  <div className="w-[4px] bg-[#b5651d] rounded-full shrink-0" />
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black text-[#0d1a0f] tracking-tight leading-none py-1">
                    {t.related}
                  </h2>
                </div>
                <Link href={`/${lang}/category/${post.category?.slug}`} className="hidden md:flex items-center gap-2 text-[#b5651d] text-sm font-bold uppercase tracking-widest hover:text-[#0d1a0f] transition-colors group">
                  {t.backToCategory}
                  <svg 
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" 
                    className={`w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${isArabic ? "rotate-180" : ""}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {relatedPosts.map((related, index) => (
                  <article 
                    key={related._id} 
                    className="group flex flex-col h-full animate-in fade-in slide-in-from-bottom duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Link href={`/${lang}/news/${related.slug}`} className="flex flex-col h-full outline-none">
                      <div className="relative w-full aspect-[16/11] overflow-hidden bg-white mb-5 rounded-[2rem]">
                        {related.image && (
                          <Image 
                            src={related.image} 
                            alt={getValue(related.title)} 
                            fill 
                            sizes="(max-width: 640px) 100vw, 33vw" 
                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105" 
                          />
                        )}
                        <div className="absolute inset-0 bg-[#b5651d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {related.category && (
                            <span className="text-xs text-[#b5651d] font-bold uppercase tracking-widest">
                              {getValue(related.category.title)}
                            </span>
                          )}
                          <span className="text-xs text-[#4a5e4d]">
                            {new Date(related.publishedAt).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="font-serif text-xl md:text-2xl font-bold text-[#0d1a0f] leading-snug transition-colors group-hover:text-[#b5651d]">
                          {getValue(related.title)}
                        </h3>
                        {related.excerpt && (
                          <p className="text-sm text-[#4a5e4d] mt-3 line-clamp-2 leading-relaxed">
                            {getValue(related.excerpt)}
                          </p>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <MobileShareBar url={url} title={getValue(post.title)} isArabic={isArabic} />
      <BackToTopButton />
    </>
  );
}