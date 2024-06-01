import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import DepartmentForm from '../components/DepartmentForm'
import { useCreateDepartmentMutation } from '../../../redux/api/departments'


const CreateDepartment = () => {
    const {company_id} = useParams();
    const [createDepartment, {isLoading}] = useCreateDepartmentMutation()
    const nav = useNavigate()
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
                nav(`/companies/${company_id}/dashboard/departments/${res?.id}`)
            }).catch(err=>{
                toast.success(err?.data.message)
            })
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
