import { Link } from "react-router-dom"

interface data{
    id: string,
    user_id: string,
    email: string,
    username: string,
    phonenumber: string,
    designation: string,
    hired_on: Date,
    role: string,
    stage: string,
    image?:string;
    departmentName: string;
    companyName: string;
  }

interface props{
    data:data
}
const EmployeeCard = ({data}:props) => {
    console.log(data);
    
    const created_date = () => {
        const date = new Date(data.hired_on)
        return date.toDateString()
    }    
  return (
    <div className="relative w-full flex flex-col mt-6 text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl">
        {
            data.image?
                <div
                    className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                    <img
                        src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                        alt="card-image" 
                    />
                </div>
            :null
        }
        <div className="p-6">
            <h5 className="block mb-0 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {data?.username}
            </h5>
            <span className=" text-gray-500 text-sm">{data.departmentName} at {data.companyName}</span>
            
            <ul className="list-inside ml-1 mt-4 space-y-2">
                <li>job title: {data?.designation} </li>
                <li>email: {data.email}</li>
                <li>Phone Number: {data.phonenumber}</li>
                <li>
                    {
                        data?.stage === 'Hired'?
                            <span>hired on: {created_date()}</span>
                        :
                            <span>status: {data?.stage}</span>

                    }
                </li>
            </ul>

        </div>
        <div className="p-6 pt-0">
            <Link
                to={`/employees/${data.id}`}
             className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
             type="button"
            >
                Details
            </Link>
        </div>
    </div>  
  )
}

export default EmployeeCard
