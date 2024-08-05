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

export function calculateRatings(ratings: number[]): {
  counts: { [key: number]: number },
  percentages: { [key: number]: number }
} {
  const counts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const totalRatings = ratings.length;

  ratings.forEach(rating => {
    if (counts[rating] !== undefined) {
      counts[rating]++;
    }
  });

  const percentages: { [key: number]: number } = {
    1: (counts[1] / totalRatings) * 100,
    2: (counts[2] / totalRatings) * 100,
    3: (counts[3] / totalRatings) * 100,
    4: (counts[4] / totalRatings) * 100,
    5: (counts[5] / totalRatings) * 100
  };

  return { counts, percentages };
}