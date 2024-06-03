import { useParams } from "react-router-dom"
import { useGetCompaniesEmployeesQuery } from "../../../redux/api/companies"
import { GoPlus } from "react-icons/go"
import { useState } from "react"
import OverLay from "../../../Components/Modals/OverLay"
import CreateEmployees from "../../Employees/CreateEmployees"
import EmployeesTable from "../../Employees/Components/EmployeesTable"
import EditEmployee from "../../Employees/EditEmployee"
import DeleteModal from "../../../Components/Modals/DeleteModal"
import { useDeleteEmployeeMutation } from "../../../redux/api/employees"
import { toast } from "react-toastify"

const CompanyEmployees = () => {
    const {company_id} = useParams()
    const {data} = useGetCompaniesEmployeesQuery({company_id})
    const [deleteEmployee] = useDeleteEmployeeMutation()
    const [overLay, setOverLay] = useState(false)
    const [editOverLay, setEditOverLay] = useState(false)
    const [editEmpId, setEditEmpId] = useState('')
    const [deleteEmp, setDeleteEmp] = useState(false)
    const [deletedEmpId, setDeleteEmpId] = useState('')
    const handleOverLay = () =>{
        setOverLay(!overLay)
    }
    const handleEditOverLay = () =>{
        setEditOverLay(!editOverLay)
    }
    const handleEditEmployee=(id:string)=>{
        setEditEmpId(id)
        handleEditOverLay()
        
    }
    const handleDeleteModal=()=>{
        setDeleteEmp(!deleteEmp)
    }
    const handleDeleteEmployee=(id:string)=>{
        setDeleteEmp(!deleteEmp)
        setDeleteEmpId(id)
        
    }
    const deleteAction=()=>{
        console.log(deletedEmpId);
        if(deletedEmpId){
            deleteEmployee({employee_id:deletedEmpId, company_id})
            .unwrap()
            .then(data=>{
                toast.success(data?.message)
            }).catch(err=>{
                toast.error(err?.data?.message)
            })
            handleDeleteModal()
            setDeleteEmpId('')
        }
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
        <OverLay 
            toggleDetails={editOverLay}
            handleToggler={handleEditOverLay}
        >
            {
                editEmpId?
                    <EditEmployee
                        employee_id={editEmpId}
                        handleOverLay={handleEditOverLay}
                    />
                :null
            }
        </OverLay>
        <DeleteModal 
            title='Delete Employee'
            open={deleteEmp}
            handleClose={handleDeleteModal}
            isLoading={false}
            deleteAction={deleteAction}
        >
            Are you sure you want to delete  
            <span className='font-bold px-1'>
             '
            {
                deletedEmpId?
                    data?.employees?.find((i:any)=>i.id === deletedEmpId).username
                :null
            }
            ' 
            </span>
            from company

            ?
        </DeleteModal>
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
                            handleDeleteEmployee={handleDeleteEmployee}
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
