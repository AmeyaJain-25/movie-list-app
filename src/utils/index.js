export const isBrowser = () => {
  return typeof window !== 'undefined';
};

export const isServer = () => {
  return typeof window === 'undefined';
};

export const isProductionHostname = () => {
  return process.env.NODE_ENV === 'production';
};

export const getCopyrightYear = () => Math.max(2023, new Date().getFullYear());
