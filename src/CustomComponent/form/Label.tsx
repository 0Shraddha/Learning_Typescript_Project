

export default function Label({name, isRequired} : {name : string, isRequired : boolean}) {
    return (
        <label htmlFor="title" style={{ color: "palevioletred", fontSize: "1rem", textTransform: "uppercase" , fontWeight: 600, letterSpacing: "1px", margin: "12px 0!important", padding: "12px 0 !important"}}>
            {name}
            {isRequired && <span style={{ color: "palevioletred" }}>*</span>}
        </label>
    )
}

