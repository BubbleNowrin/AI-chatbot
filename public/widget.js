(function() {
  'use strict';

  // Configuration
  const WIDGET_CONFIG = {
    apiUrl: window.AI_CHATBOT_CONFIG?.apiUrl || 'http://localhost:3000',
    websiteUrl: window.AI_CHATBOT_CONFIG?.websiteUrl || window.location.origin,
    primaryColor: window.AI_CHATBOT_CONFIG?.primaryColor || '#3b82f6',
    position: window.AI_CHATBOT_CONFIG?.position || 'bottom-right'
  };

  // Create and inject widget
  function initWidget() {
    // Create iframe container
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'ai-chatbot-widget';
    widgetContainer.style.cssText = `
      position: fixed;
      ${WIDGET_CONFIG.position === 'bottom-right' ? 'right: 20px;' : 'left: 20px;'}
      bottom: 20px;
      z-index: 999999;
      width: 400px;
      height: 600px;
    `;

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = `${WIDGET_CONFIG.apiUrl}/widget-embed?` + 
      `websiteUrl=${encodeURIComponent(WIDGET_CONFIG.websiteUrl)}&` +
      `primaryColor=${encodeURIComponent(WIDGET_CONFIG.primaryColor)}&` +
      `position=${encodeURIComponent(WIDGET_CONFIG.position)}`;
    iframe.style.cssText = `
      border: none;
      width: 100%;
      height: 100%;
      border-radius: 12px;
    `;
    iframe.allow = 'clipboard-write';

    widgetContainer.appendChild(iframe);
    document.body.appendChild(widgetContainer);

    console.log('AI Chatbot Widget initialized');
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})();
