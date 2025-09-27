import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { sendEmail, type FormData } from "@/utils/emailService";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";

const serviceDetails = {
  "customizable-erp-software": {
    title: "Customizable ERP Software",
    shortDescription: "Complete Enterprise Resource Planning solution for business process management",
    fullDescription: `Our Customizable ERP Software is designed to streamline and integrate all your business processes into a single, unified system. From finance and accounting to inventory management and human resources, our ERP solution adapts to your unique business requirements.
    
    Perfect for businesses looking to eliminate data silos, improve operational efficiency, and make data-driven decisions. Our ERP system grows with your business and can be customized to match your specific workflows and industry requirements.`,
    features: [
      "Financial Management & Accounting",
      "Inventory & Supply Chain Management", 
      "Human Resource Management",
      "Customer Relationship Management",
      "Production Planning & Control",
      "Reporting & Analytics Dashboard",
      "Multi-location Support",
      "Role-based Access Control",
      "Custom Workflow Configuration",
      "Third-party Integration Support"
    ],
    benefits: [
      "Reduce operational costs by up to 30%",
      "Improve data accuracy and eliminate duplicate entries",
      "Real-time visibility across all business operations",
      "Streamline compliance and regulatory reporting",
      "Enhance decision-making with comprehensive analytics"
    ],
    industries: ["Manufacturing", "Retail", "Healthcare", "Construction", "Professional Services"],
    seoTitle: "Custom ERP Software Development - Enterprise Resource Planning Solutions",
    seoDescription: "Get custom ERP software tailored to your business needs. Complete enterprise resource planning solution with finance, inventory, HR, and CRM modules.",
    seoKeywords: "ERP software development, custom ERP system, enterprise resource planning, business management software, ERP implementation"
  },
  "restaurant-management-system": {
    title: "Restaurant Management System",
    shortDescription: "Complete restaurant operations management from POS to inventory and staff management",
    fullDescription: `Transform your restaurant operations with our comprehensive Restaurant Management System. Designed specifically for modern food businesses, our solution covers everything from point-of-sale transactions to kitchen management, inventory tracking, and customer engagement.
    
    Whether you operate a single restaurant, multiple locations, or a food chain, our system scales to meet your needs while maintaining the highest standards of efficiency and customer service.`,
    features: [
      "Advanced POS System with Touch Interface",
      "Kitchen Display System (KDS)",
      "Real-time Inventory Management",
      "Staff Scheduling & Payroll",
      "Table Management & Reservations",
      "Customer Loyalty Programs",
      "Menu Management & Pricing",
      "Multi-location Support",
      "Financial Reporting & Analytics",
      "Online Ordering Integration"
    ],
    benefits: [
      "Increase table turnover by 25%",
      "Reduce food waste through better inventory control",
      "Improve customer satisfaction with faster service",
      "Streamline staff management and scheduling",
      "Boost revenue with data-driven insights"
    ],
    industries: ["Restaurants", "Cafes", "Food Trucks", "Catering Services", "Hotel F&B"],
    seoTitle: "Restaurant Management Software - POS, Inventory & Staff Management",
    seoDescription: "Complete restaurant management system with POS, inventory tracking, staff scheduling, and customer management. Perfect for restaurants and food chains.",
    seoKeywords: "restaurant management software, POS system, restaurant POS, food service management, kitchen management system"
  },
  "app-development": {
    title: "Mobile & Web App Development",
    shortDescription: "Custom mobile and web application development using cutting-edge technologies",
    fullDescription: `Create powerful, user-friendly mobile and web applications that drive business growth and enhance customer engagement. Our expert development team uses the latest technologies and frameworks to build scalable, secure, and high-performance applications.
    
    From native mobile apps for iOS and Android to progressive web applications and cross-platform solutions, we deliver applications that provide exceptional user experiences across all devices and platforms.`,
    features: [
      "Native iOS & Android Development",
      "Cross-platform Solutions (React Native, Flutter)",
      "Progressive Web Applications (PWA)",
      "Custom Web Application Development",
      "API Integration & Development",
      "Cloud-based Backend Services",
      "Real-time Features & Push Notifications",
      "Offline Functionality",
      "App Store Optimization",
      "Ongoing Maintenance & Updates"
    ],
    benefits: [
      "Reach customers on their preferred platforms",
      "Increase customer engagement and retention",
      "Streamline business processes with mobile access",
      "Generate new revenue streams",
      "Improve operational efficiency"
    ],
    industries: ["E-commerce", "Healthcare", "Education", "Finance", "Entertainment"],
    seoTitle: "Mobile App Development Services - iOS, Android & Web Apps",
    seoDescription: "Professional mobile app development for iOS and Android, plus custom web applications. Expert developers using latest technologies.",
    seoKeywords: "mobile app development, iOS app development, Android app development, web app development, custom app development"
  },
  "digital-marketing": {
    title: "Digital Marketing Services",
    shortDescription: "Comprehensive digital marketing strategies to boost your online presence and drive growth",
    fullDescription: `Accelerate your business growth with our comprehensive digital marketing services. We create data-driven marketing strategies that increase brand visibility, drive qualified traffic, and convert visitors into loyal customers.
    
    Our team of digital marketing experts uses proven techniques and cutting-edge tools to deliver measurable results across all digital channels.`,
    features: [
      "Search Engine Optimization (SEO)",
      "Pay-Per-Click Advertising (PPC)",
      "Social Media Marketing & Management",
      "Content Marketing & Creation",
      "Email Marketing Campaigns",
      "Conversion Rate Optimization",
      "Analytics & Performance Tracking",
      "Brand Identity & Design",
      "Marketing Automation",
      "Influencer Marketing"
    ],
    benefits: [
      "Increase website traffic by up to 200%",
      "Improve search engine rankings",
      "Generate more qualified leads",
      "Boost brand awareness and credibility",
      "Achieve higher ROI on marketing spend"
    ],
    industries: ["E-commerce", "Healthcare", "Real Estate", "Professional Services", "Manufacturing"],
    seoTitle: "Digital Marketing Services - SEO, PPC, Social Media Marketing",
    seoDescription: "Complete digital marketing services including SEO, PPC, social media marketing, and content creation to grow your business online.",
    seoKeywords: "digital marketing services, SEO services, PPC advertising, social media marketing, online marketing"
  },
  "school-education-management": {
    title: "School & Education Management Software",
    shortDescription: "Complete education management system with student information, attendance, and communication tools",
    fullDescription: `Revolutionize educational administration with our comprehensive School & Education Management Software. Designed for schools, colleges, and educational institutions, our solution streamlines administrative processes while enhancing communication between students, teachers, and parents.
    
    From student enrollment to graduation, manage every aspect of your educational institution efficiently and effectively.`,
    features: [
      "Student Information Management System",
      "Attendance Tracking & Reporting",
      "Grade & Examination Management",
      "Fee Collection & Financial Management",
      "Timetable & Schedule Management",
      "Parent-Teacher Communication Portal",
      "Library Management System",
      "Transportation Management",
      "Online Admission Process",
      "Academic Performance Analytics"
    ],
    benefits: [
      "Reduce administrative workload by 50%",
      "Improve parent-teacher communication",
      "Enhance student performance tracking",
      "Streamline fee collection and financial reporting",
      "Better resource management and planning"
    ],
    industries: ["Schools", "Colleges", "Universities", "Training Institutes", "Coaching Centers"],
    seoTitle: "School Management Software - Student Information System",
    seoDescription: "Complete school management software with student information system, attendance tracking, grade management, and parent communication.",
    seoKeywords: "school management software, student information system, education management, school administration software"
  },
  "retail-billing-solutions": {
    title: "Retail & Billing Solutions",
    shortDescription: "Advanced retail management system with POS functionality and inventory management",
    fullDescription: `Optimize your retail operations with our comprehensive Retail & Billing Solutions. Perfect for businesses of all sizes, from small local shops to large retail chains, our system provides everything you need to manage sales, inventory, customers, and finances effectively.
    
    Experience seamless point-of-sale operations, real-time inventory tracking, and detailed business analytics that help you make informed decisions and grow your business.`,
    features: [
      "Advanced Point of Sale (POS) System",
      "Inventory Management & Stock Control",
      "Customer Management & Loyalty Programs",
      "Multi-payment Method Support",
      "Barcode Scanning & Label Printing",
      "Sales Reporting & Analytics",
      "Multi-location & Multi-store Support",
      "Staff Management & Commission Tracking",
      "Supplier Management",
      "Tax Compliance & GST Support"
    ],
    benefits: [
      "Increase sales efficiency by 40%",
      "Reduce inventory holding costs",
      "Improve customer satisfaction with faster checkout",
      "Better stock management and reorder alerts",
      "Comprehensive business insights and reporting"
    ],
    industries: ["Retail Stores", "Supermarkets", "Pharmacies", "Electronics Stores", "Fashion Outlets"],
    seoTitle: "Retail POS Software - Point of Sale & Inventory Management",
    seoDescription: "Advanced retail POS system with inventory management, billing, and customer management. Perfect for all types of retail businesses.",
    seoKeywords: "retail POS software, point of sale system, retail management software, billing software, inventory management"
  },
  "e-commerce-store": {
    title: "E-Commerce Store Development",
    shortDescription: "Full-featured e-commerce platform with payment processing and inventory management",
    fullDescription: `Launch and grow your online business with our comprehensive E-Commerce Store Development services. We create feature-rich, scalable online stores that provide exceptional shopping experiences and drive sales growth.
    
    From product catalog management to secure payment processing and customer support, our e-commerce solutions are designed to help you succeed in the competitive online marketplace.`,
    features: [
      "Custom E-commerce Website Design",
      "Mobile-Responsive Shopping Experience",
      "Secure Payment Gateway Integration",
      "Product Catalog & Inventory Management",
      "Order Management & Fulfillment",
      "Customer Account & Wishlist Features",
      "Shopping Cart & Checkout Optimization",
      "SEO-Optimized Product Pages",
      "Multi-currency & Multi-language Support",
      "Analytics & Sales Reporting"
    ],
    benefits: [
      "Reach customers 24/7 globally",
      "Increase sales with optimized shopping experience",
      "Reduce operational costs",
      "Better customer insights and targeting",
      "Scalable platform that grows with your business"
    ],
    industries: ["Fashion", "Electronics", "Books", "Stationery", "Health & Beauty"],
    seoTitle: "E-commerce Website Development - Online Store Solutions",
    seoDescription: "Professional e-commerce website development with payment processing, inventory management, and mobile optimization for online stores.",
    seoKeywords: "e-commerce development, online store development, e-commerce website, shopping cart development"
  },
  "inventory-hrm-tools": {
    title: "Inventory & HRM Tools",
    shortDescription: "Integrated solution for inventory management and human resource management",
    fullDescription: `Streamline both your inventory and human resource management with our integrated Inventory & HRM Tools. This comprehensive solution combines powerful inventory tracking capabilities with complete human resource management features, providing a unified platform for business operations.
    
    Perfect for businesses that need to manage both products and people efficiently, our integrated approach eliminates data silos and provides better oversight of your entire operation.`,
    features: [
      "Advanced Inventory Tracking & Control",
      "Employee Information Management",
      "Payroll Processing & Management",
      "Attendance & Time Tracking",
      "Performance Evaluation System",
      "Leave Management & Approvals",
      "Supplier & Vendor Management",
      "Purchase Order Management",
      "Stock Level Monitoring & Alerts",
      "HR Analytics & Reporting"
    ],
    benefits: [
      "Unified view of business operations",
      "Reduce administrative overhead",
      "Improve inventory turnover rates",
      "Streamline HR processes and compliance",
      "Better resource planning and utilization"
    ],
    industries: ["Manufacturing", "Wholesale", "Distribution", "Healthcare", "Retail"],
    seoTitle: "Inventory Management & HRM Software - Integrated Business Solution",
    seoDescription: "Complete inventory management and HRM software solution. Manage stock levels, employees, payroll, and attendance in one integrated platform.",
    seoKeywords: "inventory management software, HRM software, human resource management, stock management, payroll software"
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const service = serviceId ? serviceDetails[serviceId as keyof typeof serviceDetails] : null;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const emailData: FormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      service: service.title,
      company: formData.get('company') as string,
    };

    try {
      const success = await sendEmail(emailData);
      
      if (success) {
        setSubmitted(true);
        toast({
          title: "Thank you for your interest!",
          description: `Your inquiry about ${service.title} has been sent to Anshumansingh.0502280@gmail.com. We'll contact you within 24 hours.`,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send your message. Please try again or contact us directly at Anshumansingh.0502280@gmail.com.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again or contact us directly at Anshumansingh.0502280@gmail.com.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title={service.seoTitle}
        description={service.seoDescription}
        keywords={service.seoKeywords}
        canonicalUrl={typeof window !== 'undefined' ? window.location.href : undefined}
        ogTitle={service.title}
        ogDescription={service.shortDescription}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {service.title}
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {service.shortDescription}
                </p>
                <div className="flex items-center gap-2 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                  <span className="text-gray-600 ml-2">Trusted by 500+ businesses</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="mb-6">Get a personalized demo and see how this solution can transform your business.</p>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Free Demo
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <section>
                <h2 className="text-3xl font-bold mb-6">Overview</h2>
                <div className="prose prose-lg text-gray-700 whitespace-pre-line">
                  {service.fullDescription}
                </div>
              </section>

              {/* Features */}
              <section>
                <h2 className="text-3xl font-bold mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Benefits */}
              <section>
                <h2 className="text-3xl font-bold mb-6">Business Benefits</h2>
                <div className="space-y-4">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <span className="text-gray-700 text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Industries */}
              <section>
                <h2 className="text-3xl font-bold mb-6">Perfect For These Industries</h2>
                <div className="flex flex-wrap gap-3">
                  {service.industries.map((industry, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Contact Form Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div id="contact-form" className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-center">Get Started Today</h3>
                  <p className="text-gray-600 text-center mb-6">
                    Fill out this form to get a personalized consultation and quote.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        disabled={submitting || submitted}
                        className="mt-1"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        disabled={submitting || submitted}
                        className="mt-1"
                        placeholder="your.email@company.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        disabled={submitting || submitted}
                        className="mt-1"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        disabled={submitting || submitted}
                        className="mt-1"
                        placeholder="Your company name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Project Details *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        disabled={submitting || submitted}
                        className="mt-1"
                        placeholder="Tell us about your project requirements, timeline, and any specific features you need..."
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={submitting || submitted}
                    >
                      {submitting ? "Sending..." : submitted ? "Request Sent!" : "Get Free Consultation"}
                    </Button>
                    
                    {submitted && (
                      <div className="text-green-600 text-center text-sm mt-2">
                        We'll contact you within 24 hours!
                      </div>
                    )}
                  </form>
                  
                  <div className="mt-6 pt-6 border-t text-center text-sm text-gray-500">
                    Or email us directly at: <br />
                    <a href="mailto:Anshumansingh.0502280@gmail.com" className="text-blue-600 hover:underline">
                      Anshumansingh.0502280@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default ServiceDetail;