import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const softwares = [
  {
    name: "Customizable ERP Software",
    description:
      "An all-in-one platform to manage and automate business processes with full customization.",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&q=80",
    learnMore: "/services/customizable-erp-software",
    serviceId: "customizable-erp-software",
  },
  {
    name: "Restaurant Management System",
    description:
      "Smooth operations — from order to inventory—built for modern food businesses and chains.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    learnMore: "/services/restaurant-management-system",
    serviceId: "restaurant-management-system",
  },
  {
    name: "School & Education Mgmt. Software",
    description:
      "Manage admissions, attendance, exams, communication and more, with easy to use tools.",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
    learnMore: "/services/school-education-management",
    serviceId: "school-education-management",
  },
  {
    name: "Retail & Billing Solutions",
    description:
      "Fast, reliable sales and billing system—ideal for retail businesses large or small.",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80",
    learnMore: "/services/retail-billing-solutions",
    serviceId: "retail-billing-solutions",
  },
  {
    name: "E-Commerce Store Development",
    description:
      "Full-featured e-commerce platform with payment processing and inventory management.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    learnMore: "/services/e-commerce-store",
    serviceId: "e-commerce-store",
  },
  {
    name: "Mobile & Web App Development",
    description:
      "Custom mobile and web application development tailored to your business needs.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
    learnMore: "/services/app-development",
    serviceId: "app-development",
  },
  {
    name: "Digital Marketing Services",
    description:
      "Comprehensive digital marketing strategies to boost your online presence and drive growth.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    learnMore: "/services/digital-marketing",
    serviceId: "digital-marketing",
  },
  {
    name: "Inventory & HRM Tools",
    description:
      "Advanced tracking for your inventory and streamlined HR management in a single suite.",
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
    learnMore: "/services/inventory-hrm-tools",
    serviceId: "inventory-hrm-tools",
  },
];

const Services = () => {
  return (
    <main className="min-h-screen bg-muted pb-16">
      <section className="bg-gradient-to-r from-primary/30 to-accent/20 py-14 md:py-20 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Our Software Products & Solutions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            From ERP to Retail, discover our range of powerful business software.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {softwares.map((sw, idx) => (
            <div
              key={sw.name}
              className="flex flex-col md:flex-row bg-white rounded-xl shadow-card hover:shadow-lg overflow-hidden group animate-fade-in"
            >
              <img
                src={sw.image}
                alt={sw.name}
                className="w-full md:w-60 h-56 object-cover transition-all duration-200 group-hover:scale-105"
                loading="lazy"
              />
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-primary mb-2">{sw.name}</h2>
                  <p className="mb-4 text-gray-600">{sw.description}</p>
                </div>
                <div>
                  <Link
                    to={sw.learnMore}
                    onClick={() => console.log('Services page Learn More clicked:', sw.name, sw.learnMore)}
                    className="inline-block bg-primary px-4 py-2 rounded font-semibold text-white hover:bg-primary-dark transition"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;
