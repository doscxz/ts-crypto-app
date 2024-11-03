export function percentDifference(a: number, b: number): number {
  return +(100 * Math.abs((a - b) / (a + b) / 2)).toFixed(2)
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.substr(1)
}