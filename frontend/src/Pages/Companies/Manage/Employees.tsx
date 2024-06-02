import { useParams } from "react-router-dom"
import { useGetCompaniesEmployeesQuery } from "../../../redux/api/companies"
import { GoPlus } from "react-icons/go"
import { useState } from "react"
import OverLay from "../../../Components/Modals/OverLay"
import CreateEmployees from "../../Employees/CreateEmployees"
import EmployeesTable from "../../Employees/Components/EmployeesTable"

const CompanyEmployees = () => {
    const {company_id} = useParams()
    const {data} = useGetCompaniesEmployeesQuery({company_id})
    const [overLay, setOverLay] = useState(false)
    const handleOverLay = () =>{
        setOverLay(!overLay)
    }
    const handleEditEmployee=(id:string)=>{
        console.log(id);
        
    }
  return (
    <>
        <OverLay 
            toggleDetails={overLay}
            handleToggler={handleOverLay}
        >
            <CreateEmployees 
                handleOverLay={handleOverLay}
            />
        </OverLay>
        <div className="p-5 mt-7 min-h-screen">
                <button
                    onClick={handleOverLay}
                    className="flex items-center gap-1 w-fit px-8 py-3 border border-primary rounded-md my-3 hover:bg-primary transition-all hover:text-white"
                >
                    <GoPlus /> Create
                </button>
            
            <div className="my-5">
                {
                    data?.employees?
                        <EmployeesTable 
                            employees={data.employees}
                            handleEditEmployee={handleEditEmployee}
                        />
                    :null
                }
            </div>
        </div>
    </>
  )
}

export default CompanyEmployees
