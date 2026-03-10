import { getCategoryPageData } from "@/services/categoriesServices";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params, searchParams }) {
  const { lang, slug } = await params;
  const sParams = await searchParams;

  const POSTS_PER_PAGE = 16;
  const currentPage = parseInt(sParams?.page) || 1;

  const { category, postsData } = await getCategoryPageData(
    slug,
    lang,
    currentPage,
    POSTS_PER_PAGE
  );

  if (!category) notFound();

  const { posts, total } = postsData;
  const totalPages = Math.ceil(total / POSTS_PER_PAGE);
  const isArabic = lang === "ar";

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="bg-[#fafaf8] min-h-screen">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative h-[48vh] min-h-[380px] w-full bg-[#0d1a0f] overflow-hidden flex items-end">
        {category.image && (
          <Image
            src={category.image}
            alt={typeof category.title === "string" ? category.title : "Category"}
            fill
            priority
            className="object-cover opacity-25"
          />
        )}

        {/* Fine-grain overlay for texture — pure CSS, no blur */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
            backgroundSize: "180px",
            mixBlendMode: "overlay",
          }}
        />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 lg:px-8 pb-12">
          {/* Eyebrow */}
          <p className="text-[#d4843e] text-[0.65rem] font-black tracking-[0.5em] uppercase mb-4">
            {isArabic ? "استكشاف التصنيف" : "Explore Category"}
          </p>

          {/* Title */}
          <h1
            className="text-[#f5f0e8] leading-[0.92] tracking-[-0.03em] font-black"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
            }}
          >
            {typeof category.title === "string" ? category.title : ""}
          </h1>
        </div>
      </section>

      {/* ── Main ─────────────────────────────────────────── */}
      <main className="max-w-[1400px] mx-auto py-16 px-5 lg:px-8">

        {/* Meta bar */}
        <div className="flex items-baseline justify-between mb-14 pb-4 border-b-2 border-[#0d1a0f]">
          <span className="text-[0.65rem] text-[#0d1a0f]/50 font-black tracking-[0.3em] uppercase">
            {isArabic
              ? `${total} مقالة`
              : `${total} Article${total !== 1 ? "s" : ""}`}
          </span>
          <span className="text-[0.65rem] text-[#0d1a0f]/40 font-bold tracking-widest uppercase">
            {isArabic
              ? `صفحة ${currentPage} من ${totalPages}`
              : `Page ${currentPage} of ${totalPages}`}
          </span>
        </div>

        {/* ── Empty state ──────────────────────────────── */}
        {posts.length === 0 ? (
          <div className="py-40 text-center">
            <p
              className="text-[#4a5e4d] text-3xl italic"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {isArabic ? "المحتوى قادم قريباً…" : "Fresh content is on the way…"}
            </p>
          </div>
        ) : (
          <>
            {/* ── Featured first post ───────────────────── */}
            {currentPage === 1 && posts[0] && (
              <article className="group mb-20">
                <Link
                  href={`/${lang}/news/${posts[0].slug || ""}`}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 outline-none"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#e8e3da]">
                    {posts[0].image ? (
                      <Image
                        src={posts[0].image}
                        alt={typeof posts[0].title === "string" ? posts[0].title : ""}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-[1200ms] ease-in-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#0d1a0f]/20 text-[0.6rem] font-bold uppercase tracking-widest">
                        {isArabic ? "لا توجد صورة" : "No Image"}
                      </div>
                    )}
                    {/* "Featured" tag */}
                    <span className="absolute top-5 left-5 bg-[#b5651d] text-white text-[0.6rem] font-black uppercase tracking-[0.3em] px-3 py-1.5">
                      {isArabic ? "مميز" : "Featured"}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="flex flex-col justify-center">
                    <p className="text-[#b5651d] text-[0.65rem] font-black uppercase tracking-[0.3em] mb-5">
                      {new Date(posts[0].publishedAt).toLocaleDateString(
                        isArabic ? "ar-SA" : "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </p>
                    <h2
                      className="text-[#0d1a0f] leading-[1.1] tracking-[-0.02em] font-black mb-6 group-hover:text-[#b5651d] transition-colors duration-300"
                      style={{
                        fontFamily: "'Georgia', serif",
                        fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                      }}
                    >
                      {typeof posts[0].title === "string" ? posts[0].title : ""}
                    </h2>
                    <p className="text-[#4a5e4d]/80 text-base leading-relaxed line-clamp-4 mb-8">
                      {typeof posts[0].excerpt === "string" ? posts[0].excerpt : ""}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[#0d1a0f] text-[0.65rem] font-black uppercase tracking-[0.3em] group-hover:text-[#b5651d] transition-colors duration-300">
                      {isArabic ? "اقرأ المزيد" : "Read Full Story"}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        {isArabic ? "←" : "→"}
                      </span>
                    </span>
                  </div>
                </Link>
              </article>
            )}

            {/* Divider before grid */}
            {currentPage === 1 && posts.length > 1 && (
              <div className="w-full h-px bg-[#0d1a0f]/10 mb-20" />
            )}

            {/* ── Article Grid ──────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
              {(currentPage === 1 ? posts.slice(1) : posts).map((post) => (
                <article key={post._id} className="group flex flex-col">
                  <Link
                    href={`/${lang}/news/${post.slug || ""}`}
                    className="flex flex-col h-full outline-none"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e3da] mb-6">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={typeof post.title === "string" ? post.title : ""}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-[1200ms] ease-in-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#0d1a0f]/20 text-[0.6rem] font-bold uppercase tracking-widest">
                          {isArabic ? "لا توجد صورة" : "No Image"}
                        </div>
                      )}
                    </div>

                    {/* Date */}
                    <p className="text-[#b5651d] text-[0.6rem] font-black uppercase tracking-[0.25em] mb-3">
                      {new Date(post.publishedAt).toLocaleDateString(
                        isArabic ? "ar-SA" : "en-US",
                        { year: "numeric", month: "short", day: "numeric" }
                      )}
                    </p>

                    {/* Title */}
                    <h3
                      className="text-[#0d1a0f] font-black leading-[1.15] tracking-[-0.01em] mb-3 group-hover:text-[#b5651d] transition-colors duration-300"
                      style={{
                        fontFamily: "'Georgia', serif",
                        fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                      }}
                    >
                      {typeof post.title === "string" ? post.title : ""}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[#4a5e4d]/70 text-sm leading-relaxed line-clamp-3 mb-5">
                      {typeof post.excerpt === "string" ? post.excerpt : ""}
                    </p>

                    {/* CTA */}
                    <div className="mt-auto flex items-center gap-1.5 text-[#0d1a0f] text-[0.6rem] font-black uppercase tracking-[0.3em] group-hover:text-[#b5651d] transition-colors duration-300">
                      {isArabic ? "اقرأ المزيد" : "Read Story"}
                      <span className="transition-transform duration-300 group-hover:translate-x-1 inline-block">
                        {isArabic ? "←" : "→"}
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </>
        )}

        {/* ── Pagination ───────────────────────────────── */}
        {totalPages > 1 && (
          <div className="mt-28 pt-12 border-t-2 border-[#0d1a0f] flex items-center justify-between">
            {/* Prev */}
            <div>
              {currentPage > 1 ? (
                <Link
                  href={`/${lang}/category/${slug}?page=${currentPage - 1}`}
                  className="inline-flex items-center gap-3 text-[0.65rem] font-black uppercase tracking-[0.3em] text-[#0d1a0f] hover:text-[#b5651d] transition-colors duration-300 group"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-x-1 inline-block">←</span>
                  {isArabic ? "السابق" : "Previous"}
                </Link>
              ) : (
                <span />
              )}
            </div>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = currentPage === pageNum;
                const isNear =
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  Math.abs(pageNum - currentPage) <= 1;

                if (!isNear) {
                  if (pageNum === 2 || pageNum === totalPages - 1) {
                    return (
                      <span key={pageNum} className="w-8 text-center text-[#0d1a0f]/30 text-sm font-bold">
                        …
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <Link
                    key={pageNum}
                    href={`/${lang}/category/${slug}?page=${pageNum}`}
                    className={`w-10 h-10 flex items-center justify-center text-sm font-black transition-all duration-200 ${
                      isActive
                        ? "bg-[#0d1a0f] text-[#f5f0e8]"
                        : "text-[#0d1a0f]/60 hover:text-[#0d1a0f]"
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>

            {/* Next */}
            <div>
              {currentPage < totalPages ? (
                <Link
                  href={`/${lang}/category/${slug}?page=${currentPage + 1}`}
                  className="inline-flex items-center gap-3 text-[0.65rem] font-black uppercase tracking-[0.3em] text-[#0d1a0f] hover:text-[#b5651d] transition-colors duration-300 group"
                >
                  {isArabic ? "التالي" : "Next"}
                  <span className="transition-transform duration-300 group-hover:translate-x-1 inline-block">→</span>
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}