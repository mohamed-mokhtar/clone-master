import { useEffect } from 'react';

interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs?: string[];
  contactPoint?: {
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string[];
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'FAQPage' | 'BreadcrumbList' | 'FinancialService' | 'Article';
  data?: OrganizationData | FAQItem[] | BreadcrumbItem[];
  articleData?: {
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    author: string;
  };
}

export const StructuredData = ({ type, data, articleData }: StructuredDataProps) => {
  useEffect(() => {
    const scriptId = `structured-data-${type}`;
    
    // Remove existing script if present
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    let jsonLd: object;

    switch (type) {
      case 'Organization':
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Fingate',
          url: 'https://fingate.ae',
          logo: 'https://fingate.ae/logo.png',
          description: 'UAE\'s leading financial comparison platform. Compare personal loans, credit cards, auto loans and mortgages from top UAE banks.',
          foundingDate: '2020',
          founders: [{
            '@type': 'Person',
            name: 'Fingate Team'
          }],
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Dubai Internet City',
            addressLocality: 'Dubai',
            addressCountry: 'AE'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+971-4-XXX-XXXX',
            contactType: 'customer service',
            areaServed: 'AE',
            availableLanguage: ['English', 'Arabic']
          },
          sameAs: [
            'https://www.facebook.com/fingate.ae',
            'https://www.twitter.com/fingate_ae',
            'https://www.linkedin.com/company/fingate-ae',
            'https://www.instagram.com/fingate.ae'
          ]
        };
        break;

      case 'WebSite':
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Fingate',
          url: 'https://fingate.ae',
          description: 'Compare and apply for the best financial products in UAE',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://fingate.ae/search?q={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
          }
        };
        break;

      case 'FinancialService':
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'FinancialService',
          name: 'Fingate Financial Comparison',
          url: 'https://fingate.ae',
          description: 'Compare personal loans, credit cards, auto loans and mortgages from leading UAE banks including Emirates NBD, ADCB, FAB, and HSBC.',
          areaServed: {
            '@type': 'Country',
            name: 'United Arab Emirates'
          },
          serviceType: [
            'Personal Loan Comparison',
            'Credit Card Comparison', 
            'Auto Loan Comparison',
            'Mortgage Comparison',
            'Loan Calculator'
          ],
          provider: {
            '@type': 'Organization',
            name: 'Fingate'
          },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'AED',
            offerCount: '50+',
            description: 'Compare 50+ financial products from top UAE banks'
          }
        };
        break;

      case 'FAQPage':
        const faqs = data as FAQItem[];
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs?.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          })) || []
        };
        break;

      case 'BreadcrumbList':
        const breadcrumbs = data as BreadcrumbItem[];
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs?.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
          })) || []
        };
        break;

      case 'Article':
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: articleData?.headline,
          description: articleData?.description,
          image: articleData?.image,
          datePublished: articleData?.datePublished,
          dateModified: articleData?.dateModified,
          author: {
            '@type': 'Organization',
            name: articleData?.author || 'Fingate'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Fingate',
            logo: {
              '@type': 'ImageObject',
              url: 'https://fingate.ae/logo.png'
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://fingate.ae'
          }
        };
        break;

      default:
        return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, data, articleData]);

  return null;
};
