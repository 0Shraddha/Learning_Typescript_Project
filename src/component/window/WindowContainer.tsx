type WindowContainerProps = {
  children: React.ReactNode;
  pageName?: string;
};

export const WindowContainer = ({
  children,
  pageName = "Dream Page",
}: WindowContainerProps) => {
  return (
    <div
      style={{
        minHeight: "85vh",
        margin: "0 40px",
        borderRadius: "22px",
        overflow: "hidden",

        background: "rgba(255, 255, 255, 0.76)",

        /* dreamy vintage background */
        // background:
        //   "linear-gradient(145deg, antiquewhite 0%, #fff7f5 40%,rgba(255, 238, 228, 0.86) 100%)",

        /* glassy effect */
        // backdropFilter: "blur(2px)",

        /* soft border */
        border: "1px solid rgb(255, 255, 255)",
        position: "relative",

      }}
    >

      {/* browser top bar */}
      <div
        style={{
          height: "40px",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          background: "rgba(255,255,255,0.35)",
          borderBottom: "1px solid rgba(190, 120, 150, 0.15)",

          backdropFilter: "blur(10px)",
        }}
      >
        {/* fake browser buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#ffb3c7",
            }}
          />

          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#ffe0a3",
            }}
          />

          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#c5e8c7",
            }}
          />
        </div>

        {/* dreamy title */}
        <p
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 600,
            letterSpacing: "1px",
            color: "#9c4f6d",
            fontFamily: "'Georgia', serif",
          }}
        >
          ✿ {pageName}
        </p>

        {/* actions
        <div
          style={{
            color: "#b76e8a",
            fontSize: "22px",
            letterSpacing: "4px",
          }}
        >
          ⋯
        </div> */}
      </div>

      {/* content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {children}
      </div>
    </div>
  );
};