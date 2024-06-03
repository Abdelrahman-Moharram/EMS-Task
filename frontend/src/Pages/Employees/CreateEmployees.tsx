import { ChangeEvent, FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import EmployeeForm from './Components/EmployeeForm'
import { useCreateEmployeeMutation } from '../../redux/api/employees'
import { toast } from 'react-toastify'

interface props{
    handleOverLay:()=>void
}
const CreateEmployees = ({handleOverLay}:props) => {
    const {company_id} = useParams()
    const [createEmployee, {isLoading}] = useCreateEmployeeMutation()
    const [errors, setErrors] = useState([])
    const [employee, setEmployee] = useState({
        email:'',
        department:'',
        address:'',
        phonenumber:'',
        designation:'',
        stage:'',
        company: company_id ?? ''
    })
    
    
    const  onChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        const {name, value} = e.target
        setEmployee({...employee, [name]:value})
    }
    const handleForm = (e:FormEvent) =>{
        e.preventDefault()
        createEmployee({employee, company_id: employee.company ?? company_id})
        .unwrap()
        .then((data)=>{
            toast.success(data?.message)
            handleOverLay()
        }).catch((err:any)=>{
            
            setErrors(err.data.errors)
        })
    }
  return (
    <EmployeeForm
        employee={employee}
        buttonText='Create'
        handleForm={handleForm}
        onChange={onChange}
        isLoading={isLoading}
        errors={errors}
        company_id={company_id}
    />
  )
}

export default CreateEmployees
