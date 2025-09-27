
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import ContactFormDialog from "@/components/ContactFormDialog";

const ECommerceSolutionsSection = () => {
  return (
    <section className="py-14 md:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Text (left) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Custom Software &{" "}
            <span className="text-blue-600">E-Commerce</span>, Just the Way You Want.
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            <span className="font-semibold text-accent">ACT</span> delivers powerful solutions — built from scratch, within your budget, with the exact features you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <ContactFormDialog
              trigger={
                <Button className="px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700">
                  Build My Software
                </Button>
              }
              formType="Development Request"
              title="Request Custom Development"
              description="Tell us about your custom software development needs and we'll create a tailored solution for your business."
            />
            <ContactFormDialog
              trigger={
                <Button variant="outline" className="px-8 py-3 text-lg font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                  Launch My Online Store
                </Button>
              }
              formType="Development Request"
              title="Request E-Commerce Development"
              description="Let us build your dream online store with custom features, payments, product showcase, tracking, and more."
            />
          </div>
        </div>
        
        {/* Visual (right) */}
        <div className="w-full lg:w-1/2 flex justify-center relative">
          {/* Browser mockup */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 w-full max-w-md transform rotate-3 hover:rotate-0 transition-transform duration-300">
            {/* Browser header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="flex-1 bg-blue-600 h-2 rounded ml-4"></div>
            </div>
            
            {/* Content area */}
            <div className="space-y-4">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              
              {/* Product grid mockup */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-blue-100 rounded-lg h-16"></div>
                <div className="bg-purple-100 rounded-lg h-16"></div>
              </div>
            </div>
          </div>
          
          {/* Message box */}
          <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg animate-bounce">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ECommerceSolutionsSection;
