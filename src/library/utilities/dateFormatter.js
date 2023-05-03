function formatter(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleString();
}

export const dateFormatter = (isoDate) => {
  return formatter(isoDate);
};
