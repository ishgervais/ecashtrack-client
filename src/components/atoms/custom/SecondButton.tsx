import { ButtonProps } from "src/types";

export default function SecondButton(props: ButtonProps) {
    return (
        <button className={
            `
${props.padding ? props.padding : 'p-4'}
            ${props.color ? props.color : 'text-white '}
            ${props.bgColor ? props.bgColor : 'bg-primary '}
            ${props.loading && 'opacity-60'}
            hover:shadow-xl
            ${props.shadow ? props.shadow : 'hover:shadow-green-100 '}
            w-full rounded
            ${props.disabled && 'cursor-not-allowed'}
            
            `
        }
            onClick={props.handleClick && props.handleClick}
            disabled={props.disabled}
        >{props.loading ? props.loadingTitle : props.title}</button>

    )
}