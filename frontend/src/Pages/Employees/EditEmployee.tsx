import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EmployeeForm from './Components/EmployeeForm'
import { useCreateEmployeeMutation } from '../../redux/api/employees'
import { toast } from 'react-toastify'

interface oldEmployeeType{
    id:string
    email:string
    department:string
    address:string
    phonenumber:string
    designation:string
    stage:string
    company:string
}
interface props{
    handleOverLay:()=>void,
    oldEmployee:oldEmployeeType

}
const EditEmployee = ({handleOverLay, oldEmployee}:props) => {
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
        company: ''
    })
    useEffect(()=>{
        if(oldEmployee)
        {
            setEmployee(oldEmployee)
        }
      },[oldEmployee?.id, company_id])
    
    const  onChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        const {name, value} = e.target
        setEmployee({...employee, [name]:value})
    }
    const handleForm = (e:FormEvent) =>{
        e.preventDefault()
        createEmployee(employee)
        .unwrap()
        .then((data)=>{
            toast.success(data?.message)
            handleOverLay()
        }).catch((err:any)=>{
            console.log(err);
            setErrors(err.data.errors)
        })
    }
  return (
    <EmployeeForm
        employee={employee}
        buttonText='Create'
        company_id={company_id}
        handleForm={handleForm}
        onChange={onChange}
        isLoading={isLoading}
        errors={errors}
    />
  )
}

export default EditEmployee
