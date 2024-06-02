import ButtonGroup from "../../../Components/Buttons&Links/ButtonGroup";

interface employee{
    id: string,
    user_id: string,
    email: string,
    username: string,
    phonenumber: string,
    designation: string,
    hired_on: Date,
    role: string,
    status: string,
    image?:string,
    departmentName:string;
    companyName:string;
    days_employed:string
}

interface Props{
  employees:employee[]
  handleEditEmployee:(id:string)=>void
}
const EmployeesTable = ({employees, handleEditEmployee}:Props) => {
  const created_date = (hired_on:Date) => {
    const date = new Date(hired_on)
    return date.toDateString()
}  
  return (
<div className="overflow-x-auto">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        <th className="whitespace-nowrap sm:px-1 py-2 font-medium text-gray-900">Employee Name</th>
        <th className="whitespace-nowrap sm:px-1 py-2 font-medium text-gray-900">Email Address</th>
        <th className="whitespace-nowrap sm:px-1 py-2 font-medium text-gray-900">Mobile Number</th>
        <th className="whitespace-nowrap sm:px-1 py-2 font-medium text-gray-900">Hired On</th>
        <th className="whitespace-nowrap sm:px-1 py-2 font-medium text-gray-900">Days Employed</th>
        <th className="whitespace-nowrap sm:px-1 py-2 font-medium text-gray-900">Company Name</th>
        <th className="whitespace-nowrap sm:px-1 py-2 font-medium text-gray-900">Department Name</th>
        
        <th className=" py-2"></th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200 text-center">
      {
        employees?.length?
          employees.map(emp=>(
            <tr key={emp.user_id}>
              <td className="whitespace-nowrap sm:px-1 py-2 font-medium text-gray-900">{emp.username}</td>
              <td className="whitespace-nowrap sm:px-1 py-2 text-gray-700">{emp.email}</td>
              <td className="whitespace-nowrap sm:px-1 py-2 text-gray-700">{emp.phonenumber}</td>
              <td className="whitespace-nowrap sm:px-1 py-2 text-gray-700">{created_date(emp.hired_on)}</td>
              <td className="whitespace-nowrap sm:px-1 py-2 text-gray-700">{emp.days_employed}</td>
              <td className="whitespace-nowrap sm:px-1 py-2 text-gray-700">{emp.companyName}</td>
              <td className="whitespace-nowrap sm:px-1 py-2 text-gray-700">{emp.departmentName}</td>
              <td className="whitespace-nowrap sm:px-1 py-2 flex gap-3">
                <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
                  <button
                    onClick={()=>handleEditEmployee(emp.id)}
                    className="inline-block border-e p-2 text-gray-700 hover:bg-gray-50 focus:relative"
                    title="Edit Product"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>

                  <button
                    className="inline-block p-2 hover:bg-gray-50 focus:relative text-red-600"
                    title="Delete Product"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </span>
              </td>
            </tr>
          ))
          :null
      }

      
    </tbody>
  </table>
</div>
  )
}

export default EmployeesTable
