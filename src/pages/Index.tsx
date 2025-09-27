
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import PricingFlexibilitySection from "@/components/PricingFlexibilitySection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactFormSection from "@/components/ContactFormSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import FeaturedSoftwareSection from "@/components/FeaturedSoftwareSection";
import ECommerceSolutionsSection from "@/components/ECommerceSolutionsSection";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Avyukt Core Technologies",
    "description": "Leading Custom Software Development Company in India specializing in ERP, CRM, HRM, Restaurant Management, E-commerce, and Mobile App Development",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "logo": "/lovable-uploads/9a295041-b715-4e21-8400-d0ea69a1e49e.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "Anshumansingh.0502280@gmail.com",
      "contactType": "customer service"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "serviceArea": {
      "@type": "Place",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Software Development Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "ERP Software Solutions",
          "description": "Customizable Enterprise Resource Planning software for complete business management"
        },
        {
          "@type": "OfferCatalog",
          "name": "CRM Systems",
          "description": "Customer Relationship Management solutions to boost sales and customer satisfaction"
        },
        {
          "@type": "OfferCatalog",
          "name": "HRM Software",
          "description": "Human Resource Management systems for employee management and payroll processing"
        },
        {
          "@type": "OfferCatalog",
          "name": "Restaurant Management System",
          "description": "Complete restaurant operations management from POS to inventory and staff management"
        },
        {
          "@type": "OfferCatalog",
          "name": "E-commerce Development",
          "description": "Full-featured online store development with payment processing and inventory management"
        },
        {
          "@type": "OfferCatalog",
          "name": "Mobile App Development",
          "description": "Custom mobile applications for iOS and Android platforms"
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Avyukt Core Technologies - Leading ERP, CRM, HRM & Restaurant Management Software Company"
        description="Get custom ERP software, CRM systems, HRM solutions, Restaurant Management, E-commerce, and Mobile App Development. Expert software development services for businesses across India."
        keywords="ERP software development, CRM systems India, HRM solutions, restaurant management software, e-commerce development, mobile app development, custom software solutions, business automation, inventory management system, retail billing software, school management system, POS systems"
        canonicalUrl={typeof window !== 'undefined' ? window.location.href : undefined}
        ogTitle="Avyukt Core Technologies - Custom Software Development Company"
        ogDescription="Transform your business with our custom ERP, CRM, HRM, and Restaurant Management solutions. Leading software development company in India."
        structuredData={structuredData}
      />
      <main id="top" className="min-h-screen bg-muted">
        {/* Header removed: Now handled globally in App.tsx */}
        <HeroSection />
        <FeaturedSoftwareSection />
        <ServicesSection />
        <HowWeWorkSection />
        <PricingFlexibilitySection />
        <ECommerceSolutionsSection />
        <WhyChooseUsSection />
        <ContactFormSection />
        <TestimonialsSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
