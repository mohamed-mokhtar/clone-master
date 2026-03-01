const RATE_LIMIT_PREFIX = 'rate_limit_';

/**
 * Check if a form submission is rate-limited.
 * Returns true if allowed, false if rate-limited.
 */
export const checkRateLimit = (formType: 'contact' | 'application', cooldownMinutes = 60): boolean => {
  const key = `${RATE_LIMIT_PREFIX}${formType}`;
  const lastSubmit = localStorage.getItem(key);

  if (lastSubmit) {
    const minutesSince = (Date.now() - parseInt(lastSubmit, 10)) / 1000 / 60;
    if (minutesSince < cooldownMinutes) {
      return false;
    }
  }

  return true;
};

/**
 * Record that a form submission just happened.
 */
export const recordSubmission = (formType: 'contact' | 'application'): void => {
  const key = `${RATE_LIMIT_PREFIX}${formType}`;
  localStorage.setItem(key, Date.now().toString());
};
