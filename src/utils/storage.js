export const getSessionStore = function (key) {
  let ret = null;
  try {
    ret = sessionStorage.getItem(key);
  } catch (e) {
    ret = null;
  }
  return ret
}

export const getSessionObject = function (key, defaultValue) {
  let value = getSessionStore(key)
  let ret = defaultValue;
  if (value === null) {
    return defaultValue;
  } else {
    try {
      ret = JSON.parse(value);
    } catch (e) {
      ret = defaultValue;
    }
  }
  return ret
}

export const setSessionStore = function (key, value) {
  try {
    if (typeof value === 'object' && value !== null) {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else if (typeof value === 'string' || typeof value === 'number' ||
      typeof value === 'boolean') {
      sessionStorage.setItem(key, value.toString());
    } else {
      sessionStorage.removeItem(key);
    }
  } catch (e) {

  }
}

export class List {
  maxLength = 0;
  key = null;
  __list = null;
  constructor(key = '__API_MOCK_VUE_LIST__', maxLength = 100) {
    this.key = key;
    this.maxLength = maxLength
  }
  get list() {
    if (!this.__list) {
      this.__list = getSessionObject(this.key, []);
    }
    return this.__list;
  }
  set list(value) {
    if (Array.isArray(value)) {
      this.__list = value;
      let list = value;
      if (list.length > this.maxLength) {
        list = list.slice(list.length - this.maxLength);
      }
      if (typeof this.map === 'function') {
        list = list.map(this.map);
      }
      setSessionStore(this.key, list);
    }
  }
}
