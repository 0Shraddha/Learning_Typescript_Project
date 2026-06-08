# Beginner's Guide: Crochet & Knitting Pattern Playground Implementation

Welcome! This guide explains how the **Crochet & Knitting Pattern Playground** is built under the hood. We will break down the design step-by-step so that even someone new to React and TypeScript can easily follow along.

---

## 1. What are the Core Parts?

The application is structured into three main visual columns inside [Playground.tsx](file:///Users/shraddhadongol/shopping/src/pages/Playground.tsx):
1. **Left Sidebar (Stitch Palette)**: Select stitches or the eraser, and create new custom stitches.
2. **Center Canvas (The Grid)**: A responsive grid where users paint stitches.
3. **Right Sidebar (Settings & Storage)**: Change grid sizes, save or load patterns from the browser, and export designs as JSON or PNG files.

---

## 2. Managing the Grid State

In React, the visual interface changes when the "state" updates. We represent our grid as a **2D array** (an array of rows, where each row is an array of cells):

```typescript
type GridData = (string | null)[][];
```

* If a cell is empty, it contains `null`.
* If a cell has a stitch, it contains that stitch's unique `id` (e.g., `"sc"` for Single Crochet, or `"custom_1717..."` for a user-created stitch).

---

## 3. The Main Grid Area: Detailed Interactive Logic

The center grid is the most interactive part of the Playground. It manages drag-to-paint, right-click erasure, custom zoom levels, and mode switching. Here is how the logic works in detail:

### A. The Grid Layout & CSS Grid
The grid container dynamically adjusts its structure using CSS Grid properties mapping directly to the `rows`, `cols`, and `zoom` state variables:
```typescript
gridTemplateRows: `repeat(${rows}, ${zoom}px)`,
gridTemplateColumns: `repeat(${cols}, ${zoom}px)`
```
This avoids using static CSS styles and guarantees that resizing the grid (e.g. from 25x25 to 50x50) or changing the zoom level (e.g. from 16px to 32px) updates the visual canvas size immediately.

### B. Drag-to-Paint Logic Flow
Drawing like a pixel art application requires tracking state across multiple events:
1. **Initiating Draw (`onMouseDown`)**:
   * The user clicks on a cell.
   * `onMouseDown` fires. If it's a left click, it sets `isDrawing = true` and updates that individual cell with the selected stitch ID in the 2D array state.
   * If it's a right click (`e.button === 2`), we run `e.preventDefault()` to stop the default browser context menu from blocking the screen, set `isDrawing = true`, and erase that cell (`null`).
2. **Dragging across cells (`onMouseEnter`)**:
   * As the mouse moves, it enters neighbor cells.
   * If `isDrawing` is `true`, `onMouseEnter` triggers on each entered cell and paints (or erases) it instantly.
3. **Ending Draw (`onMouseUp` & Global Handler)**:
   * When the mouse button is released, `isDrawing` resets to `false`.
   * **Crucial Edge Case**: If the user releases the mouse click *outside* the grid canvas, a standard cell `onMouseUp` won't trigger. To prevent the brush from sticking and painting forever, we mount a global `window` mouseup listener:
     ```typescript
     useEffect(() => {
       const handleGlobalMouseUp = () => {
         if (isDrawing) {
           setIsDrawing(false);
           updateGridState(grid); // Saves history state
         }
       };
       window.addEventListener("mouseup", handleGlobalMouseUp);
       return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
     }, [isDrawing, grid]);
     ```

### C. State Mapping & Dynamic Visual Rendering
Inside each cell, we map the cell value to visual representations:
* **Background Color**: The cell queries the stitch list to find the color corresponding to the stored ID (e.g. `#ffccd5` for `ch`).
* **Text Label**: If the application is in **Edit Mode**, it shows the short label (e.g. `SC` or `HDC`) sized proportionally to the current zoom level (`zoom * 0.4` px) so it scales cleanly.
* **Preview Mode vs Edit Mode**:
  * In **Edit Mode**, every cell highlights on hover and displays its short label text.
  * In **Preview Mode**, hover highlights are disabled, stitch labels are hidden, and if the user selects "Color-Only", the grid lines and symbols disappear, revealing a clean color blocks preview.

---

## 4. How Undo and Redo Work (History Stack)

To support undo and redo actions, we store a list of previous grid states in a history array alongside an index pointing to our current state:

```typescript
const [history, setHistory] = useState<GridData[]>([initialGrid]);
const [historyIndex, setHistoryIndex] = useState(0);
```

* **When the user paints**: We discard any "redo" states ahead of our current index, add the new grid state to the end of the history array, and move `historyIndex` forward.
* **When clicking Undo**: We decrement `historyIndex` by 1 and set the active grid to `history[historyIndex - 1]`.
* **When clicking Redo**: We increment `historyIndex` by 1 and set the active grid to `history[historyIndex + 1]`.

---

## 5. Saving and Loading via LocalStorage

To prevent designs from disappearing when the browser is closed or refreshed, we save them to the browser's built-in `localStorage`:

* **Saving**: We take the pattern metadata, custom stitches list, and grid data, pack them into a single JavaScript object, convert it to a string using `JSON.stringify()`, and save it under a unique key.
* **Loading**: We retrieve the string from `localStorage`, convert it back into a JavaScript object using `JSON.parse()`, and update all our React states (`grid`, `rows`, `cols`, `customStitches`).

---

## 6. Exporting to a PNG Image

To convert the grid into an image that users can download:
1. We programmatically create an off-screen HTML5 `<canvas>` element.
2. We iterate over every cell in our grid, drawing a color-filled rectangle for each stitch.
3. If labels/symbols are enabled, we draw the text (like "SC" or "DC") in the middle of each cell using canvas text rendering.
4. We call `canvas.toDataURL("image/png")` to turn the canvas drawings into a downloadable image file link.
