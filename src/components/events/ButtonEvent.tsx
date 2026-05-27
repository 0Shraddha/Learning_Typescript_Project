type ButtonEventProps = {
    handleClick : (event : React.MouseEvent<HTMLButtonElement>, id: number) => void
}

export const ButtonEvent = (props: ButtonEventProps) => {
    return (
        <>
        <button onClick={(event) => props.handleClick(event,1)}>Click me</button>
        </>
    )
}