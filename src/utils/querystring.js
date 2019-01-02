const _getQuery = function (str, key) {
  let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  let result = str.match(reg);
  return result ? decodeURIComponent(result[2]) : null;
}

// 获取url参数
export const getQueryString = function (key) {
  let search = window.location.search.substr(1);
  let hash = null
  let value;
  if (location.hash) {
    hash = location.hash.split('?')[1];
  }
  if (hash) {
    value = _getQuery(hash, key);
  }
  return value || _getQuery(search, key);
}
