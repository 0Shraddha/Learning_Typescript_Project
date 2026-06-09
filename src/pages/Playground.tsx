import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Trash2,
  Download,
  Upload,
  Plus,
  Eye,
  Edit3,
  Save,
  FileJson,
  Image as ImageIcon,
  Grid,
  Sparkles,
  Eraser,
  Paintbrush
} from "lucide-react";
import { Stitch, GridData, SavedPattern } from "../types/stitchTypes";

// Default stitches library
const DEFAULT_STITCHES: Stitch[] = [
  { id: "ch", name: "Chain", label: "CH", color: "#ffccd5", symbol: "○" },
  { id: "slst", name: "Slip Stitch", label: "SL", color: "#e0dbec", symbol: "•" },
  { id: "sc", name: "Single Crochet", label: "SC", color: "#ffb3c1", symbol: "×" },
  { id: "mr", name: "Magic Ring", label: "MR", color: "#ffced5", symbol: "mr" },
  { id: "hdc", name: "Half Double Crochet", label: "HDC", color: "#ffc6ff", symbol: "┬" },
  { id: "dc", name: "Double Crochet", label: "DC", color: "#e8c0fc", symbol: "┼" },
  { id: "tr", name: "Treble Crochet", label: "TR", color: "#c8b6ff", symbol: "╪" },
  { id: "dtr", name: "Double Treble Crochet", label: "DTR", color: "#b8c0ff", symbol: "╫" },
  { id: "inc", name: "Increase", label: "INC", color: "#ffd6a5", symbol: "V" },
  { id: "dec", name: "Decrease", label: "DEC", color: "#caffbf", symbol: "Λ" },
];

export default function Playground() {
  // Pattern general info
  const [patternName, setPatternName] = useState("My Sweet Crochet Project");
  const [rows, setRows] = useState(25);
  const [cols, setCols] = useState(25);

  // Stitches state
  const [customStitches, setCustomStitches] = useState<Stitch[]>([]);
  const stitches = useMemo(() => [...DEFAULT_STITCHES, ...customStitches], [customStitches]);

  // Selected paint action state
  const [selectedStitchId, setSelectedStitchId] = useState<string>("sc");
  const [isEraseMode, setIsEraseMode] = useState(false);

  // Grid State
  const [grid, setGrid] = useState<GridData>(() =>
    Array(25).fill(null).map(() => Array(25).fill(null))
  );

  // History for Undo/Redo
  const [history, setHistory] = useState<GridData[]>([
    Array(25).fill(null).map(() => Array(25).fill(null))
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // UI state
  const [zoom, setZoom] = useState(24); // cell size in pixels
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showColorOnly, setShowColorOnly] = useState(false);
  const [showGridLines, setShowGridLines] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);

  // Custom Stitch creation state
  const [newStitchName, setNewStitchName] = useState("");
  const [newStitchLabel, setNewStitchLabel] = useState("");
  const [newStitchColor, setNewStitchColor] = useState("#fdffb6");
  const [newStitchSymbol, setNewStitchSymbol] = useState("★");

  // Local storage lists
  const [savedPatterns, setSavedPatterns] = useState<SavedPattern[]>([]);

  // Ref for canvas export
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Initialize and load saved pattern list
  useEffect(() => {
    loadSavedPatternsList();
  }, []);

  const loadSavedPatternsList = () => {
    try {
      const stored = localStorage.getItem("crochet_playground_patterns");
      if (stored) {
        setSavedPatterns(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load saved patterns list", e);
    }
  };

  // Helper to update grid with undo support
  const updateGridState = (newGrid: GridData) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newGrid);
    // Keep max 50 history steps
    if (updatedHistory.length > 50) {
      updatedHistory.shift();
      setHistoryIndex(updatedHistory.length - 1);
    } else {
      setHistoryIndex(updatedHistory.length - 1);
    }
    setHistory(updatedHistory);
    setGrid(newGrid);
  };

  // Resize Grid helper (keeps existing cells)
  const resizeGrid = (newRows: number, newCols: number) => {
    const freshGrid: GridData = Array(newRows)
      .fill(null)
      .map((_, r) =>
        Array(newCols)
          .fill(null)
          .map((_, c) => {
            if (r < grid.length && c < grid[0].length) {
              return grid[r][c];
            }
            return null;
          })
      );
    setRows(newRows);
    setCols(newCols);
    updateGridState(freshGrid);
  };

  // Handle cell click/drag
  const handleCellPaint = (r: number, c: number) => {
    const newGrid = grid.map((rowArr, rowIndex) =>
      rowArr.map((cell, colIndex) => {
        if (rowIndex === r && colIndex === c) {
          return isEraseMode ? null : selectedStitchId;
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  const handleMouseDown = (r: number, c: number, e: React.MouseEvent) => {
    if (e.button === 2) {
      // Right click removes stitch
      e.preventDefault();
      const newGrid = grid.map((rowArr, rowIndex) =>
        rowArr.map((cell, colIndex) => {
          if (rowIndex === r && colIndex === c) return null;
          return cell;
        })
      );
      setGrid(newGrid);
      setIsDrawing(true);
      return;
    }
    setIsDrawing(true);
    handleCellPaint(r, c);
  };

  const handleMouseEnter = (r: number, c: number) => {
    if (isDrawing) {
      handleCellPaint(r, c);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      // Save state into history stack
      updateGridState(grid);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDrawing) {
        setIsDrawing(false);
        updateGridState(grid);
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDrawing, grid]);

  // Undo/Redo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setGrid(history[nextIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setGrid(history[nextIndex]);
    }
  };

  // Clear canvas
  const handleClearGrid = () => {
    if (window.confirm("Are you sure you want to clear the entire grid?")) {
      const cleared = Array(rows).fill(null).map(() => Array(cols).fill(null));
      updateGridState(cleared);
    }
  };

  // Add Custom Stitch
  const handleAddCustomStitch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStitchName || !newStitchLabel) {
      alert("Please provide both name and short label!");
      return;
    }
    const newStitch: Stitch = {
      id: `custom_${Date.now()}`,
      name: newStitchName,
      label: newStitchLabel.toUpperCase().substring(0, 3),
      color: newStitchColor,
      symbol: newStitchSymbol || "★",
      isCustom: true,
    };
    setCustomStitches((prev) => [...prev, newStitch]);
    setSelectedStitchId(newStitch.id);
    setIsEraseMode(false);

    // Reset fields
    setNewStitchName("");
    setNewStitchLabel("");
    setNewStitchColor("#fdffb6");
    setNewStitchSymbol("★");
  };

  // Save to LocalStorage
  const handleSaveToLocalStorage = () => {
    const newPattern: SavedPattern = {
      id: `pattern_${Date.now()}`,
      name: patternName || "Untitled Crochet Pattern",
      rows,
      cols,
      grid,
      customStitches,
      createdAt: new Date().toLocaleString(),
    };

    const currentList = [...savedPatterns];
    // Check if duplicate name to replace, or append
    const matchIndex = currentList.findIndex((p) => p.name === newPattern.name);
    if (matchIndex >= 0) {
      currentList[matchIndex] = newPattern;
    } else {
      currentList.push(newPattern);
    }

    localStorage.setItem("crochet_playground_patterns", JSON.stringify(currentList));
    setSavedPatterns(currentList);
    alert(`Successfully saved "${newPattern.name}" to localStorage!`);
  };

  // Load Pattern
  const handleLoadPattern = (pattern: SavedPattern) => {
    setPatternName(pattern.name);
    setRows(pattern.rows);
    setCols(pattern.cols);
    setGrid(pattern.grid);
    setCustomStitches(pattern.customStitches || []);
    // Re-initialize history with this grid
    setHistory([pattern.grid]);
    setHistoryIndex(0);
  };

  // Delete Pattern
  const handleDeleteSavedPattern = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Delete this saved pattern?")) {
      const filtered = savedPatterns.filter((p) => p.id !== id);
      localStorage.setItem("crochet_playground_patterns", JSON.stringify(filtered));
      setSavedPatterns(filtered);
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = JSON.stringify({
      version: 1,
      name: patternName,
      rows,
      cols,
      grid,
      customStitches,
    }, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${patternName.replace(/\s+/g, "_")}_pattern.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.grid && parsed.rows && parsed.cols) {
          setPatternName(parsed.name || "Imported Pattern");
          setRows(parsed.rows);
          setCols(parsed.cols);
          setGrid(parsed.grid);
          setCustomStitches(parsed.customStitches || []);
          setHistory([parsed.grid]);
          setHistoryIndex(0);
          alert("Pattern imported successfully!");
        } else {
          alert("Invalid pattern file structure.");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  // Export PNG Image
  const handleExportPNG = () => {
    const canvas = document.createElement("canvas");
    const cellSize = 30; // High quality render scale
    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Draw background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cellStitchId = grid[r]?.[c];
        const activeStitch = stitches.find((s) => s.id === cellStitchId);

        // Calculate positions
        const x = c * cellSize;
        const y = r * cellSize;

        if (activeStitch) {
          // Fill background color
          ctx.fillStyle = activeStitch.color;
          ctx.fillRect(x, y, cellSize, cellSize);

          // Draw stitch visual
          if (!isPreviewMode || !showColorOnly) {
            ctx.fillStyle = "#333333";
            ctx.font = "bold 10px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(activeStitch.label, x + cellSize / 2, y + cellSize / 2);
          }
        }

        // Draw border
        if (showGridLines) {
          ctx.strokeStyle = "#e5e7eb";
          ctx.lineWidth = 0.5;
          ctx.strokeRect(x, y, cellSize, cellSize);
        }
      }
    }

    const imgUri = canvas.toDataURL("image/png");
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", imgUri);
    linkElement.setAttribute("download", `${patternName.replace(/\s+/g, "_")}.png`);
    linkElement.click();
  };

  return (
    <div style={styles.container}>
      {/* Top Controls Bar */}
      <div style={styles.topBar}>
        <div style={styles.brandContainer}>
          <Sparkles size={24} color="palevioletred" style={{ marginRight: "8px" }} />
          <h2 style={styles.title}>Crochet & Knitting Pattern Playground</h2>
        </div>

        <div style={styles.modeToggles}>
          <button
            onClick={() => setIsPreviewMode(false)}
            style={{
              ...styles.modeBtn,
              ...(isPreviewMode ? {} : styles.modeBtnActive),
            }}
          >
            <Edit3 size={16} style={{ marginRight: "6px" }} /> Edit Mode
          </button>
          <button
            onClick={() => setIsPreviewMode(true)}
            style={{
              ...styles.modeBtn,
              ...(isPreviewMode ? styles.modeBtnActive : {}),
            }}
          >
            <Eye size={16} style={{ marginRight: "6px" }} /> Preview Mode
          </button>
        </div>
      </div>

      <div style={styles.workspaceLayout}>
        {/* Left Sidebar: Stitch Palette */}
        <div style={styles.sidebarLeft}>
          <h3 style={styles.sidebarHeading}>Stitch Palette</h3>

          <div style={styles.paletteList}>
            {/* Eraser Tool */}
            <div
              onClick={() => {
                setIsEraseMode(true);
                setSelectedStitchId("");
              }}
              style={{
                ...styles.stitchCard,
                ...(isEraseMode ? styles.stitchCardSelected : {}),
                backgroundColor: "#fef2f2",
                borderColor: isEraseMode ? "#ef4444" : "rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  ...styles.stitchColorBadge,
                  backgroundColor: "#ef4444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff"
                }}
              >
                <Eraser size={14} />
              </div>
              <div style={styles.stitchDetails}>
                <span style={styles.stitchName}>Eraser</span>
                <span style={styles.stitchLabel}>ERASE</span>
              </div>
            </div>

            {stitches.map((stitch) => {
              const isSelected = selectedStitchId === stitch.id && !isEraseMode;
              return (
                <div
                  key={stitch.id}
                  onClick={() => {
                    setSelectedStitchId(stitch.id);
                    setIsEraseMode(false);
                  }}
                  style={{
                    ...styles.stitchCard,
                    ...(isSelected ? styles.stitchCardSelected : {}),
                  }}
                >
                  <div
                    style={{
                      ...styles.stitchColorBadge,
                      backgroundColor: stitch.color,
                    }}
                  >
                    {stitch.symbol || stitch.label[0]}
                  </div>
                  <div style={styles.stitchDetails}>
                    <span style={styles.stitchName}>{stitch.name}</span>
                    <span style={styles.stitchLabel}>{stitch.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Custom Stitch Form */}
          <div style={styles.customStitchBox}>
            <h4 style={styles.customStitchTitle}>Create Custom Stitch</h4>
            <form onSubmit={handleAddCustomStitch} style={styles.customStitchForm}>
              <input
                type="text"
                placeholder="Stitch Name (e.g. Puff)"
                value={newStitchName}
                onChange={(e) => setNewStitchName(e.target.value)}
                style={styles.formInput}
              />
              <div style={styles.formRow}>
                <input
                  type="text"
                  placeholder="Label (max 3 chars)"
                  maxLength={3}
                  value={newStitchLabel}
                  onChange={(e) => setNewStitchLabel(e.target.value)}
                  style={{ ...styles.formInput, flex: 2 }}
                />
                <input
                  type="text"
                  placeholder="Symbol (★)"
                  maxLength={1}
                  value={newStitchSymbol}
                  onChange={(e) => setNewStitchSymbol(e.target.value)}
                  style={{ ...styles.formInput, flex: 1 }}
                />
              </div>
              <div style={styles.formColorRow}>
                <label style={styles.colorLabel}>Color:</label>
                <input
                  type="color"
                  value={newStitchColor}
                  onChange={(e) => setNewStitchColor(e.target.value)}
                  style={styles.colorPicker}
                />
                <button type="submit" style={styles.addBtn}>
                  <Plus size={16} /> Add
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Center: Grid Canvas */}
        <div style={styles.canvasContainer}>
          {/* Canvas controls panel */}
          <div style={styles.canvasControls}>
            <div style={styles.controlGroup}>
              <button
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                style={{
                  ...styles.iconBtn,
                  opacity: historyIndex <= 0 ? 0.4 : 1,
                }}
                title="Undo"
              >
                <Undo2 size={16} />
              </button>
              <button
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                style={{
                  ...styles.iconBtn,
                  opacity: historyIndex >= history.length - 1 ? 0.4 : 1,
                }}
                title="Redo"
              >
                <Redo2 size={16} />
              </button>
            </div>

            <div style={styles.controlGroup}>
              <button onClick={() => setZoom(Math.max(12, zoom - 4))} style={styles.iconBtn} title="Zoom Out">
                <ZoomOut size={16} />
              </button>
              <span style={styles.zoomLabel}>{zoom}px</span>
              <button onClick={() => setZoom(Math.min(48, zoom + 4))} style={styles.iconBtn} title="Zoom In">
                <ZoomIn size={16} />
              </button>
            </div>

            <div style={styles.controlGroup}>
              <button
                onClick={() => setShowGridLines(!showGridLines)}
                style={{
                  ...styles.iconBtn,
                  backgroundColor: showGridLines ? "rgba(219,112,147,0.1)" : "transparent",
                  color: showGridLines ? "palevioletred" : "#777",
                }}
                title="Toggle Grid Lines"
              >
                <Grid size={16} />
              </button>
              {isPreviewMode && (
                <button
                  onClick={() => setShowColorOnly(!showColorOnly)}
                  style={{
                    ...styles.iconBtn,
                    backgroundColor: showColorOnly ? "rgba(219,112,147,0.1)" : "transparent",
                    color: showColorOnly ? "palevioletred" : "#777",
                    fontSize: "11px",
                    fontWeight: 600,
                    width: "auto",
                    padding: "0 8px",
                  }}
                >
                  Color-Only
                </button>
              )}
            </div>

            <button onClick={handleClearGrid} style={styles.clearBtn}>
              <Trash2 size={16} style={{ marginRight: "4px" }} /> Clear Grid
            </button>
          </div>

          {/* Grid Canvas */}
          <div style={styles.canvasScrollWrapper}>
            <div
              ref={canvasContainerRef}
              style={{
                ...styles.gridContainer,
                gridTemplateRows: `repeat(${rows}, ${zoom}px)`,
                gridTemplateColumns: `repeat(${cols}, ${zoom}px)`,
              }}
              onContextMenu={(e) => e.preventDefault()}
            >
              {grid.map((rowArr, r) =>
                rowArr.map((cellStitchId, c) => {
                  const activeStitch = stitches.find((s) => s.id === cellStitchId);
                  const isCellColored = activeStitch !== undefined;
                  const isHoverable = !isPreviewMode;

                  return (
                    <div
                      key={`${r}-${c}`}
                      onMouseDown={(e) => handleMouseDown(r, c, e)}
                      onMouseEnter={() => handleMouseEnter(r, c)}
                      style={{
                        ...styles.gridCell,
                        width: zoom,
                        height: zoom,
                        backgroundColor: activeStitch ? activeStitch.color : "transparent",
                        border: showGridLines ? "1px solid rgba(219,112,147,0.15)" : "none",
                        cursor: isHoverable ? (isEraseMode ? "crosshair" : "cell") : "default",
                      }}
                    >
                      {activeStitch && (!isPreviewMode || !showColorOnly) && (
                        <span
                          style={{
                            ...styles.stitchText,
                            fontSize: `${zoom * 0.4}px`,
                          }}
                        >
                          {activeStitch.label}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Pattern Settings, Load & Save */}
        <div style={styles.sidebarRight}>
          <div style={styles.rightSection}>
            <h3 style={styles.sidebarHeading}>Pattern Details</h3>
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Pattern Name</label>
              <input
                type="text"
                value={patternName}
                onChange={(e) => setPatternName(e.target.value)}
                style={styles.sidebarInput}
              />
            </div>
          </div>

          <div style={styles.rightSection}>
            <h3 style={styles.sidebarHeading}>Grid Size</h3>
            <div style={styles.formRow}>
              <div style={{ flex: 1, marginRight: "8px" }}>
                <label style={styles.inputLabel}>Rows</label>
                <input
                  type="number"
                  min={5}
                  max={100}
                  value={rows}
                  onChange={(e) => resizeGrid(parseInt(e.target.value) || 5, cols)}
                  style={styles.sidebarInput}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.inputLabel}>Columns</label>
                <input
                  type="number"
                  min={5}
                  max={100}
                  value={cols}
                  onChange={(e) => resizeGrid(rows, parseInt(e.target.value) || 5)}
                  style={styles.sidebarInput}
                />
              </div>
            </div>

            <div style={styles.presetButtons}>
              <button onClick={() => resizeGrid(20, 20)} style={styles.presetBtn}>
                20x20
              </button>
              <button onClick={() => resizeGrid(35, 35)} style={styles.presetBtn}>
                35x35
              </button>
              <button onClick={() => resizeGrid(50, 50)} style={styles.presetBtn}>
                50x50
              </button>
            </div>
          </div>

          <div style={styles.rightSection}>
            <h3 style={styles.sidebarHeading}>File Actions</h3>
            <div style={styles.actionsGrid}>
              <button onClick={handleSaveToLocalStorage} style={styles.actionBtn}>
                <Save size={14} /> Save local
              </button>
              <button onClick={handleExportJSON} style={styles.actionBtn}>
                <FileJson size={14} /> Export JSON
              </button>
              <button onClick={handleExportPNG} style={styles.actionBtn}>
                <ImageIcon size={14} /> Export PNG
              </button>
              <label style={styles.importLabelBtn}>
                <Upload size={14} style={{ marginRight: "6px" }} /> Import JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>

          <div style={styles.rightSection}>
            <h3 style={styles.sidebarHeading}>My Stored Patterns</h3>
            {savedPatterns.length === 0 ? (
              <p style={styles.emptyText}>No patterns saved yet.</p>
            ) : (
              <div style={styles.savedPatternsList}>
                {savedPatterns.map((pat) => (
                  <div
                    key={pat.id}
                    onClick={() => handleLoadPattern(pat)}
                    style={styles.savedPatternItem}
                  >
                    <div style={styles.savedPatternMeta}>
                      <div style={styles.savedPatternName}>{pat.name}</div>
                      <div style={styles.savedPatternSub}>
                        {pat.rows}x{pat.cols} • {pat.createdAt}
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDeleteSavedPattern(pat.id, e)}
                      style={styles.deletePatternBtn}
                      title="Delete pattern"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Styling Object
const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    height: "calc(85vh - 40px)",
    background: "#fff9f6",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#524343",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 24px",
    background: "rgba(255, 255, 255, 0.9)",
    borderBottom: "1px solid rgba(219, 112, 147, 0.15)",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 600,
    color: "#9c4f6d",
    fontFamily: "Georgia, serif",
  },
  modeToggles: {
    display: "flex",
    gap: "8px",
  },
  modeBtn: {
    display: "flex",
    alignItems: "center",
    padding: "6px 12px",
    fontSize: "13px",
    fontWeight: 500,
    color: "#7a6268",
    background: "transparent",
    border: "1px solid rgba(219, 112, 147, 0.2)",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  modeBtnActive: {
    background: "palevioletred",
    color: "#ffffff",
    border: "1px solid palevioletred",
  },
  workspaceLayout: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },
  sidebarLeft: {
    width: "280px",
    borderRight: "1px solid rgba(219, 112, 147, 0.15)",
    background: "rgba(255, 255, 255, 0.65)",
    display: "flex",
    flexDirection: "column" as const,
    overflowY: "auto" as const,
    padding: "16px",
    gap: "16px",
  },
  sidebarHeading: {
    margin: "0 0 10px 0",
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    color: "#b0738a",
    letterSpacing: "0.5px",
  },
  paletteList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },
  stitchCard: {
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
    borderRadius: "10px",
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.04)",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(219, 112, 147, 0.03)",
    transition: "all 0.2s ease",
  },
  stitchCardSelected: {
    borderColor: "palevioletred",
    boxShadow: "0 0 0 2px rgba(219, 112, 147, 0.15)",
  },
  stitchColorBadge: {
    width: "30px",
    height: "30px",
    borderRadius: "6px",
    marginRight: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "14px",
    color: "#333",
    border: "1px solid rgba(0,0,0,0.06)",
  },
  stitchDetails: {
    display: "flex",
    flexDirection: "column" as const,
  },
  stitchName: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#4a3e3e",
  },
  stitchLabel: {
    fontSize: "10px",
    color: "#9c888d",
    fontWeight: 600,
  },
  customStitchBox: {
    marginTop: "auto",
    paddingTop: "16px",
    borderTop: "1px dashed rgba(219, 112, 147, 0.2)",
  },
  customStitchTitle: {
    margin: "0 0 10px 0",
    fontSize: "13px",
    fontWeight: 600,
    color: "#9c4f6d",
  },
  customStitchForm: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },
  formInput: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid rgba(219, 112, 147, 0.2)",
    fontSize: "12px",
    outline: "none",
    background: "#ffffff",
  },
  formRow: {
    display: "flex",
    gap: "6px",
  },
  formColorRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "6px",
  },
  colorLabel: {
    fontSize: "11px",
    color: "#7a6268",
  },
  colorPicker: {
    width: "36px",
    height: "24px",
    border: "none",
    padding: 0,
    cursor: "pointer",
    background: "transparent",
  },
  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "6px 12px",
    backgroundColor: "palevioletred",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer",
    fontWeight: 500,
  },
  canvasContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    background: "#fefefe",
    overflow: "hidden",
  },
  canvasControls: {
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    borderBottom: "1px solid rgba(219, 112, 147, 0.1)",
    background: "rgba(255, 255, 255, 0.8)",
    gap: "16px",
  },
  controlGroup: {
    display: "flex",
    alignItems: "center",
    borderRight: "1px solid rgba(219, 112, 147, 0.15)",
    paddingRight: "16px",
    gap: "6px",
  },
  iconBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    borderRadius: "6px",
    border: "1px solid rgba(219, 112, 147, 0.15)",
    background: "#ffffff",
    color: "#7a6268",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  zoomLabel: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#7a6268",
    minWidth: "36px",
    textAlign: "center" as const,
  },
  clearBtn: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    padding: "6px 12px",
    backgroundColor: "#fee2e2",
    color: "#ef4444",
    border: "none",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 500,
    cursor: "pointer",
  },
  canvasScrollWrapper: {
    flex: 1,
    overflow: "auto",
    padding: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle, #fcf6f3 10%, transparent 11%)",
    backgroundSize: "12px 12px",
  },
  gridContainer: {
    display: "grid",
    boxShadow: "0 10px 25px rgba(219, 112, 147, 0.08)",
    backgroundColor: "#ffffff",
    border: "2px solid rgba(219, 112, 147, 0.2)",
    borderRadius: "4px",
    userSelect: "none" as const,
  },
  gridCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.1s ease",
  },
  stitchText: {
    fontWeight: 700,
    color: "rgba(0,0,0,0.6)",
    pointerEvents: "none" as const,
  },
  sidebarRight: {
    width: "280px",
    borderLeft: "1px solid rgba(219, 112, 147, 0.15)",
    background: "rgba(255, 255, 255, 0.65)",
    display: "flex",
    flexDirection: "column" as const,
    overflowY: "auto" as const,
    padding: "16px",
    gap: "20px",
  },
  rightSection: {
    display: "flex",
    flexDirection: "column" as const,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
  },
  inputLabel: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#9c888d",
  },
  sidebarInput: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(219, 112, 147, 0.2)",
    fontSize: "13px",
    outline: "none",
  },
  presetButtons: {
    display: "flex",
    gap: "6px",
    marginTop: "8px",
  },
  presetBtn: {
    flex: 1,
    padding: "6px 0",
    fontSize: "11px",
    fontWeight: 600,
    color: "palevioletred",
    border: "1px solid rgba(219,112,147,0.2)",
    borderRadius: "6px",
    background: "#ffffff",
    cursor: "pointer",
  },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
  },
  actionBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "8px",
    fontSize: "12px",
    fontWeight: 500,
    color: "#524343",
    background: "#ffffff",
    border: "1px solid rgba(219,112,147,0.2)",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  importLabelBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px",
    fontSize: "12px",
    fontWeight: 500,
    color: "#524343",
    background: "#ffffff",
    border: "1px solid rgba(219,112,147,0.2)",
    borderRadius: "8px",
    cursor: "pointer",
  },
  emptyText: {
    fontSize: "12px",
    color: "#9c888d",
    fontStyle: "italic",
    margin: "4px 0",
  },
  savedPatternsList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
    maxHeight: "180px",
    overflowY: "auto" as const,
  },
  savedPatternItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 12px",
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.03)",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  savedPatternMeta: {
    display: "flex",
    flexDirection: "column" as const,
  },
  savedPatternName: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#4a3e3e",
  },
  savedPatternSub: {
    fontSize: "9px",
    color: "#9c888d",
  },
  deletePatternBtn: {
    background: "transparent",
    border: "none",
    color: "#ef4444",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
