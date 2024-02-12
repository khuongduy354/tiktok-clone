export const toHttps = (url: string) => {
  if (url.startsWith('https')) {
    return url;
  } else if (url.startsWith('http')) {
    return url.replace('http', 'https');
  }
  return url;
};
