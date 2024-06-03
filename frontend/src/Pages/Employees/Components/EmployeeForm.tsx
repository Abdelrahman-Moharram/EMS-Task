import { ChangeEvent, FormEvent, useEffect } from 'react'
import FloatingInput from '../../../Components/Forms/FloatingInput'
import FloatingSelectInput from '../../../Components/Forms/FloatingSelectInput'
import { useGetHiringStagesMutation } from '../../../redux/api/employees'
import { useGetCompanyDepartmentsSelectListMutation } from '../../../redux/api/departments'
import { Spinner } from '../../../Components/Common'
import { useGetCompaniesSelectListMutation } from '../../../redux/api/companies'


interface EmployeeType{
    email:string
    department:string
    address:string
    phonenumber:string
    designation:string
    stage:string;
    company: string
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
    company_id?:string | undefined
    errors?:any | null
    edit?:boolean,

}
const EmployeeForm = ({onChange, handleForm, employee, company_id, buttonText, isLoading, errors, edit}:Props) => {
    const [getCompanySelectList, {data:companyData}] = useGetCompaniesSelectListMutation()
    const [getCompanyDepartmentsSelectList ,{data}] = useGetCompanyDepartmentsSelectListMutation()
    
    const [getHiringStages ,{data:stages}] = useGetHiringStagesMutation(undefined)   
    useEffect(()=>{
        if(!company_id){
            getCompanySelectList(undefined)
        }
        
    },[company_id])


    useEffect(()=>{
        if(employee.company){
            getCompanyDepartmentsSelectList({company_id: employee.company})
        }
        console.log(employee);
        if(employee.stage)  {
            getHiringStages({stage: employee.stage})
        }
    },[employee.company])
    
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
                readOnly={edit}
            />
        </div>
        {
            !company_id ?
                <div className="mb-5">
                    <FloatingSelectInput
                        label='company'
                        labelId='company'
                        onChange={onChange}
                        emptyoption
                        value={employee.company}
                        required
                        errors={errors?.company}
                    >
                        {
                            companyData?.companies?.map((com:optionType)=>(
                                <option key={com.id} value={com.id}>{com.name}</option>
                            ))
                        }

                    </FloatingSelectInput>
                </div>
            :null
            
        }
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
                    data?
                        data?.departments?.map((dept:optionType)=>(
                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))
                    :null
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
