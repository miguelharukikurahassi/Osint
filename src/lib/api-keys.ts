export const getApiKey = (service: string): string => {
  return localStorage.getItem(`API_KEY_${service.toUpperCase()}`) || '';
};

export const setApiKey = (service: string, key: string): void => {
  if (key) {
    localStorage.setItem(`API_KEY_${service.toUpperCase()}`, key);
  } else {
    localStorage.removeItem(`API_KEY_${service.toUpperCase()}`);
  }
};
