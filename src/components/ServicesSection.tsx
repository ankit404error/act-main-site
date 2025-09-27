
import { Book, Check, List, FileText, ShoppingCart, Image, Home, Smartphone, TrendingUp } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Service = {
  title: string;
  icon: ReactNode;
  description: string;
  popupDescription: string;
  link: string;
  serviceId: string;
};

const services: Service[] = [
  {
    title: "Customizable ERP Software",
    icon: <FileText className="w-8 h-8 text-primary" />,
    description:
      "An all-in-one platform to manage and automate business processes with full customization.",
    popupDescription: "Comprehensive Enterprise Resource Planning solution that integrates all your business processes into a single unified system. Manage finance, inventory, sales, purchasing, manufacturing, and human resources with complete customization to fit your unique business requirements.",
    link: "#contact",
    serviceId: "customizable-erp-software",
  },
  {
    title: "App Development",
    icon: <Smartphone className="w-8 h-8 text-primary" />,
    description:
      "Custom mobile and web application development tailored to your business needs.",
    popupDescription: "Professional mobile and web application development services using cutting-edge technologies. We create user-friendly, scalable applications for iOS, Android, and web platforms that help you reach your customers effectively and grow your business.",
    link: "#contact",
    serviceId: "app-development",
  },
  {
    title: "Digital Marketing",
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    description:
      "Comprehensive digital marketing strategies to boost your online presence and drive growth.",
    popupDescription: "Complete digital marketing solutions including SEO, social media marketing, content creation, email campaigns, PPC advertising, and analytics. We help businesses establish a strong online presence and reach their target audience effectively.",
    link: "#contact",
    serviceId: "digital-marketing",
  },
  {
    title: "Restaurant Management System",
    icon: <Home className="w-8 h-8 text-primary" />,
    description:
      "Smooth operations — from order to inventory—built for modern food businesses and chains.",
    popupDescription: "Comprehensive restaurant management solution covering POS systems, order management, inventory tracking, staff scheduling, table management, customer relationship management, and detailed reporting to streamline your restaurant operations.",
    link: "#contact",
    serviceId: "restaurant-management-system",
  },
  {
    title: "School & Education Mgmt. Software",
    icon: <Book className="w-8 h-8 text-primary" />,
    description:
      "Manage admissions, attendance, exams, and communication with easy to use tools.",
    popupDescription: "Complete education management system with student information management, attendance tracking, grade management, examination handling, fee collection, parent-teacher communication, and administrative tools for efficient school operations.",
    link: "#contact",
    serviceId: "school-education-management",
  },
  {
    title: "Retail & Billing Solutions",
    icon: <List className="w-8 h-8 text-primary" />,
    description:
      "Fast, reliable sales and billing system—ideal for retail businesses large or small.",
    popupDescription: "Advanced retail management system with point-of-sale functionality, inventory management, customer management, billing, reporting, and multi-location support. Perfect for small shops to large retail chains.",
    link: "#contact",
    serviceId: "retail-billing-solutions",
  },
  {
    title: "E-Commerce Store",
    icon: <ShoppingCart className="w-8 h-8 text-primary" />,
    description:
      "Connect your business to leading online stores and manage your digital presence.",
    popupDescription: "Full-featured e-commerce platform with product catalog management, secure payment processing, order management, customer accounts, inventory synchronization, and marketing tools. Perfect for:<br/>• Clothing Industry/Stores<br/>• Electronic Industry/Store<br/>• Book Stores<br/>• Stationary Stores<br/>• Retailers<br/>• Whole-Sellers<br/>• All Businesses",
    link: "#contact",
    serviceId: "e-commerce-store",
  },
  {
    title: "Inventory & HRM Tools",
    icon: <Check className="w-8 h-8 text-primary" />,
    description:
      "Advanced tracking for your inventory and streamlined HR management in a single suite.",
    popupDescription: "Integrated solution combining inventory management with human resource management. Track stock levels, manage suppliers, handle employee records, payroll processing, and performance management all in one comprehensive platform.",
    link: "#contact",
    serviceId: "inventory-hrm-tools",
  },
];

const ServicesSection = () => {

  return (
    <section id="services" className="bg-white py-14 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
          Our Key Services
        </h2>
        <div className="mx-auto text-center mb-8 text-gray-500 md:w-2/3">
          We provide a suite of digital solutions helping you manage, grow, and innovate your business.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 max-w-5xl mx-auto">
          {services.map((svc) => (
            <Link
              key={svc.title}
              to={`/services/${svc.serviceId}`}
              className="bg-muted rounded-2xl shadow-card hover:shadow-lg hover:scale-[1.03] transition-transform duration-150 px-6 py-7 flex flex-col gap-3 items-start animate-fade-in cursor-pointer block no-underline hover:no-underline"
              style={{ textDecoration: 'none' }}
              onClick={() => console.log('Service card clicked:', svc.title, svc.serviceId)}
            >
              <div className="mb-3">{svc.icon}</div>
              <h3 className="font-semibold text-xl mb-1 text-gray-900">
                {svc.title}
              </h3>
              <div className="text-gray-500 mb-2">{svc.description}</div>
              <div className="text-primary font-semibold group flex items-center space-x-2 mt-auto no-underline">
                <span>Learn More →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ServicesSection;
