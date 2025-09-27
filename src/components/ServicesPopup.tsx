
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServicesPopupProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
  };
}

const ServicesPopup: React.FC<ServicesPopupProps> = ({ isOpen, onClose, service }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleContinue = () => {
    onClose();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
          <div className="text-gray-600 text-sm leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: service.description }} />
          
          <Button 
            onClick={handleContinue}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-semibold"
          >
            Continue With This Service
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPopup;
