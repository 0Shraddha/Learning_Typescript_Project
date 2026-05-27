import React from "react"

type StyleProps = {
    styles : React.CSSProperties;
}

export const StylePropsDemo = (props : StyleProps) => {
    return (
        <div style={props.styles}>
            <p>Hi this is Style Props</p>
        </div>
    )
} 