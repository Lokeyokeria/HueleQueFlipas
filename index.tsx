import './index.css';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

// 🔥 SEO base global (mejorado)
function setBaseMeta() {
  document.title = 'Huele Que Flipas | Perfumes de equivalencia que huelen caro';

  const descriptionText =
    'Perfumes de equivalencia premium con larga duración, envío 24/48h y precio accesible. Huele a lujo sin pagar de más.';

  // META DESCRIPTION
  let metaDescription = document.querySelector('meta[name="description"]');

  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }

  metaDescription.setAttribute('content', descriptionText);

  // CANONICAL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }

  canonical.setAttribute('href', 'https://huelequeflipas.es/');

  // 🔥 EXTRA PRO SEO (Open Graph)
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute('content', document.title);

  let ogDescription = document.querySelector('meta[property="og:description"]');
  if (!ogDescription) {
    ogDescription = document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    document.head.appendChild(ogDescription);
  }
  ogDescription.setAttribute('content', descriptionText);

  let ogType = document.querySelector('meta[property="og:type"]');
  if (!ogType) {
    ogType = document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    document.head.appendChild(ogType);
  }
  ogType.setAttribute('content', 'website');

  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (!ogUrl) {
    ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrl);
  }
  ogUrl.setAttribute('content', 'https://huelequeflipas.es/');
}

function Root() {
  useEffect(() => {
    setBaseMeta();
  }, []);

  return <App />;
}

createRoot(rootElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
