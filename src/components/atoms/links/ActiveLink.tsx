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
                    ${props.href === router.pathname && 'bg-blue-50'}
                    ${props.padding ? props.padding : 'p-3'}
                    text-sm flex items-center gap-2 hover:bg-blue-50 text-gray-600 my-2`}
                >
                    {/* {props.href} {router.pathname} */}
                    {props.children}
                </a>
            </Link>
        </div>
    )
}
