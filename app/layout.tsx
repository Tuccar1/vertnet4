import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import RouteProgressBar from '@/components/RouteProgressBar'
import Chatbot from '@/components/Chatbot'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'Vertnetgeneve - Excellence en Nettoyage Professionnel',
    template: '%s | Vertnetgeneve',
  },
  description: 'Services de nettoyage professionnel de qualité supérieure à Genève. Disponible 24h/24 et 7j/7. Canapés, Fin de Bail, Fin de Chantier, Conciergerie, Immeubles, Bureaux, Toiture, Vitres, Façade.',
  keywords: 'nettoyage, Genève, Suisse, nettoyage professionnel, nettoyage commercial, nettoyage résidentiel',
  authors: [{ name: 'Vertnetgeneve' }], // Düzeltildi
  creator: 'Vertnetgeneve',
  publisher: 'Vertnetgeneve',
  metadataBase: new URL('https://www.vertnetgeneve.ch'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    url: 'https://www.vertnetgeneve.ch',
    siteName: 'Vertnetgeneve',
    title: 'Vertnetgeneve - Excellence en Nettoyage Professionnel',
    description: 'Services de nettoyage professionnel de qualité supérieure à Genève',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vertnetgeneve',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vertnetgeneve - Excellence en Nettoyage Professionnel',
    description: 'Services de nettoyage professionnel de qualité supérieure à Genève',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/* critical.css dosyasının var olduğundan emin olun */}
        <link rel="stylesheet" href="/critical.css" />
        {/* VertNet Integration CSS */}
        <link rel="stylesheet" href="/css/vertnet-integration.css" />
        {/* Flatpickr Takvim CSS */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />
        {/* VertNet Meta Tags */}
        <meta name="vertnet-admin-id" content="1" />
        <meta name="vertnet-integration" content="calendar,chatbot,analytics" />
        <meta name="vertnet-version" content="2.0" />
        <meta name="vertnet-domain" content="vertnetgeneve.ch" />
        {/* VertnetTracker - panel.chatdeskiyo.com entegrasyonu */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              class VertnetTracker {
                constructor() {
                  this.sessionId = this.getSessionId();
                  this.visitorId = this.getVisitorId();
                  this.currentPage = window.location.pathname;
                  this.sessionStart = Date.now();
                  this.pageEvents = [];
                  this.endpoint = 'https://panel.chatdeskiyo.com/api/track';
                  this.maxScrollDepth = 0;
                  this.chatHistory = [];
                  this.init();
                }
                
                getSessionId() {
                  let sessionId = sessionStorage.getItem('vertnet_session_id');
                  if (!sessionId) {
                    sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                    sessionStorage.setItem('vertnet_session_id', sessionId);
                  }
                  return sessionId;
                }
                
                getVisitorId() {
                  let visitorId = localStorage.getItem('vertnet_visitor_id');
                  if (!visitorId) {
                    visitorId = 'vis_' + Date.now() + '_' + Math.random().toString(36).substr(2, 12);
                    localStorage.setItem('vertnet_visitor_id', visitorId);
                  }
                  return visitorId;
                }
                
                getDeviceInfo() {
                  const ua = navigator.userAgent;
                  let deviceType = 'desktop';
                  if (/Mobi|Android/i.test(ua)) deviceType = 'mobile';
                  else if (/Tablet|iPad/i.test(ua)) deviceType = 'tablet';
                  
                  let browser = 'unknown';
                  if (ua.includes('Chrome')) browser = 'Chrome';
                  else if (ua.includes('Firefox')) browser = 'Firefox';
                  else if (ua.includes('Safari')) browser = 'Safari';
                  else if (ua.includes('Edge')) browser = 'Edge';
                  
                  let os = 'unknown';
                  if (ua.includes('Windows')) os = 'Windows';
                  else if (ua.includes('Mac')) os = 'MacOS';
                  else if (ua.includes('Linux')) os = 'Linux';
                  else if (ua.includes('Android')) os = 'Android';
                  else if (ua.includes('iOS') || ua.includes('iPhone')) os = 'iOS';
                  
                  return { deviceType, browser, os };
                }
                
                init() {
                  this.trackPageView();
                  this.setupScrollTracking();
                  this.setupChatbotListeners();
                  this.setupClickTracking();
                  window.addEventListener('beforeunload', () => {
                    this.trackEvent('session_end', {
                      duration: Math.round((Date.now() - this.sessionStart) / 1000),
                      maxScrollDepth: this.maxScrollDepth,
                      pageCount: this.pageEvents.filter(e => e.eventType === 'pageview').length
                    });
                    this.sendBatchData();
                  });
                  setInterval(() => this.sendBatchData(), 30000);
                }
                
                trackPageView() {
                  const deviceInfo = this.getDeviceInfo();
                  const pageData = {
                    eventType: 'pageview',
                    url: window.location.href,
                    path: window.location.pathname,
                    title: document.title,
                    referrer: document.referrer,
                    timestamp: new Date().toISOString(),
                    sessionId: this.sessionId,
                    visitorId: this.visitorId,
                    screenSize: window.innerWidth + 'x' + window.innerHeight,
                    deviceType: deviceInfo.deviceType,
                    browser: deviceInfo.browser,
                    os: deviceInfo.os,
                    language: navigator.language,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    userAgent: navigator.userAgent
                  };
                  this.pageEvents.push(pageData);
                }
                
                setupScrollTracking() {
                  let ticking = false;
                  window.addEventListener('scroll', () => {
                    if (!ticking) {
                      window.requestAnimationFrame(() => {
                        const scrollTop = window.scrollY;
                        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
                        if (scrollPercent > this.maxScrollDepth) {
                          this.maxScrollDepth = scrollPercent;
                        }
                        ticking = false;
                      });
                      ticking = true;
                    }
                  });
                }
                
                setupClickTracking() {
                  document.addEventListener('click', (e) => {
                    const target = e.target;
                    if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
                      const element = target.closest('a') || target.closest('button') || target;
                      this.trackEvent('click', {
                        elementType: element.tagName.toLowerCase(),
                        elementText: element.innerText?.substring(0, 50) || '',
                        elementHref: element.href || '',
                        elementId: element.id || '',
                        elementClass: element.className?.substring(0, 100) || ''
                      });
                    }
                  });
                }
                
                setupChatbotListeners() {
                  const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                      if (mutation.addedNodes.length) {
                        mutation.addedNodes.forEach((node) => {
                          if (node.id && node.id.includes('flowise')) {
                            this.attachChatEvents(node);
                          }
                        });
                      }
                    });
                  });
                  observer.observe(document.body, { childList: true, subtree: true });
                }
                
                attachChatEvents(chatElement) {
                  chatElement.addEventListener('click', (e) => {
                    if (e.target.matches('.chat-button, .chat-widget')) {
                      this.trackEvent('chat_started', {
                        timestamp: new Date().toISOString()
                      });
                    }
                  });
                }
                
                trackFormSubmission(formData) {
                  const formEvent = {
                    eventType: 'form_submitted',
                    sessionId: this.sessionId,
                    visitorId: this.visitorId,
                    formData: formData,
                    timestamp: new Date().toISOString(),
                    page: this.currentPage,
                    sessionDuration: Math.round((Date.now() - this.sessionStart) / 1000),
                    scrollDepth: this.maxScrollDepth
                  };
                  this.pageEvents.push(formEvent);
                  this.sendImmediately(formEvent);
                }
                
                trackChatMessage(message, sender) {
                  this.chatHistory.push({ message, sender, timestamp: new Date().toISOString() });
                  this.trackEvent('chat_message', {
                    sender: sender,
                    messageLength: message.length,
                    messageCount: this.chatHistory.length
                  });
                }
                
                trackEvent(eventType, data) {
                  const event = {
                    eventType: eventType,
                    timestamp: new Date().toISOString(),
                    sessionId: this.sessionId,
                    visitorId: this.visitorId,
                    page: this.currentPage,
                    ...data
                  };
                  this.pageEvents.push(event);
                }
                
                sendBatchData() {
                  if (this.pageEvents.length === 0) return;
                  const batch = {
                    events: [...this.pageEvents],
                    sessionId: this.sessionId,
                    visitorId: this.visitorId,
                    chatHistory: this.chatHistory
                  };
                  navigator.sendBeacon(this.endpoint, JSON.stringify(batch));
                  this.pageEvents = [];
                }
                
                sendImmediately(data) {
                  fetch(this.endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ events: [data], sessionId: this.sessionId, visitorId: this.visitorId })
                  }).catch(() => {});
                }
              }
              
              window.VertnetTracker = VertnetTracker;
              document.addEventListener('DOMContentLoaded', () => {
                window.vertnetTracker = new VertnetTracker();
              });
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Vertnetgeneve',
              description: 'Services de nettoyage professionnel de qualité supérieure à Genève. Disponible 24h/24 et 7j/7.',
              url: 'https://www.vertnetgeneve.ch',
              telephone: '+41766212183',
              email: 'info@vertnetgeneve.ch',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Genève',
                addressCountry: 'CH',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '46.2044',
                longitude: '6.1432',
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
                opens: '00:00',
                closes: '23:59',
              },
              priceRange: '$$',
              image: 'https://www.vertnetgeneve.ch/og-image.jpg',
              sameAs: ['https://www.vertnetgeneve.ch'],
              areaServed: {
                '@type': 'City',
                name: 'Genève',
              },
              serviceType: [
                'Nettoyage de canapés',
                'Nettoyage fin de bail',
                'Nettoyage fin de chantier',
                'Conciergerie',
                "Nettoyage d'immeubles",
                'Nettoyage de bureaux',
                'Nettoyage de toiture',
                'Nettoyage de vitres',
                'Nettoyage de façade',
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-white" suppressHydrationWarning>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <Suspense fallback={null}>
          <RouteProgressBar />
        </Suspense>
        <main className="flex-1 w-full">
          {children}
        </main>
        <Chatbot />
        {/* ChatDeskiyo SaaS Chatbot Widget */}
        <Script
          src="https://panel.chatdeskiyo.com/widget/chatbot.js"
          strategy="afterInteractive"
          {...({ 'data-site-id': 'vertnetgeneve', 'data-lang': 'fr' } as any)}
        />
        {/* Flatpickr Takvim JS */}
        <Script
          src="https://cdn.jsdelivr.net/npm/flatpickr"
          strategy="afterInteractive"
        />
        {/* VertNet Integration Scripts */}
        <Script
          src="/js/vertnet-config.js"
          strategy="afterInteractive"
        />
        <Script
          src="/js/vertnet-calendar-integration.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}