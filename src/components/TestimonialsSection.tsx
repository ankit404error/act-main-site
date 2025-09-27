
const testimonials = [
  {
    text: "Avyukt's ERP transformed our operations—it's fast, intuitive, and their support is top notch.",
    user: "R. Singh",
    company: "Maple Manufacturing",
    software: "ERP Software",
  },
  {
    text: "The restaurant system is so easy to use and helped us streamline billing and inventory completely.",
    user: "Anjali Menon",
    company: "Urban Eatery",
    software: "Restaurant Management",
  },
  {
    text: "They built a school platform that even our non-technical staff can manage confidently.",
    user: "Deepa S.",
    company: "SunRise Academy",
    software: "Education Management",
  },
];

const TestimonialsSection = () => (
  <section className="bg-muted py-12 md:py-16">
    {/* <div className="container mx-auto px-4 max-w-5xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        What Our Clients Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="relative bg-white rounded-2xl shadow-card px-7 py-7 flex flex-col gap-4 animate-fade-in hover:shadow-lg transition-shadow"
            style={{ animationDelay: `${i * 100}ms` } as any}
          >
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="w-7 h-7 text-primary"
            >
              <text x="0" y="24" fontSize="28" fill="#7b2ff2" fontWeight="bold">
                “
              </text>
            </svg>
            <div className="italic text-[17.5px] mb-2">"{t.text}"</div>
            <div>
              <div className="font-semibold">{t.user}</div>
              <div className="text-gray-500">{t.company} · {t.software}</div>
            </div>
          </div>
        ))}
      </div>
    </div> */}
  </section>
);

export default TestimonialsSection;
