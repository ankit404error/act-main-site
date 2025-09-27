
const HowWeWorkSection = () => {
  const steps = [
    {
      number: "01",
      title: "You Share Idea & Budget",
      description: "Tell us your vision and budget constraints"
    },
    {
      number: "02", 
      title: "We Propose a Plan",
      description: "Get a detailed roadmap and timeline"
    },
    {
      number: "03",
      title: "We Develop & Demo", 
      description: "Watch your software come to life"
    },
    {
      number: "04",
      title: "You Launch It to the World",
      description: "Go live with full support and training"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="text-center relative">
              {/* Step Number */}
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">{step.number}</span>
              </div>
              
              {/* Connecting Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-primary/20 transform translate-x-8"></div>
              )}
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
