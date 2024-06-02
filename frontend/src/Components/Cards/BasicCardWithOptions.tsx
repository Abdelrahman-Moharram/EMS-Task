import { HiBuildingOffice } from "react-icons/hi2";
import ButtonGroup from "../Buttons&Links/ButtonGroup";

interface card{
    id: string
    name: string
    created_at: Date
    description: string
    
}
interface Props{
    card: card
    handleDelete:(id:string)=>void
    handleEdit:(id:string)=>void
}

const BasicCardWithOptions = ({card, handleDelete, handleEdit}:Props) => {
  return (
    <article
     className="rounded-lg relative border h-[270px] border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6"
    >
    <span className="inline-block rounded bg-blue-600 p-2 text-white">
    <HiBuildingOffice />
    </span>

    <h3 className="mt-0.5 text-lg font-medium text-gray-900">
        {card.name}
    </h3>

    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
        {card.description}
    </p>
        <div className="absolute w-[70%] bottom-5 left-1/2 transform -translate-x-1/2">
            <ButtonGroup 
                id={card.id}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </div>
    </article>
  )
}

export default BasicCardWithOptions
