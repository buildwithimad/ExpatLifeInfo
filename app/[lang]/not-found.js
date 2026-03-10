import Link from "next/link";


export default function NotFound() {
  return (
    <div className="bg-[#f5f0e8] min-h-screen flex flex-col items-center justify-center px-5 text-center selection:bg-[#b5651d] selection:text-[#f5f0e8] overflow-hidden relative">
      
      {/* Subtle Background Texture */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
          backgroundSize: "180px",
          mixBlendMode: "multiply",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <p className="text-[#b5651d] text-[0.65rem] sm:text-xs font-black tracking-[0.5em] uppercase mb-4 md:mb-6">
          Error 404
        </p>

        {/* Massive 404 Display */}
        <h1
          className="text-[#0d1a0f] leading-none tracking-[-0.04em] font-black mb-4 md:mb-8"
          style={{ 
            fontFamily: "'Georgia', 'Times New Roman', serif", 
            fontSize: "clamp(8rem, 20vw, 16rem)" 
          }}
        >
          404
        </h1>

        {/* Subtitle */}
        <h2
          className="text-[#0d1a0f] text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-6"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Page Not Found
        </h2>

        {/* Editorial Body Text */}
        <p className="text-[#4a5e4d] text-base md:text-xl leading-relaxed mb-12 font-serif italic opacity-90 px-4">
          The story or page you are looking for seems to have vanished into the archives. Let's get you back to the front page.
        </p>

        {/* Call to Action */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-[#0d1a0f] text-[#f5f0e8] px-8 py-4 sm:px-10 sm:py-5 text-xs sm:text-sm font-black uppercase tracking-[0.25em] hover:bg-[#b5651d] transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <span>Return Home</span>
          <svg 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24" 
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}