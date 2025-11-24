export const toEnglishNumber = (value) => {
  if (!value) return value;

  const persian = "۰۱۲۳۴۵۶۷۸۹";
  const english = "0123456789";

  return value.replace(/[۰-۹]/g, (d) => english[persian.indexOf(d)]);
};

export const toPersianNumber = (num) => {
  if (num === null || num === undefined) return "";

  return new Intl.NumberFormat("fa-IR").format(num);
};