type MainHeading = {
    //Type for Component?
    children: React.ReactNode
}

export const MainHeading = (props: MainHeading) => {
    return (
        <>
        <h1>{props.children}</h1>
        </>
    )
}