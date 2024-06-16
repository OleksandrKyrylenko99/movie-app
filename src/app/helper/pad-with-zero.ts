export const padWithZero = (value: number) =>
  value.toString().length === 1 ? '0' + value : value;
