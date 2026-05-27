type CardProps = {
    title: string,
    count: number,
    cardStyles?: React.CSSProperties,
    headingStyles?: React.CSSProperties,
    countStyles?: React.CSSProperties,
}

export const CardComponent = ({
    title,
    count,
    cardStyles,
    headingStyles,
    countStyles
}: CardProps) => {

    return (
        <div
            style={{
                background: "#fff8f5",
                borderRadius: "28px",
                padding: "24px",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",

                boxShadow:
                    "0 8px 24px rgba(219, 112, 147, 0.15)",

                transition: "0.3s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",

                ...cardStyles
            }}
        >

            <h3
                style={{
                    color: "palevioletred",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    marginBottom: "12px",
                    zIndex: 2,
                    letterSpacing: "0.5px",

                    ...headingStyles
                }}
            >
                {title}
            </h3>

            <span
                style={{
                    background: "palevioletred",
                    color: "white",
                    width: "fit-content",
                    padding: "10px 18px",
                    borderRadius: "12px",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    zIndex: 2,

                    ...countStyles
                }}
            >
                {count}
            </span>
        </div>
    )
}