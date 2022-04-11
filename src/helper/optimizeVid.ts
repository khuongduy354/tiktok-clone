export const optimizeVid = (url: string) => {
  const pos = url.indexOf('/upload') + 7;
  const optimizer = '/w_960/vc_auto';
  return url.substring(0, pos) + optimizer + url.substring(pos);
};
