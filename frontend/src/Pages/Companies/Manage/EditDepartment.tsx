import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import DepartmentForm from '../components/DepartmentForm'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEditDepartmentMutation, useGetCompanyDepartmentFormQuery } from '../../../redux/api/departments'



const EditDepartment = () => {
    const {department_id, company_id} = useParams();
    const {data, isLoading:DepartmentLoading} = useGetCompanyDepartmentFormQuery({department_id, company_id})
    const [DepartmentEdit, {isLoading}] = useEditDepartmentMutation()
    const [department, setDepartment] = useState({
      id:'',
      name:'',
      description:''
    })
    useEffect(()=>{
      if(data?.department)
        setDepartment(data?.department)
    },[DepartmentLoading])
    const  changeDepartment = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target
        setDepartment({...department, [name]:value})
    }
    const handleForm =(e:FormEvent)=>{
        e.preventDefault()
        if(department){
            DepartmentEdit({department, department_id, company_id})
            .unwrap()
            .then((res:any)=>{
                toast.success(res?.message)
            }).catch(err=>{
                toast.success(err?.data.message)
            })
        }
    }
   
  return (
    <div>
      {

        department?.name ?
          <DepartmentForm 
            department={department}
            changeDepartment={changeDepartment}
            handleForm={handleForm}
            isLoading={isLoading}
            buttonText='Save'
          />
        :null
      }
    </div>
  )
}

export default EditDepartment
