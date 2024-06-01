import FloatingInput from '../../../Components/Forms/FloatingInput'
import FloatingTextarea from '../../../Components/Forms/FloatingTextarea'

import { Spinner } from '../../../Components/Common'
import { ChangeEvent, FormEvent } from 'react';

interface DepartmentType{
    name: string;
    description: string
}
interface Props{
    department:DepartmentType
    changeDepartment: (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void
    handleForm:(e:FormEvent)=>void;
    isLoading:boolean,
    buttonText?:string
}
const DepartmentForm = ({department,changeDepartment,handleForm, isLoading, buttonText}:Props) => {
    
  return (
    <form onSubmit={handleForm} className='px-5 pt-4'>
        <div className='mt-20'>
            <div className="w-[40%] inline-block">
                <FloatingInput
                    label='Department Name'
                    labelId='name'
                    onChange={changeDepartment}
                    type='text'
                    value={department.name}
                    required
                />
            </div>
            {/* <p className='text-primary inline-block ml-6'> Choose a Department Name</p> */}
        </div>

        <div className='mt-10'>
            <FloatingTextarea
                label='Description'
                labelId='description'
                value={department.description}
                required
                onChange={changeDepartment}
            />
        </div>
        
        <div className="flex justify-end mt-12 pt-10">
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
        </div>
    </form>
  )
}

export default DepartmentForm
