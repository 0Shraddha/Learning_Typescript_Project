export interface Stitch {
  id: string;
  name: string;
  label: string; // e.g. "sc", "dc"
  color: string; // hex or color keyword
  symbol?: string; // symbol representation
  isCustom?: boolean;
}

export type GridData = (string | null)[][]; // 2D grid storing stitch IDs or null for empty cells

export interface SavedPattern {
  id: string;
  name: string;
  rows: number;
  cols: number;
  grid: GridData;
  customStitches: Stitch[];
  createdAt: string;
}
