
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ServicePopup from "@/components/ServicePopup";

const softwareList = [
  { 
    name: "School Management", 
    icon: "🎓",
    description: "Comprehensive school management system to streamline administrative tasks, manage student records, track attendance, handle examinations, and facilitate communication between teachers, students, and parents."
  },
  { 
    name: "Restaurant Management System", 
    icon: "🍽️",
    description: "Complete restaurant management solution covering order management, inventory tracking, staff scheduling, billing, customer management, and kitchen operations to optimize your restaurant's efficiency."
  },
  { 
    name: "Digital Marketing", 
    icon: "📱",
    description: "Comprehensive digital marketing tools including social media management, email campaigns, SEO optimization, content management, analytics tracking, and automated marketing workflows to grow your online presence."
  },
  { 
    name: "E-commerce", 
    icon: "🛒",
    description: "Full-featured e-commerce platform with product management, payment processing, inventory tracking, order management, and customer support. Perfect for:<br/>• Clothing Industry/Stores<br/>• Electronic Industry/Store<br/>• Book Stores<br/>• Stationary Stores<br/>• Retailers<br/>• Whole-Sellers<br/>• All Businesses"
  },
  { name: "Manufacturing", icon: "🏭", description: "Advanced manufacturing management system for production planning, quality control, inventory management, and supply chain optimization." },
  { name: "Inventory", icon: "📦", description: "Smart inventory management system with real-time tracking, automated reordering, warehouse management, and comprehensive reporting." },
  { name: "Sales", icon: "📊", description: "Powerful sales management platform with lead tracking, pipeline management, customer relationship tools, and performance analytics." },
  { name: "HR", icon: "👥", description: "Complete human resource management system covering recruitment, employee records, payroll, performance management, and compliance tracking." },
  { name: "Dashboard", icon: "📈", description: "Interactive business intelligence dashboard with real-time analytics, custom reports, KPI tracking, and data visualization tools." },
  { name: "Purchase", icon: "💳", description: "Streamlined purchasing management system with vendor management, purchase orders, approval workflows, and budget tracking." },
  { name: "Website", icon: "🌐", description: "Professional website development service with responsive design, SEO optimization, content management, and maintenance support." },
  { name: "CRM", icon: "🤝", description: "Customer relationship management system with contact management, sales automation, marketing tools, and customer service features." },
  { name: "Field Service", icon: "🛩️", description: "Field service management solution with job scheduling, technician tracking, inventory management, and customer communication tools." },
  { name: "Planning", icon: "🗓️", description: "Project and resource planning software with task management, timeline tracking, resource allocation, and collaboration tools." },
  { name: "Helpdesk", icon: "🆘", description: "Customer support helpdesk system with ticket management, knowledge base, live chat, and performance analytics." },
  { name: "Timesheets", icon: "⏱️", description: "Time tracking and timesheet management system with project tracking, billing integration, and productivity reporting." },
  { name: "Point of Sale", icon: "🏪", description: "Modern point of sale system with inventory management, payment processing, customer management, and sales reporting." },
  { name: "Rental", icon: "🔑", description: "Rental management system for equipment, property, or vehicle rentals with booking, scheduling, and billing capabilities." },
  { name: "Accounting", icon: "💹", description: "Comprehensive accounting software with financial reporting, invoice management, expense tracking, and tax compliance features." },
  { name: "Studio", icon: "🛠️", description: "Creative studio management platform with project management, client communication, asset management, and billing tools." },
  { name: "Project", icon: "✅", description: "Project management software with task tracking, team collaboration, milestone management, and progress reporting." },
];

const FeaturedSoftwareSection = () => {
  const [selectedService, setSelectedService] = useState<typeof softwareList[0] | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleServiceClick = (service: typeof softwareList[0]) => {
    if (service.name === "Restaurant Management System") {
      window.location.href = "https://dq-redirect.vercel.app/";
      return;
    }
    setSelectedService(service);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedService(null);
  };

  return (
    <section
      className="w-full relative z-10 bg-white py-12 md:py-16"
      aria-label="Featured Services"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 text-center">
          Featured Services
        </h2>
        <p className="mx-auto text-center mb-8 text-gray-500 md:w-2/3">
          Discover our most popular solutions, tailored for every need.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5 md:gap-7 xl:gap-8 max-w-5xl mx-auto">
          {softwareList.map((item) => (
            <div
              key={item.name}
              className="
                flex flex-col items-center
                bg-muted rounded-lg shadow-card py-5 px-2
                transition-transform duration-150
                hover:scale-105 hover:shadow-lg cursor-pointer
              "
              onClick={() => handleServiceClick(item)}
            >
              <div
                className="
                  w-14 h-14 md:w-16 md:h-16 flex items-center justify-center
                  bg-white rounded-lg shadow
                  mb-3 text-3xl md:text-4xl
                  border border-gray-200
                "
                aria-label={item.name + " icon"}
              >
                {item.icon}
              </div>
              <span className="text-sm md:text-base font-medium text-gray-700 text-center">
                {item.name}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="px-8 py-4 text-base rounded-lg shadow-md text-black hover:text-black">
            <Link to="/services">Explore me</Link>
          </Button>
        </div>
      </div>

      {selectedService && (
        <ServicePopup
          isOpen={isPopupOpen}
          onClose={closePopup}
          service={selectedService}
        />
      )}
    </section>
  );
};

export default FeaturedSoftwareSection;
