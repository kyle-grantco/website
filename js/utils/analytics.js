// Google Analytics Event Tracking
const trackEvent = (eventName, properties = {}) => {
    if (typeof gtag === 'function') {
        gtag('event', eventName, properties);
    }
};

// Form Submission Tracking
const trackFormSubmission = (formName) => {
    trackEvent('form_submission', {
        form_name: formName,
        timestamp: new Date().toISOString()
    });
};

export { trackEvent, trackFormSubmission }; 