import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EmployeeForm from './Components/EmployeeForm'
import { useCreateEmployeeMutation, useEditEmployeeMutation, useGetFormEmployeeQuery } from '../../redux/api/employees'
import { toast } from 'react-toastify'

interface oldEmployeeType{
    id:string //
    email:string //
    department:string
    address:string
    phonenumber:string //
    designation:string //
    stage:string
    company:string
}


interface props{
    handleOverLay:()=>void,
    employee_id:string

}
const EditEmployee = ({handleOverLay, employee_id}:props) => {
    const {company_id} = useParams()
    const [editEmployee, {isLoading}] = useEditEmployeeMutation()
    const{data} = useGetFormEmployeeQuery({employee_id})    
    const [errors, setErrors] = useState([])
    const [employee, setEmployee] = useState({
        id:employee_id,
        email:'',
        department:'',
        address:'',
        phonenumber:'',
        designation:'',
        stage:'',
        company: ''
    })
    useEffect(()=>{
        if(data?.employee)
        {
            setEmployee(data?.employee)
        }
      },[employee_id, data?.employee?.email])
    
    const  onChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        const {name, value} = e.target
        setEmployee({...employee, [name]:value})
    }
    const handleForm = (e:FormEvent) =>{
        e.preventDefault()        
        editEmployee({employee, company_id})
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
        buttonText='Save'
        company_id={company_id}
        handleForm={handleForm}
        onChange={onChange}
        isLoading={isLoading}
        errors={errors}
        edit
    />
  )
}

export default EditEmployee
