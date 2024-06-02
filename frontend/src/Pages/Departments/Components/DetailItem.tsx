
const DetailItem = ({icon, name, value}:{name:string, value: string, icon?:React.ReactNode}) => {
  return (
    <div className="flex items-center gap-5">
        <span className="font-bold flex items-center gap-2 text-primary"> 
            <div className="text-md">{icon}</div>
            {name}
        </span>  
        <div className="font-semibold">{value}</div>
      </div>
  )
}

export default DetailItem
