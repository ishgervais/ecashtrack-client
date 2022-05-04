import Link from 'next/link'
import { useRouter } from 'next/router'
import { LinkProps } from 'src/types'

export default function ActiveLink(props: LinkProps): JSX.Element {
    const router = useRouter()
    // let pathName = router.pathname.split('/')[2];
    // let href= props.href.split('/')[2]
    return (
        <div
            className="cursor-pointer"
            onClick={() => router.push(props.href)}
        >
            {/* {(href === pathName || linkHover) && <ActiveCircle />} */}
            <Link href={props.href}>
                <a
                    className={` 
                    ${props.href === router.pathname && 'bg-primary text-white'}
                    ${props.padding ? props.padding : 'p-3'}
                    text-sm flex items-center gap-2 hover:bg-primary hover:text-white my-2`}
                >
                    {/* {props.href} {router.pathname} */}
                    {props.children}
                </a>
            </Link>
        </div>
    )
}
