type RoundOptions = {
  direction?: "up" | "down";
  scale?: number;
};

export function roundToMultiple(
  num: number,
  options: RoundOptions = { direction: "up", scale: 10 }
): number {
  const { direction = "up", scale = 10 } = options;

  if (!Number.isInteger(scale) || scale <= 0) {
    throw new Error("roundToMultiple: Input scale must be a positive integer.");
  }

  if (direction === "up") {
    return Math.ceil(num / scale) * scale;
  } else {
    return Math.floor(num / scale) * scale;
  }
}
