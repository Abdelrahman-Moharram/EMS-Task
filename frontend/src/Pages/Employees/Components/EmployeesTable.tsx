import { FaEdit, FaEye } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";

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
  handleDeleteEmployee:(id:string)=>void
}
const EmployeesTable = ({employees, handleEditEmployee, handleDeleteEmployee}:Props) => {
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
                <Link
                    to={`/employees/${emp.id}`}
                    className="inline-block border-e p-2 text-green-600 hover:bg-gray-50 focus:relative"
                    title="View Employee"
                  >
                    <FaEye />
                  </Link>
                  <button
                    onClick={()=>handleEditEmployee(emp.id)}
                    className="inline-block border-e p-2 text-blue-700 hover:bg-gray-50 focus:relative"
                    title="Edit Employee"
                  >
                    <FaEdit />
                  </button>
                  
                  <button
                    onClick={()=>handleDeleteEmployee(emp.id)}
                    className="inline-block p-2 hover:bg-gray-50 focus:relative text-red-600"
                    title="Delete Employee"
                  >
                    <GoTrash />
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
