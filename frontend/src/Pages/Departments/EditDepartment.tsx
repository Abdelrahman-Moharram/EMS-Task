import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import DepartmentForm from './Components/DepartmentForm'
import { toast } from 'react-toastify'
import { useEditDepartmentMutation } from '../../redux/api/departments'

interface DeptType{
  id:string;
  name:string;
  description:string
}
const EditDepartment = ({department_id, handleClose, oldDepartment}:{department_id:string, handleClose:()=>void, oldDepartment:DeptType}) => {
    const [DepartmentEdit, {isLoading}] = useEditDepartmentMutation()
    
    const [department, setDepartment] = useState({
      id:'',
      name:'',
      description:''
    })
    useEffect(()=>{
      if(oldDepartment)
      {
        setDepartment(oldDepartment)
      }
    },[oldDepartment?.id, department_id])

    
    const  changeDepartment = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target
        setDepartment({...department, [name]:value})
    }
    const handleForm =(e:FormEvent)=>{
        e.preventDefault()
        if(department){
            DepartmentEdit({department, department_id})
            .unwrap()
            .then((res:any)=>{
                toast.success(res?.message)
            }).catch(err=>{
                toast.success(err?.data.message)
            })
          handleClose()
        }
    }
   
  return (
    <div>
      {

        department?.id ?
          <div>
            <DepartmentForm 
              department={department}
              changeDepartment={changeDepartment}
              handleForm={handleForm}
              isLoading={isLoading}
              buttonText='Save'
            />
          </div>
        :null
      }
    </div>
  )
}

export default EditDepartment
