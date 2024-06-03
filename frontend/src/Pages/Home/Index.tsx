import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import Companies from "./UI/Companies"
import { useEffect } from "react"

const Index = () => {
  const {user} = useAppSelector(state=>state.auth)
  const nav = useNavigate()
  useEffect(()=>{
    console.log(user?.company_id);
    
    if (user?.company_id){
      return nav(`/companies/${user?.company_id}/dashboard`)
    }
    if(user?.role !== "Admin")
      return nav(`/companies`)
  },[user?.company_id])
 
  return (
    <div className="lg:w-[80%] min-h-screen w-full mx-auto bg-white rounded-lg my-3 overflow-hidden">
      
      <div className="p-4">
        <Companies />
      </div>
    </div>
  )
}

export default Index
