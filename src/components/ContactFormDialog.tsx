
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { sendEmail } from "@/utils/emailService";

interface ContactFormDialogProps {
  trigger: React.ReactNode;
  formType: string;
  title: string;
  description: string;
}

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  message?: string;
}

const ContactFormDialog = ({ trigger, formType, title, description }: ContactFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    
    const emailData = {
      name: data.fullName,
      email: data.email,
      phone: data.phoneNumber,
      message: data.message || `Interest in ${formType}`,
      service: formType,
    };

    try {
      const success = await sendEmail(emailData);
      
      if (success) {
        setOpen(false);
        form.reset();
        toast({
          title: "Thank you for reaching out!",
          description: "Your message has been sent to Anshumansingh.0502280@gmail.com. Our team will get in touch with you shortly.",
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-blue-800">{title}</DialogTitle>
          <DialogDescription className="text-base text-blue-700">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              rules={{ required: "Full name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-blue-800">Full Name *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Enter your full name"
                      disabled={submitting}
                      className="h-11 bg-white border-blue-300 focus:border-blue-800 focus:ring-blue-800 text-blue-800 placeholder:text-blue-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              rules={{ 
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9+\-\s()]{7,15}$/,
                  message: "Please enter a valid phone number"
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-blue-800">Phone Number *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="tel"
                      placeholder="Enter your phone number"
                      disabled={submitting}
                      className="h-11 bg-white border-blue-300 focus:border-blue-800 focus:ring-blue-800 text-blue-800 placeholder:text-blue-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              rules={{ 
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address"
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-blue-800">Email Address *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="email"
                      placeholder="Enter your email address"
                      disabled={submitting}
                      className="h-11 bg-white border-blue-300 focus:border-blue-800 focus:ring-blue-800 text-blue-800 placeholder:text-blue-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-blue-800">Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={4} 
                      placeholder="Tell us more about your requirements or any questions you have..."
                      disabled={submitting}
                      className="bg-white border-blue-300 focus:border-blue-800 focus:ring-blue-800 resize-none text-blue-800 placeholder:text-blue-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border-t border-blue-200 pt-4">
              <p className="text-sm text-blue-700 mb-4 leading-relaxed">
                We'd love to hear from you! Fill out the form below and our team will get in touch with you shortly.
              </p>
              
              <div className="flex justify-end space-x-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                  disabled={submitting}
                  className="px-6 border-blue-300 text-blue-800 hover:bg-blue-50"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="min-w-[140px] bg-blue-800 hover:bg-blue-900 text-white"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
