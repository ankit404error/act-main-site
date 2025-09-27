import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  structuredData?: object;
}

const SEOHead = ({
  title = "Avyukt Core Technologies - Custom Software Solutions",
  description = "Leading provider of custom ERP software, CRM, HRM, Restaurant Management Systems, E-commerce solutions, and mobile app development services.",
  keywords = "ERP software, CRM systems, HRM solutions, restaurant management, e-commerce development, mobile app development, custom software, business automation, inventory management, retail billing",
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage = "/lovable-uploads/9a295041-b715-4e21-8400-d0ea69a1e49e.png",
  structuredData,
}: SEOProps) => {
  const siteTitle = "Avyukt Core Technologies";
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Avyukt Core Technologies",
    "description": "Custom Software Development Company specializing in ERP, CRM, HRM, and Business Management Solutions",
    "url": window.location.origin,
    "logo": window.location.origin + ogImage,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXX-XXX-XXXX",
      "contactType": "customer service",
      "email": "Anshumansingh.0502280@gmail.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "sameAs": [],
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "offerCount": "8",
      "offers": [
        {
          "@type": "Offer",
          "name": "Customizable ERP Software",
          "description": "Complete Enterprise Resource Planning solution for business process management",
          "category": "Business Software"
        },
        {
          "@type": "Offer",
          "name": "Restaurant Management System",
          "description": "Comprehensive restaurant operations management from POS to inventory",
          "category": "Restaurant Software"
        },
        {
          "@type": "Offer",
          "name": "CRM Solutions",
          "description": "Customer Relationship Management systems for better customer engagement",
          "category": "CRM Software"
        },
        {
          "@type": "Offer",
          "name": "HRM Solutions",
          "description": "Human Resource Management systems for employee and payroll management",
          "category": "HR Software"
        }
      ]
    }
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Avyukt Core Technologies" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Avyukt Core Technologies" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;