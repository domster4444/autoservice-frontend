import cookie from "js-cookie";

// ? store data in cookie
export const storeDataByValue = (key, value) => {
  if (window !== undefined) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const storeDataByObject = (key, obj) => {
  if (window !== undefined) {
    cookie.set(key, JSON.stringify(obj), {
      expires: 1,
    });
  }
};

// ? get data of console  by value
export const getDataByValue = (key) => {
  if (window !== undefined && cookie.get(key)) {
    return cookie.get(key);
  }
  return null;
};

//? get data of console by object
export const getDataByObject = (key) => {
  if (window !== undefined) {
    cookie.remove(key);
  }
};
