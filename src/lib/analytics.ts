// Google Analytics 4 tracking utilities

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
    console.log('GA Event:', eventName, parameters);
  }
};

// CTA Click Events
export const trackCTA1Click = () => {
  trackEvent('cta_click', {
    cta_location: 'hero_section',
    cta_name: 'join_waitlist_top',
  });
};

export const trackCTA2Click = () => {
  trackEvent('cta_click', {
    cta_location: 'bottom_section',
    cta_name: 'join_waitlist_bottom',
  });
};

// Form Step Events
export const trackFormStep1 = (intent: string) => {
  trackEvent('form_step', {
    step_number: 1,
    step_name: 'intent_selection',
    selected_value: intent,
  });
};

export const trackFormStep2 = (userType: string) => {
  trackEvent('form_step', {
    step_number: 2,
    step_name: 'user_type_selection',
    selected_value: userType,
  });
};

export const trackFormStep3 = (phone: string) => {
  trackEvent('form_step', {
    step_number: 3,
    step_name: 'phone_entry',
    phone_number: `+91${phone}`,
  });
};

export const trackFormCompletion = (data: { intent: string; userType: string; phone: string }) => {
  trackEvent('waitlist_signup_complete', {
    intent: data.intent,
    user_type: data.userType,
    phone: `+91${data.phone}`,
  });
};
