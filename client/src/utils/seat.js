export const SEAT_ROWS = 8
export const SEAT_COLS = 9
export const SEAT_ROW_LETTERS = "ABCDEFGH"

// Seats are stored as a flat 0-71 index (row-major). This turns that back into
// the row-letter + seat-number label shown on the seat map, e.g. 34 -> "D8".
export function seatLabel(index) {
  const row = Math.floor(index / SEAT_COLS)
  const col = index % SEAT_COLS
  return `${SEAT_ROW_LETTERS[row]}${col + 1}`
}
