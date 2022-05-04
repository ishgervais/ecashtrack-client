/* eslint-disable @next/next/no-img-element */
type AvatarHolder = {
    size?: string
    image: string
}
export default function AvatarHolder(props: AvatarHolder) {
    return (
        <div
            className={`
            bg-gray-100 rounded-full

        ${
            props.size === 'sm'
                ? 'w-8 h-8'
                : props.size === 'md'
                ? 'w-20 h-20'
                : 'w-32 h-32'
        }
        
        
        `}
        >
            <img
                src={props.image}
                alt=""
                className={`
              bg-gray-100 rounded-full

              ${
                  props.size === 'sm'
                      ? 'w-8 h-8'
                      : props.size === 'md'
                      ? 'w-20 h-20'
                      : 'w-32 h-32'
              }
              `}
            />
        </div>
    )
}
