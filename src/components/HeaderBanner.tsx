import Image from "next/image";

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
  ];
  return (
    <section className="relative bg-blue-500 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <h1 className="text-3xl md:text-4xl font-bold">Patient Directory</h1>
        <p className="text-lg">1000 Patient Found</p>
      </div>
      {/* Decorative vector placeholders on the right */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-6">
        <div className="relative w-[520px] h-[140px] hidden sm:block">
          {vectors.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              width={48}
              height={48}
              className="absolute opacity-70"
              style={{
                top: `${10 + (i % 3) * 36}px`,
                left: `${i * 44 - 40}px`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
