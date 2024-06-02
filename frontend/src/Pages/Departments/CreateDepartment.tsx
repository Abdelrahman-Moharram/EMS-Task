import { ChangeEvent, FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import DepartmentForm from './Components/DepartmentForm'
import { useCreateDepartmentMutation } from '../../redux/api/departments'


const CreateDepartment = ({handleClose}:{handleClose:()=>void}) => {
    const {company_id} = useParams();
    const [createDepartment, {isLoading}] = useCreateDepartmentMutation()
    const initialDepartment = {
        name: '',
        description:''
    }
    const [department, setDepartment] = useState(initialDepartment)
    const  changeDepartment = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target
        setDepartment({...department, [name]:value})
    }
    const handleForm =(e:FormEvent)=>{
        e.preventDefault()
        if(department){
            createDepartment({company_id, department})
            .unwrap()
            .then((res:any)=>{
                setDepartment(initialDepartment)
                toast.success(res?.message)
            }).catch(err=>{
                toast.success(err?.data.message)
            })
            handleClose()
        }
    }
  return (
    <div className='lg:w-[80%] min-h-screen w-full mx-auto bg-white rounded-lg my-3 overflow-hidden p-5'>
      <DepartmentForm 
        department={department}
        changeDepartment={changeDepartment}
        handleForm={handleForm}
        isLoading={isLoading}
      />
    </div>
  )
}

export default CreateDepartment
