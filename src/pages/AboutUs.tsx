
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <main className="min-h-screen bg-muted">
      <section className="bg-gradient-to-r from-primary/30 to-accent/20 py-14 md:py-20 shadow-md border-b border-gray-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            About Avyukt Core Technologies
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Empowering Businesses with Smart, Scalable, and Integrated Software Solutions.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
        <div className="space-y-8 text-center leading-relaxed">
          <p>
            At <span className="font-bold text-accent">Avyukt Core Technologies</span>, we're passionate about building software with real-world impact. 
            Founded by a team of innovators and experts, our mission is to make business operations smarter and more efficient for everyone – from budding startups to large enterprises.
          </p>
          <p>
            We specialize in <span className="font-semibold text-primary">ERP, CRM, eCommerce, Accounting, Inventory</span> and much more, crafting products that are modern, easy to use, and seamlessly integrated. 
            Our solutions are tailored to unique business needs, helping organizations boost productivity, delight customers, and grow fearlessly.
          </p>
          <p>
            Driven by core values of <span className="font-semibold">Integrity, Innovation, and Collaboration</span>, we're dedicated to delivering software that makes a difference for our clients – and for the people they serve.
          </p>
          <p>
            Want to learn more, collaborate, or join our growing team? Let's build a brighter tech future together!
          </p>
          <Link to="/contact">
            <Button
              className="mt-4 px-8 py-2 text-lg font-bold text-white"
              size="lg"
              variant="default"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default AboutUs;
