export function roundOffString(number: string, offset: number) {
  return Number(number).toFixed(offset);
}

export function formatNumber(number: number, toFixed = 2) {
  if (number >= 1e9) {
    return (number / 1e9).toFixed(toFixed) + "B";
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(toFixed) + "M";
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(toFixed) + "K";
  } else {
    return number.toString();
  }
}
