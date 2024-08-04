export function formatNumberWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function formatNumberToFixedDecimals(number: number): string {
  const decimalPart = number - Math.floor(number);

  if (decimalPart === 0) {
    return number.toString();
  } else if (decimalPart % 0.1 === 0) {
    return number.toFixed(1);
  } else {
    return number.toFixed(2);
  }
}
