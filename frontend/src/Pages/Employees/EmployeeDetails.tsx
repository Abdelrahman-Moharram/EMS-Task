import { useGetEmployeeDetailsQuery } from '../../redux/api/employees'
import { useParams } from 'react-router-dom'

const EmployeeDetails = () => {
    const {employee_id} = useParams()
    const {data} = useGetEmployeeDetailsQuery({employee_id})   
  return (
    <div className='lg:w-[80%] min-h-screen  w-full mx-auto bg-white rounded-lg my-3 overflow-hidden p-5 pb-3'>
      <h1 className='text-2xl font-extrabold p-2'>
        {data?.employee.username}
        <span className='text-gray-700 text-sm font-light block'>( {data?.employee.designation} at {data?.employee.companyName} )</span>
      </h1>
      <div className='p-5 shadow-md rounded-md w-full relative my-10 space-y-3'>
        <ul className='list-inside space-y-3'>

            <li className=''>
                Email: <span className='font-semibold'>{data?.employee?.email}</span>
            </li>
            
            <li className=''>
                Company: <span className='font-semibold'>{data?.employee?.companyName}</span>
            </li>
            <li className=''>
                Department: <span className='font-semibold'>{data?.employee?.departmentName}</span>
            </li>

            <li className=''>
                Address: <span className='font-semibold'>{data?.employee?.address}</span>
            </li>
            <li className=''>
                Mobile: <span className='font-semibold'>{data?.employee?.phonenumber}</span>
            </li>
            {
                data?.employee.stage === 'Hired'?
                <>
                
                    <li className=''>
                        Role: <span className='font-semibold'>{data?.employee?.role}</span>
                    </li>
                    <li className=''>
                        Worked Since :  
                        <span className='font-semibold ml-1'>
                            {data?.employee?.days_employed} 
                            {
                                data?.employee?.days_employed > 1?
                                    ' days ago'
                                :' day ago'
                            }
                        </span>
                    </li>
                </>
                :
                <li className=''>
                    Status: <span className='font-semibold'>{data?.employee?.stage}</span>
                </li>
            }
        </ul>

        
      </div>
    </div>
  )
}

export default EmployeeDetails
