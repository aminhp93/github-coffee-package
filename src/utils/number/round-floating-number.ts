type RoundOptions = {
  direction?: 'up' | 'down';
  decimalPlaces?: number;
};

export function roundFloatingNumber(num: number, options: RoundOptions = { direction: 'up', decimalPlaces: 0 }): number {
  const { direction = 'up', decimalPlaces = 0 } = options;
  const factor = Math.pow(10, decimalPlaces);
  
  if (direction === 'up') {
      return Math.ceil(num * factor) / factor;
  } else {
      return Math.floor(num * factor) / factor;
  }
}
