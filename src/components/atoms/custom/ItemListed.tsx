type ItemListedType = {
    title:string
}

export default function ItemListed(props:ItemListedType){
    return(
        <span className="block p-2 hover:shadow-lg hover:shadow-blue-300 hover:bg-primary hover:text-white rounded"
        >{props.title}</span>
    )
}