export const removeLeadingZero = (num) => {
  return String(num).replace(/^0+/, "");
};

export const formatFloat = (float) => {
  return Math.round(float * 100) / 100;
};
