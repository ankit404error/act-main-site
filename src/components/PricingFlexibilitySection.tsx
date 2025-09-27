
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const PricingFlexibilitySection = () => {
  const [budgetValue, setBudgetValue] = useState([50]);

  const getBudgetRange = (value: number) => {
    if (value <= 33) return "₹10,000";
    if (value <= 66) return "₹5 Lakhs";
    return "₹10 Lakhs+";
  };

  const getFeatureLevel = (value: number) => {
    if (value <= 33) return {
      title: "Basic Features",
      description: "Core functionality"
    };
    if (value <= 66) return {
      title: "Advanced Features", 
      description: "Enhanced capabilities"
    };
    return {
      title: "Enterprise Suite",
      description: "Full-scale solution"
    };
  };

  const currentFeature = getFeatureLevel(budgetValue[0]);

  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your <span className="text-primary">Budget</span>. Our <span className="text-primary">Code</span>.
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Whether ₹10,000 or ₹10 lakhs — we shape the product to your money and your mind.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-card">
            <div className="flex justify-between items-center mb-8">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                ₹10,000
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary">
                ₹10 Lakhs+
              </div>
            </div>

            <div className="mb-12">
              <Slider
                value={budgetValue}
                onValueChange={setBudgetValue}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className={`p-6 rounded-lg transition-all ${budgetValue[0] <= 33 ? 'bg-primary/10 border-2 border-primary' : 'bg-gray-50'}`}>
                <h3 className="text-xl font-semibold mb-2">Basic Features</h3>
                <p className="text-gray-600">Core functionality</p>
              </div>
              
              <div className={`p-6 rounded-lg transition-all ${budgetValue[0] > 33 && budgetValue[0] <= 66 ? 'bg-primary/10 border-2 border-primary' : 'bg-gray-50'}`}>
                <h3 className="text-xl font-semibold mb-2">Advanced Features</h3>
                <p className="text-gray-600">Enhanced capabilities</p>
              </div>
              
              <div className={`p-6 rounded-lg transition-all ${budgetValue[0] > 66 ? 'bg-primary/10 border-2 border-primary' : 'bg-gray-50'}`}>
                <h3 className="text-xl font-semibold mb-2">Enterprise Suite</h3>
                <p className="text-gray-600">Full-scale solution</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="px-8 py-4 text-base rounded-lg shadow-md text-white font-bold bg-primary hover:bg-primary-dark"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Discuss My Budget
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingFlexibilitySection;
