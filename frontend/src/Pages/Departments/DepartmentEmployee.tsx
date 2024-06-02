import { useParams } from "react-router-dom"
import EmployeeCardsList from "../../Components/Lists/EmployeeCardsList"
import { useGetDepartmentEmployeesQuery } from "../../redux/api/departments"

const DepartmentEmployee = () => {
    const {department_id} = useParams()
    const {data} = useGetDepartmentEmployeesQuery({department_id})
  return (
    <div className="p-5 mt-7 min-h-screen">
      <EmployeeCardsList 
        cards={data?.employees}
      />
    </div>
  )
}

export default DepartmentEmployee
