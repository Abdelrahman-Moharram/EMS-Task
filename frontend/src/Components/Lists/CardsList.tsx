import { useEffect, useState } from 'react'
import EmptyContent from '../Common/EmptyContent';
import { ImageSkeleton, Spinner } from '../Common';
import { BasicCard } from '../Cards';



interface card{
    id: string,
    name: string,
    description: string,
    created_at: Date,
}
interface props{
    cards: card[],
    prefix?: string | undefined
}
const CardsList = ({cards, prefix}:props) => {

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
                  <BasicCard prefix={prefix} card={card} key={card.id} />
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

export default CardsList
