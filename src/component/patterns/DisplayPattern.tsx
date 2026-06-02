
export const DisplayPattern = () => {
    const pattern = JSON.parse(localStorage.getItem("pattern") || "{}");

    return (
        <div className="display-pattern-wrapper">
            {pattern.videoUrl ? (
                <div className="video">
                    <video controls>
                        <source src={pattern.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            ) : (
                <div className="video empty">No tutorial video uploaded yet.</div>
            )}

            <div className="pattern-info">
                <div className="pattern">
                    {pattern.imageUrl ? (
                        <img src={pattern.imageUrl} alt={pattern.title} />
                    ) : (
                        <div className="image-placeholder">No pattern image uploaded yet.</div>
                    )}
                    <h2 className="pattern-title">{pattern.title}</h2>
                </div>

                <div className="pattern-description">
                    <strong>Description:</strong> {pattern.description || "No description provided."}
                </div>

                <div className="pattern-steps">
                    <strong>Pattern Steps:</strong>
                    {pattern.steps && pattern.steps.length > 0 ? (
                        pattern.steps.map((step: any, index: number) => (
                            <div key={step.id || index} className={`pattern-row ${step.type}`}>
                                <strong>{step.type === "row" ? `Row ${index + 1}` : `Info ${index + 1}`}:</strong>
                                <span>{step.text}</span>
                            </div>
                        ))
                    ) : (
                        <div className="pattern-row">No steps yet.</div>
                    )}
                </div>

                <span className="pattern-badge">
                    <strong>Hook Size:</strong> {pattern.hook || "N/A"}
                </span>
                <span className="pattern-badge">
                    <strong>Wool Type:</strong> {pattern.woolType || "N/A"}
                </span>
                <span className="pattern-badge">
                    <strong>Colors:</strong> {pattern.woolColors || "N/A"}
                </span>
                {/* <span className="pattern-badge">
                    <strong>Price:</strong> {pattern.price != null ? pattern.price : "N/A"}
                </span> */}
            </div>
        </div>
    );
}