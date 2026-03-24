import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

// 🔥 SEO base global
function setBaseMeta() {
  document.title = 'Huele Que Flipas | Perfumes de equivalencia que huelen caro';

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      'content',
      'Perfumes de equivalencia premium con larga duración, envío 24/48h y precio accesible. Huele a lujo sin pagar de más.'
    );
  }

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }

  canonical.setAttribute('href', 'https://huelequeflipas.es/');
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
