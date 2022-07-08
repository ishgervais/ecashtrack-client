export default function DropdownTemplate(props: { children: object }) {
    return (
        <div className="text-xs text-gray-600 w-56 left-0 my-5 rounded p-5 absolute bg-white right-0 shadow-gray-300 shadow-2xl">
            {props.children}
        </div>
    )
}
