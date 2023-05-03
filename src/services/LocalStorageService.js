// ====== store data in local storage ======

export const storeDataByValue = (key, value) => {
  localStorage.setItem(key, value);
};

export const storeDataByObj = (key, objParam) => {
  localStorage.setItem(key, JSON.stringify(objParam));
};

// ====== get data from local storage ======

export const getDataByValue = (key) => {
  return localStorage.getItem(key);
};

export const getDataByObj = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// ====== remove data from local storage ======

export const removeDataByValue = (key) => {
  localStorage.removeItem(key);
};
