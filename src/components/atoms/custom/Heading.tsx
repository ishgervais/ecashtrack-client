type HeadingTypes = {
    uppercase?: boolean
    capitalize?: boolean
    size?: string
    bold?: boolean
    center?: boolean
    title: any
    margin?: boolean
    color?: string
}
export default function Heading(props: HeadingTypes) {
    return (
        <h1
            className={`
        ${props.uppercase && 'uppercase'}
        ${props.capitalize && 'capitalize '}
        text-${props.size ? props.size : 'sm '}
        ${props.bold && 'font-bold'}
        ${props.center && 'text-center'}
        ${props.margin && 'my-3'}
        ${props.color && 'text-' + props.color}

        `}
        >
            {props.title}
        </h1>
    )
}
