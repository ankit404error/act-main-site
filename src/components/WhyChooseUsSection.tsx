
import { Check, FileText, Book, Home, List } from "lucide-react";

const benefits = [
  {
    title: "Custom-Fit Solutions",
    desc: "Tailored to fit your unique business processes, no matter the industry.",
    icon: <FileText className="w-6 h-6 text-primary" />,
  },
  {
    title: "Cloud-Integrated",
    desc: "Access your software securely from anywhere with real-time updates.",
    icon: <Home className="w-6 h-6 text-primary" />,
  },
  {
    title: "Reliable Support",
    desc: "Ongoing support & upgrades from our expert team, whenever you need us.",
    icon: <Check className="w-6 h-6 text-primary" />,
  },
  {
    title: "User-Friendly",
    desc: "Intuitive design—even non-tech users will feel right at home.",
    icon: <Book className="w-6 h-6 text-primary" />,
  },
  {
    title: "Industry Expertise",
    desc: "Serving retail, hospitality, education, healthcare & more.",
    icon: <List className="w-6 h-6 text-primary" />,
  },
];

const quotes = [
  {
    quote: "“The system is so easy, our staff learned it in days!”",
    client: "V. Gupta, Star Dine Café",
  },
  {
    quote: "“Support is always reliable and solutions actually scale with us.”",
    client: "P. Sharma, Elixir Retail",
  },
];

const WhyChooseUsSection = () => (
  <section className="bg-muted py-14 md:py-20">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
        Why Choose Avyukt Core Technology?
      </h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto mt-10">
        {benefits.map((b) => (
          <div key={b.title} className="bg-white rounded-xl p-5 shadow-card flex items-start gap-4 animate-fade-in">
            <div className="mt-2">{b.icon}</div>
            <div>
              <div className="font-semibold text-lg text-gray-900">{b.title}</div>
              <div className="text-gray-500">{b.desc}</div>
            </div>
          </div>
        ))}
        <div className="flex flex-col justify-between gap-4">
          {quotes.map((q) => (
            <div key={q.client} className="bg-primary-light text-primary-dark rounded-lg px-5 py-4 mt-3 animate-fade-in">
              <div className="italic mb-2"> {q.quote}</div>
              <div className="font-semibold text-right">– {q.client}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUsSection;
