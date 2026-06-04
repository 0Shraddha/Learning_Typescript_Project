import { TrashIcon } from "lucide-react";

type PatternItem = {
    id: string;
    type: "row" | "info";
    text: string;
};

type WritePatternsProps = {
    items: PatternItem[];
    onAddItem: (type: "row" | "info") => void;
    onUpdateItem: (id: string, text: string) => void;
    onDeleteItem: (id: string) => void;
};

export const WritePatterns = ({ items, onAddItem, onUpdateItem, onDeleteItem }: WritePatternsProps) => {
    let rowCount = 0;
    let infoCount = 0;

    return (
        <div className="container" style={{ width: "100%" }}>
            <div className="rows-wrapper">
                {items.length === 0 && (
                    <div className="info-container">
                        <span style={{ fontSize: '12px', color: 'gray' }}>
                            No steps yet — add a row or info block above
                        </span>
                    </div>
                )}

                {items.map((item) => {
                    if (item.type === "row") {
                        rowCount++;

                        return (
                            <div key={item.id} className="step-card">
                                <div className="step-header">
                                    <div className="step-number">Row {rowCount}</div>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={item.text}
                                        placeholder="In MR, 6 SC"
                                        onChange={(e) => onUpdateItem(item.id, e.target.value)}
                                    />
                                    <button className="delete-btn" onClick={() => onDeleteItem(item.id)}>
                                        <TrashIcon size={16} />
                                    </button>
                                </div>
                            </div>
                        );
                    }

                    infoCount++;

                    return (
                        <div key={item.id} className="step-card info-card">
                            <div className="step-header">
                                <div className="step-number">Info {infoCount}</div>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={item.text}
                                    placeholder="Fasten off the thread"
                                    onChange={(e) => onUpdateItem(item.id, e.target.value)}
                                />
                                <button className="delete-btn" onClick={() => onDeleteItem(item.id)}>
                                    <TrashIcon size={16} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="actions">
                <button className="submit-btn" type="button" onClick={() => onAddItem("row")}>
                    + Add Row
                </button>
                <button className="submit-btn" type="button" onClick={() => onAddItem("info")}>
                    + Add Info
                </button>
            </div>
        </div>
    );
};