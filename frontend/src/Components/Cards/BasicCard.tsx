import { Link } from "react-router-dom"
import { HiBuildingOffice } from "react-icons/hi2";

interface card{
    id: string
    name: string
    created_at: Date
    description: string
}

const BasicCard = ({card, prefix}:{card:card, prefix? :string|undefined}) => {
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
        {
            prefix?
                <Link to={prefix + card.id} className="group absolute bottom-7 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                    Find out more

                    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                        &rarr;
                    </span>
                </Link>
            : null
        }
    </article>
  )
}

export default BasicCard
