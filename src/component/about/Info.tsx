type InfoProps  = {
    name : string,
    bio : string,
    styles: React.CSSProperties
}

export const Info = (props : InfoProps) => {
    return (
        <>
        <h1 style={props.styles}>{props.name}</h1>
        <span>{props.bio}</span>
        </>
    )
}