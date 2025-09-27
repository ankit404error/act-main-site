import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import React from "react";
import ContactFormDialog from "@/components/ContactFormDialog";
import Footer from "@/components/Footer";

const contactNumbers = [
  { region: "Support", phone: "9555054886" },
  { region: "Sales", phone: "9129560445" },
];

const ContactUs = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="container mx-auto px-4 pt-10 pb-6 md:pt-16 md:pb-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Need help?
          <span className="block h-2 mt-[-12px] w-32 bg-accent rounded-full"></span>
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 max-w-2xl">
          <div className="flex-1 w-full flex items-center rounded-md border bg-white shadow-sm px-2">
            <Input
              className="border-0 outline-none focus:ring-0 focus:border-0 text-base py-4 px-2"
              placeholder="Ask Avyukt AI"
            />
            <Send className="ml-2 text-muted-foreground size-6" />
          </div>
          <div className="text-sm text-muted-foreground my-2 sm:my-0">or</div>
          <ContactFormDialog
            trigger={
              <Button
                variant="secondary"
                className="bg-purple-700 text-white font-semibold px-5 py-2 hover:bg-purple-800"
              >
                Submit a Ticket
              </Button>
            }
            formType="Support Ticket"
            title="Submit a Support Ticket"
            description="Describe the issue you're experiencing and our support team will help you resolve it quickly."
          />
        </div>
      </section>
      {/* Contact section */}
      <section
        className="bg-muted py-12 md:py-20 px-4"
        style={{
          borderTopLeftRadius: "8% 10vw",
          borderTopRightRadius: "8% 10vw",
        }}
        id="contact"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 flex items-end gap-2">
            <span className="font-script text-4xl sm:text-5xl" style={{ fontFamily: "cursive" }}>
              Contact us
            </span>
            <span className="block h-1 w-20 bg-yellow-400 rounded-full mb-2"></span>
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left: Buttons */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 md:mb-0">
              <div className="p-6 rounded-lg bg-white shadow hover:shadow-lg transition">
                <ContactFormDialog
                  trigger={
                    <Button variant="ghost" className="text-accent font-semibold w-full flex justify-between items-center">
                      Meet an advisor
                      <svg className="ml-2" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                    </Button>
                  }
                  formType="Advisory Meeting"
                  title="Schedule a Meeting with an Advisor"
                  description="Book a consultation with our experienced advisors to discuss your project requirements and get expert guidance."
                />
              </div>
              <div className="p-6 rounded-lg bg-white shadow hover:shadow-lg transition">
                <ContactFormDialog
                  trigger={
                    <Button variant="ghost" className="text-accent font-semibold w-full">
                      Request developments
                    </Button>
                  }
                  formType="Development Request"
                  title="Request Custom Development"
                  description="Tell us about your custom software development needs and we'll create a tailored solution for your business."
                />
              </div>
              <div className="p-6 rounded-lg bg-white shadow hover:shadow-lg transition">
                <ContactFormDialog
                  trigger={
                    <Button variant="ghost" className="text-accent font-semibold w-full">
                      Become a partner
                    </Button>
                  }
                  formType="Partnership"
                  title="Partner with Avyukt Core Technology"
                  description="Join our partner network and explore collaboration opportunities. Let's grow together!"
                />
              </div>
              <div className="p-6 rounded-lg bg-white shadow hover:shadow-lg transition">
                <ContactFormDialog
                  trigger={
                    <Button variant="ghost" className="text-accent font-semibold w-full">
                      Report a bug
                    </Button>
                  }
                  formType="Bug Report"
                  title="Report a Bug"
                  description="Found a bug in our software? Report it here and our technical team will investigate and fix it promptly."
                />
              </div>
            </div>
            {/* Right: Contact info */}
            <div className="flex-shrink-0 min-w-[230px] bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-lg mb-2">Call us</h3>
              <ul className="text-gray-700 text-sm space-y-1">
                {contactNumbers.map((c) => (
                  <li key={c.region} className="flex justify-between">
                    <span>{c.region}</span>
                    <span className="font-mono">{c.phone}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ContactUs;
