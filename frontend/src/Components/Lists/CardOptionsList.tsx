import { useEffect, useState } from 'react'
import EmptyContent from '../Common/EmptyContent';
import { ImageSkeleton, Spinner } from '../Common';
import { BasicCard } from '../Cards';
import BasicCardWithOptions from '../Cards/BasicCardWithOptions';



interface card{
    id: string,
    name: string,
    description: string,
    created_at: Date,
}
interface props{
    cards: card[],
    handleDelete:(id:string)=>void
}
const CardOptionsList = ({cards, handleDelete}:props) => {

  const [waitingDelay, setWaitingDelay] = useState(true)
  
  

  const handleImageSkeleton = ()=>{
    let total = [];
    for(let i=0; i < 10; i ++)
        total.push(<ImageSkeleton key={i} width='100%' height='300px' rounded='10px' />)
    return total
  }
  useEffect(()=>{
    setTimeout(()=>{
      setWaitingDelay(false)
    },3000)
  },[])
  return (
    <div>
    {
      (!cards?.length) && waitingDelay ?
        <div className="flex justify-center">
          <Spinner md />
        </div>
      :null
    }
    

      {
        waitingDelay || cards?.length?
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-3">
            {
            cards?.length?
              cards.map(card=>(
                  <BasicCardWithOptions
                        card={card} 
                        key={card.id}
                        handleDelete={handleDelete}
                    />
                ))
              :
              handleImageSkeleton()
            }
          </div>
        :
          <EmptyContent />
        
      }
    </div>
  )
}

export default CardOptionsList
