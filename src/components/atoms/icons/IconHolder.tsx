type IconHolderType = {
    icon: object
    size?: string
    active?: boolean
    static?: boolean
    bgColor?:string
    handleClick?: ()=>void
}
export default function IconHolder(props: IconHolderType) {
    return (
        <div
            className={`${
                props.static ? (props.active
                    ? 'bg-primary text-white'
                    : 'bg-green-50 text-primary') : props.bgColor + ' text-white'
            } flex items-center justify-center  rounded-full
            hover:bg-primary hover:text-white cursor-pointer p-2
        ${
            props.size === 'sm'
                ? 'h-7 w-7'
                :props.size === 'md-sm'
                ?'h-10 w-10'
                : props.size === 'md'
                ? 'h-16 w-16'
                : props.size === 'lg'
                ? 'h-20 w-20'
                : 'h-24 w-24'
        }
        
        `}

        onClick={props.handleClick}
        >
            {props.icon}
        </div>
    )
}
