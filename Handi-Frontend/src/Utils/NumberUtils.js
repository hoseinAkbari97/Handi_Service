export const toEnglishNumber = (value) => {
  if (!value) return value;

  const persian = "۰۱۲۳۴۵۶۷۸۹";
  const english = "0123456789";

  return value.replace(/[۰-۹]/g, (d) => english[persian.indexOf(d)]);
};

export function toPersianNumber(str) {

  const persianMap = {
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

  return String(str).replace(/[0-9]/g, (digit) => persianMap[digit]);
}