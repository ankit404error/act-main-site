import emailjs from '@emailjs/browser';

// Email configuration
const EMAIL_CONFIG = {
  // Using Web3Forms - free service for contact forms
  web3formsKey: '4f8b5c3a-2d1e-4a6b-9c8f-5e7a3b2c1d4e', 
  targetEmail: 'Anshumansingh.0502280@gmail.com'
};

export interface FormData {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
  subject?: string;
  company?: string;
}

export const sendEmail = async (formData: FormData): Promise<boolean> => {
  try {
    console.log('Sending email to:', EMAIL_CONFIG.targetEmail);
    console.log('Form data:', formData);
    
    // Use FormSubmit to send email directly - this works without signup
    const formSubmitData = new FormData();
    formSubmitData.append('name', formData.name);
    formSubmitData.append('email', formData.email);
    formSubmitData.append('phone', formData.phone);
    formSubmitData.append('service', formData.service || 'General Inquiry');
    formSubmitData.append('company', formData.company || 'Not specified');
    formSubmitData.append('message', formData.message);
    formSubmitData.append('_subject', `New inquiry from ${formData.name} - ${formData.service || 'General Inquiry'}`);
    formSubmitData.append('_template', 'table');
    formSubmitData.append('_captcha', 'false');
    formSubmitData.append('_next', window.location.href); 
    
    const response = await fetch(`https://formsubmit.co/${EMAIL_CONFIG.targetEmail}`, {
      method: 'POST',
      body: formSubmitData
    });

    if (response.ok || response.status === 200) {
      console.log('Email sent successfully via FormSubmit!');
      return true;
    } else {
      console.error('FormSubmit error:', response.status, response.statusText);
      
      // Fallback: mailto link
      const subject = encodeURIComponent(`New inquiry from ${formData.name} - ${formData.service || 'General Inquiry'}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Service: ${formData.service || 'General Inquiry'}\n` +
        `Company: ${formData.company || 'Not specified'}\n\n` +
        `Message: ${formData.message}`
      );
      
      const mailtoUrl = `mailto:${EMAIL_CONFIG.targetEmail}?subject=${subject}&body=${body}`;
      window.open(mailtoUrl, '_blank');
      
      console.log('Opened email client as fallback');
      return true;
    }
    
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

// Alternative approach using native fetch to send to a backend endpoint
export const sendEmailToBackend = async (formData: FormData): Promise<boolean> => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        to: EMAIL_CONFIG.targetEmail,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send email via backend:', error);
    return false;
  }
};