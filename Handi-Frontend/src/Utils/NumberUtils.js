export const toPersianNumber = (num) => {
  if (num === null || num === undefined) return "";

  return new Intl.NumberFormat("fa-IR").format(num);
};
