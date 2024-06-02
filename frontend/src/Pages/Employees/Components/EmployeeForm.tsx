import React, { ChangeEvent, FormEvent } from 'react'
import FloatingInput from '../../../Components/Forms/FloatingInput'
import FloatingSelectInput from '../../../Components/Forms/FloatingSelectInput'
import { useGetHiringStagesQuery } from '../../../redux/api/employees'
import { useGetCompanyDepartmentsSelectListQuery } from '../../../redux/api/departments'
import { Spinner } from '../../../Components/Common'


interface EmployeeType{
    email:string
    department:string
    address:string
    phonenumber:string
    designation:string
    stage:string
}

interface optionType{
    id:string;
    name:string
}



interface Props{
    onChange:(e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>void
    handleForm:(e:FormEvent)=>void
    buttonText:string
    isLoading:boolean
    employee: EmployeeType
    company_id:string | undefined
    errors?:any | null
}
const EmployeeForm = ({onChange, handleForm, employee, company_id, buttonText, isLoading, errors}:Props) => {
    const {data} = useGetCompanyDepartmentsSelectListQuery({company_id})
    const {data:stages} = useGetHiringStagesQuery({undefined})

  return (
    <div className='p-5 mt-10 w-[50%]'>
      <form onSubmit={handleForm}>
        <div className="mb-5">
            <FloatingInput
                label='email'
                labelId='email'
                onChange={onChange}
                type='text'
                value={employee.email}
                required
                errors={errors?.email}
            />
        </div>
        <div className="mb-5">
            <FloatingSelectInput
                label='department'
                labelId='department'
                onChange={onChange}
                emptyoption
                value={employee.department}
                required
                errors={errors?.department}
            >
                {
                    data?.departments?.map((dept:optionType)=>(
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))
                }

            </FloatingSelectInput>
        </div>

        <div className="mb-5">
            <FloatingInput
                label='address'
                labelId='address'
                onChange={onChange}
                type='text'
                value={employee.address}
                required
                errors={errors?.address}
            />
        </div>
        <div className="mb-5">
            <FloatingInput
                label='phonenumber'
                labelId='phonenumber'
                onChange={onChange}
                type='text'
                value={employee.phonenumber}
                required
                errors={errors?.phonenumber}
            />
        </div>

        <div className="mb-5">
            <FloatingInput
                label='Position / Title'
                labelId='designation'
                onChange={onChange}
                type='text'
                value={employee.designation}
                errors={errors?.designation}
                required
            />
        </div>
        
        <div className="mb-5">
            <FloatingSelectInput
                label='stage'
                labelId='stage'
                onChange={onChange}
                emptyoption
                value={employee.stage}
                errors={errors?.stage}
                required
            >
                {
                    
                    stages?.stages?.map((stage:optionType)=>(
                        <option key={stage.id} value={stage.id}>{stage.name}</option>
                    ))
                }
            </FloatingSelectInput>
        </div>

        <button
            className="flex items-center gap-1 w-fit px-8 py-3 border border-primary rounded-md my-3 hover:bg-primary transition-all hover:text-white"
        >
            <span>{buttonText? buttonText: 'Create'}</span>
            {
                
                isLoading?
                    <Spinner sm />
                :null
            }
        </button>
      </form>
    </div>
  )
}

export default EmployeeForm
