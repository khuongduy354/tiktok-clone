export const toHttps = (url: string) => {
  if (typeof url !== 'string') return '';
  if (url.startsWith('https')) {
    return url;
  } else if (url.startsWith('http')) {
    return url.replace('http', 'https');
  }
  return url;
};
