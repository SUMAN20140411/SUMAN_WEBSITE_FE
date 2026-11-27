/**
 * Splits items into balanced rows (up to `maxPerRow` items per row).
 * By default produces a pyramid layout (smaller rows on top, larger on bottom, e.g. 5 -> [2, 3]).
 * When `reverse` is true, larger rows appear on top and smaller rows on bottom (e.g. 5 -> [3, 2]).
 */
export function chunkPyramidRows<T>(
  items: T[],
  maxPerRow = 4,
  options?: { reverse?: boolean },
): T[][] {
  if (items.length === 0) return [];

  const reverse = options?.reverse ?? false;
  const rowCount = Math.ceil(items.length / maxPerRow);
  const baseSize = Math.floor(items.length / rowCount);
  const remainder = items.length % rowCount;
  const rows: T[][] = [];

  let offset = 0;
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    const hasExtra = reverse
      ? rowIndex < remainder
      : rowIndex >= rowCount - remainder;
    const rowSize = baseSize + (hasExtra ? 1 : 0);
    rows.push(items.slice(offset, offset + rowSize));
    offset += rowSize;
  }

  return rows;
}
