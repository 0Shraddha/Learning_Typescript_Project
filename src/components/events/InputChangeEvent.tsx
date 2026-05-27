type InputChangeProps = {
    value: string,
    handleChange : (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputChangeEvent = ({value, handleChange} : InputChangeProps) => {
    return (
        <input type="text" value={value} onChange={handleChange} />
    )
}