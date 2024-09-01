export const formatPrice = (price) => {
  if (price === undefined || price === null) {
    return "0";
  }
  return price.toLocaleString();
};
