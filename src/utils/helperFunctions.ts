export const convertToNumber = (strValue: string | number) => {
  return Number(String(strValue).replace('px', '').replace('%', ''));
};
