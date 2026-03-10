import Image from "next/image";
import Link from "next/link";

export default function BlogList({ posts, total, lang, currentPage, postsPerPage }) {
  const totalPages = Math.ceil(total / postsPerPage);
  const isArabic = lang === "ar";

  const t = {
    title: isArabic ? "جميع المقالات" : "All Articles",
    subtitle: isArabic ? "أحدث الأخبار والأدلة والرؤى" : "The latest news, guides, and insights",
    articles: isArabic ? "مقالة" : "Articles",
    page: isArabic ? "صفحة" : "Page",
    of: isArabic ? "من" : "of",
    readMore: isArabic ? "اقرأ المزيد" : "Read Story",
    noImage: isArabic ? "لا توجد صورة" : "No Image",
    empty: isArabic ? "لا توجد مقالات بعد..." : "No articles published yet...",
    prev: isArabic ? "السابق" : "Previous",
    next: isArabic ? "التالي" : "Next"
  };

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="bg-[#fafaf8] min-h-screen pb-24">
      
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="pt-24 md:pt-32 pb-16 px-5 lg:px-8 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 md:w-12 h-[2px] bg-[#b5651d]" />
          <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#b5651d]">
            Index
          </span>
        </div>
        <h1 
          className="text-[#0d1a0f] font-black leading-tight tracking-[-0.02em] mb-4"
          style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
        >
          {t.title}
        </h1>
        <p className="text-[#4a5e4d] text-lg md:text-xl max-w-2xl">
          {t.subtitle}
        </p>
      </header>

      {/* ── Main Grid Area ─────────────────────────────────── */}
      <main className="max-w-[1400px] mx-auto px-5 lg:px-8">
        
        {/* Meta bar */}
        <div className="flex items-baseline justify-between mb-12 pb-4 border-b-2 border-[#0d1a0f]">
          <span className="text-[0.65rem] text-[#0d1a0f]/50 font-black tracking-[0.3em] uppercase">
            {total} {t.articles}
          </span>
          <span className="text-[0.65rem] text-[#0d1a0f]/40 font-bold tracking-widest uppercase">
            {t.page} {currentPage} {t.of} {totalPages}
          </span>
        </div>

        {/* Empty State */}
        {posts.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-[#4a5e4d] text-2xl md:text-3xl italic font-serif">
              {t.empty}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {posts.map((post) => (
              <article key={post._id} className="group flex flex-col h-full">
                <Link href={`/${lang}/blog/${post.slug || ""}`} className="flex flex-col h-full outline-none">
                  
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e3da] mb-6 rounded-2xl">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title || ""}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-[1200ms] ease-in-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#0d1a0f]/20 text-[0.6rem] font-bold uppercase tracking-widest">
                        {t.noImage}
                      </div>
                    )}
                  </div>

                  {/* Date & Category */}
                  <div className="flex items-center gap-3 mb-3">
                    {post.categoryTitle && (
                      <span className="text-[#b5651d] text-[0.6rem] font-black uppercase tracking-[0.2em]">
                        {post.categoryTitle}
                      </span>
                    )}
                    <span className="text-[#0d1a0f]/40 text-[0.6rem] font-black uppercase tracking-[0.25em]">
                      {new Date(post.publishedAt).toLocaleDateString(isArabic ? "ar-SA" : "en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 
                    className="text-[#0d1a0f] font-black leading-[1.2] tracking-[-0.01em] mb-3 group-hover:text-[#b5651d] transition-colors duration-300"
                    style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(1.2rem, 1.8vw, 1.4rem)" }}
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[#4a5e4d]/70 text-sm leading-relaxed line-clamp-3 mb-5">
                    {post.excerpt}
                  </p>

                  {/* CTA */}
                  <div className="mt-auto flex items-center gap-1.5 text-[#0d1a0f] text-[0.6rem] font-black uppercase tracking-[0.3em] group-hover:text-[#b5651d] transition-colors duration-300">
                    {t.readMore}
                    <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 inline-block">
                      {isArabic ? "←" : "→"}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* ── Pagination ───────────────────────────────── */}
        {totalPages > 1 && (
          <div className="mt-24 pt-10 border-t-2 border-[#0d1a0f]/10 flex items-center justify-between">
            {/* Prev */}
            <div className="w-24">
              {currentPage > 1 && (
                <Link
                  href={`/${lang}/blog?page=${currentPage - 1}`}
                  className="inline-flex items-center gap-3 text-[0.65rem] font-black uppercase tracking-[0.3em] text-[#0d1a0f] hover:text-[#b5651d] transition-colors duration-300 group"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 inline-block">
                    {isArabic ? "→" : "←"}
                  </span>
                  <span className="hidden sm:inline">{t.prev}</span>
                </Link>
              )}
            </div>

            {/* Numbers */}
            <div className="flex items-center gap-1 sm:gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = currentPage === pageNum;
                const isNear = pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - currentPage) <= 1;

                if (!isNear) {
                  if (pageNum === 2 || pageNum === totalPages - 1) {
                    return <span key={pageNum} className="w-6 sm:w-8 text-center text-[#0d1a0f]/30 text-xs sm:text-sm font-bold">…</span>;
                  }
                  return null;
                }

                return (
                  <Link
                    key={pageNum}
                    href={`/${lang}/blog?page=${pageNum}`}
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-black transition-all duration-200 rounded-full ${
                      isActive ? "bg-[#0d1a0f] text-[#f5f0e8]" : "text-[#0d1a0f]/60 hover:bg-[#0d1a0f]/5 hover:text-[#0d1a0f]"
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>

            {/* Next */}
            <div className="w-24 flex justify-end">
              {currentPage < totalPages && (
                <Link
                  href={`/${lang}/blog?page=${currentPage + 1}`}
                  className="inline-flex items-center gap-3 text-[0.65rem] font-black uppercase tracking-[0.3em] text-[#0d1a0f] hover:text-[#b5651d] transition-colors duration-300 group"
                >
                  <span className="hidden sm:inline">{t.next}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 inline-block">
                    {isArabic ? "←" : "→"}
                  </span>
                </Link>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}