type HeadingProps = {
    children: string
}

export const Heading = (props: HeadingProps) => {
    return <span>{props.children}</span>
}