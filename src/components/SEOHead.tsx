import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  articlePublishedTime?: string;
  articleAuthor?: string;
  noIndex?: boolean;
}

export const SEOHead = ({
  title = 'Fingate - UAE\'s #1 Financial Comparison Platform | Best Loans & Credit Cards',
  description = 'Compare the best personal loans, credit cards, auto loans & mortgages from top UAE banks. Get instant quotes from Emirates NBD, ADCB, FAB, HSBC. Trusted by 100,000+ customers.',
  keywords = 'UAE personal loans, Dubai credit cards, best bank rates UAE, Emirates NBD loans, ADCB credit cards, FAB personal loan, mortgage Dubai, auto loan UAE, loan calculator, compare bank rates, financial services UAE, Abu Dhabi loans, Sharjah banking',
  canonicalUrl,
  ogImage = 'https://fingate.ae/og-image.png',
  ogType = 'website',
  articlePublishedTime,
  articleAuthor,
  noIndex = false,
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to update or create meta tag
    const updateMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    
    // Robots
    if (noIndex) {
      updateMeta('robots', 'noindex, nofollow');
    } else {
      updateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // Open Graph
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', ogType, true);
    updateMeta('og:image', ogImage, true);
    updateMeta('og:site_name', 'Fingate', true);
    updateMeta('og:locale', 'en_AE', true);

    // Twitter Cards
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);

    // Article specific
    if (ogType === 'article' && articlePublishedTime) {
      updateMeta('article:published_time', articlePublishedTime, true);
      if (articleAuthor) {
        updateMeta('article:author', articleAuthor, true);
      }
    }

    // Canonical URL
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, articlePublishedTime, articleAuthor, noIndex]);

  return null;
};
