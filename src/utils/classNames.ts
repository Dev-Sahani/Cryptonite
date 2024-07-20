export function cn(...classes: Array<string | null | undefined | boolean>) {
  return classes.map((c) => (c ? c : "")).join(" ");
}
