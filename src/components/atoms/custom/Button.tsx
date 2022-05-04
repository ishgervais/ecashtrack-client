import { ButtonProps } from "src/types";
import router from 'next/router'

export default function Button(props: ButtonProps) {
    return (
        <button className={
            `
            p-4 
            ${props.color ? props.color : 'text-white '}
            ${props.bgColor ? props.bgColor : 'bg-primary '}
            ${props.loading && 'opacity-60'}
            hover:shadow-lg
            ${props.shadow ? props.shadow : 'hover:shadow-blue-300 '}
            w-full rounded
            ${props.disabled && 'cursor-not-allowed'}
            
            `
        }
            onClick={() => props.path && router.push(props.path)}
            disabled={props.disabled}
            type = {props.type ==='submit' ? 'submit': 'button'}
        >{props.loading ? props.loadingTitle : props.title}</button>

    )
}