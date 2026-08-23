import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
  type?: 'website' | 'article' | 'product';
  image?: string;
}

export function SEO({ 
  title, 
  description, 
  canonicalUrl, 
  jsonLd, 
  type = 'website',
  image = 'https://devora.dev/og-image.jpg' // Placeholder for future OG image
}: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper to safely update meta tags
    const updateMetaTag = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          element.setAttribute('name', selector.match(/meta\\[name="(.*)"\\]/)?.[1] || '');
        } else if (selector.startsWith('meta[property=')) {
          element.setAttribute('property', selector.match(/meta\\[property="(.*)"\\]/)?.[1] || '');
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
      return element;
    };

    // 2. Standard Meta Tags
    updateMetaTag('meta[name="description"]', 'content', description);

    // 3. Open Graph Tags
    updateMetaTag('meta[property="og:title"]', 'content', title);
    updateMetaTag('meta[property="og:description"]', 'content', description);
    updateMetaTag('meta[property="og:type"]', 'content', type);
    updateMetaTag('meta[property="og:image"]', 'content', image);
    if (canonicalUrl) {
      updateMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
    }

    // 4. Twitter Tags
    updateMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'content', title);
    updateMetaTag('meta[name="twitter:description"]', 'content', description);
    updateMetaTag('meta[name="twitter:image"]', 'content', image);

    // 5. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    } else if (canonical) {
      canonical.remove();
    }

    // 6. JSON-LD Structured Data
    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (jsonLd) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(jsonLd);
    } else if (jsonLdScript) {
      jsonLdScript.remove();
    }

    // Cleanup function when unmounting
    return () => {
      // It's generally safer to leave the tags so they don't flash empty,
      // but the next page's SEO component will overwrite them immediately anyway.
      // We don't remove standard meta tags, only the json-ld to keep it clean.
      if (jsonLdScript) {
        jsonLdScript.remove();
      }
    };
  }, [title, description, canonicalUrl, jsonLd, type, image]);

  return null;
}
