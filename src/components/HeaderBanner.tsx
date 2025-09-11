import Image from "next/image";

/**
 * HeaderBanner
 * Static banner for the directory with decorative right-side vectors.
 * Positions are precomputed to avoid SSR/CSR mismatch.
 */

export default function HeaderBanner() {
  const vectors = [
    "/images/Vector-1.png",
    "/images/Vector-2.png",
    "/images/Vector-3.png",
    "/images/Vector-4.png",
    "/images/Vector-5.png",
    "/images/Vector-6.png",
    "/images/Vector-7.png",
    "/images/Vector-8.png",
    "/images/Vector-9.png",
    "/images/Vector-10.png",
    "/images/Vector-11.png",
    "/images/Vector-12.png",
    "/images/Vector-13.png",
    "/images/Vector-14.png",
    "/images/Vector-15.png",
    "/images/Vector-16.png",
    "/images/Vector-17.png",
    "/images/Vector-18.png",
    "/images/Vector-19.png",
    "/images/Vector-20.png",
  ];

  // Pre-calculated positions to avoid hydration mismatch
  const positions = [
    { top: 15, left: 50 },
    { top: 45, left: 120 },
    { top: 75, left: 190 },
    { top: 25, left: 260 },
    { top: 55, left: 330 },
    { top: 85, left: 400 },
    { top: 35, left: 470 },
    { top: 65, left: 540 },
    { top: 20, left: 610 },
    { top: 80, left: 680 },
    { top: 40, left: 750 },
    { top: 70, left: 60 },
    { top: 30, left: 130 },
    { top: 60, left: 200 },
    { top: 90, left: 270 },
    { top: 10, left: 340 },
    { top: 50, left: 410 },
    { top: 80, left: 480 },
    { top: 20, left: 550 },
    { top: 70, left: 620 },
  ];

  return (
    <section className="relative bg-blue-500 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <h1 className="text-3xl md:text-4xl font-bold">Patient Directory</h1>
        <p className="text-lg">1000 Patient Found</p>
      </div>
      {/* Decorative vector placeholders on the right */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-6">
        <div className="relative w-[800px] h-[160px] hidden sm:block">
          {vectors.map((src, i) => (
            <Image
              key={`${src}-${i}`}
              src={src}
              alt=""
              width={32}
              height={32}
              className="absolute opacity-60"
              style={{
                top: `${positions[i]?.top || 20}px`,
                left: `${positions[i]?.left || 50}px`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
