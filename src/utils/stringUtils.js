export const vueReplace = (str, params) => {
  if (typeof str === 'string' && typeof params === 'object' && params) {
    return str.replace(/\{\{([^{}]+)\}\}/g, ($0, $1) => {
      if (typeof params[$1] !== 'undefined') {
        return params[$1];
      }
      return $0;
    });
  }
  return str;
}
