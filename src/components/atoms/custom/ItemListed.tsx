type ItemListedType = {
    title:string
}

export default function ItemListed(props:ItemListedType){
    return(
        <span className="block p-2 hover:shadow-xl hover:shadow-green-100 hover:bg-primary hover:text-white rounded"
        >{props.title}</span>
    )
}