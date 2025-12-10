export const toEnglishNumber = (value) => {
  if (!value) return value;

  const persian = "۰۱۲۳۴۵۶۷۸۹";
  const english = "0123456789";

  return value.replace(/[۰-۹]/g, (d) => english[persian.indexOf(d)]);
};

export function toPersianNumber(input) {

  const persianDigits = {
    0: "۰",
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
  };

  return String(input).replace(/\d+/g, (num) => {
    const formatted = Number(num).toLocaleString("en-US");

    return formatted.replace(/[0-9]/g, (d) => persianDigits[d]);
  });
}