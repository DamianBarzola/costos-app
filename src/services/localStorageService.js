export const getStoreData = async (key) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

export const setStoreData = async (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeStoreData = async (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
