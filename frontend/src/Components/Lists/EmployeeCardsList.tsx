import { useEffect, useState } from 'react'
import EmptyContent from '../Common/EmptyContent';
import { ImageSkeleton, Spinner } from '../Common';
import EmployeeCard from '../Cards/EmployeeCard';



interface card{
    id: string,
    user_id: string,
    email: string,
    username: string,
    phonenumber: string,
    designation: string,
    hired_on: Date,
    role: string,
    stage: string,
    image?:string,
    departmentName:string;
    companyName:string
  }
interface props{
    cards: card[],
}
const EmployeeCardsList = ({cards}:props) => {

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
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-center gap-3">
            {
            cards?.length?
              cards.map(card=>(
                    <EmployeeCard 
                        data={card} 
                        key={card.id} 
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

export default EmployeeCardsList
