
import { ChangeEvent, useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import BaseModal from '../../../Components/Modals/BaseModal';
import FloatingInput from '../../../Components/Forms/FloatingInput';
interface Props{
    open: boolean;
    handleModal: ()=>void;
    company: {
        id: string;
        name: string;
    };
    formData:({password}:{password:string})=>void
}
const CompanyDeleteModal = ({handleModal, open, company, formData}:Props) => {
    const [state, setState] = useState(0)
    const [companyName, setCompanyName] = useState('')
    const [password, setPassword] = useState('')
    const handlecompanyName = (e: ChangeEvent<HTMLInputElement>)=>{
        setCompanyName(e.target.value)
    }
    const handlePassword = (e: ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value)
    }
    const handleModalState = () =>{
        if(companyName === company.name){
            setCompanyName('')
            setState(state + 1)
        }
    }
  return (
    <BaseModal
        open={open}
        handleClose={handleModal}
    >
       <div className="px-5 py-3 md:w-[700px] sm:w-[full]">
            <div className='flex justify-center mb-5'>
                <h2 className="sr-only">Steps</h2>

                <div>
                    <ol className="flex items-center gap-2 text-xs font-medium text-gray-500 sm:gap-4">
                    {
                        state > 0?

                            <li className="flex">
                                <span className="rounded bg-green-50 p-1.5 text-green-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </li>
                        :

                        <li className="flex items-center justify-center gap-2 text-blue-600">
                            <span className="size-6 rounded bg-blue-50 text-center text-[10px]/6 font-bold"> 1 </span>

                            <span> Company Name </span>
                        </li>
                    }

                    <li className="flex items-center justify-center gap-2 text-blue-600">
                        <span className="size-6 rounded bg-blue-50 text-center text-[10px]/6 font-bold"> 2 </span>

                        <span> Confirm Password </span>
                    </li>
                    </ol>
                </div>
            </div>
            {
                state === 0?
                    <div>
                        <p className='text-red-600 font-semibold'>
                            Are you sure you want to delete
                            "
                            <span className='font-bold'>
                                {company?.name}
                            </span>
                            " company ?
                        </p>
                        <span className='text-sm block text-gray-500 mt-2 mb-5'>Please enter the company name here</span>
                        <div className="block mt-4">
                            <FloatingInput
                                label='type Company name here'
                                labelId='companyName'
                                onChange={handlecompanyName}
                                value={companyName}
                                type='text'
                            />
                            <button
                                onClick={handleModalState}
                                className="w-full shadow-md transition-all mt-3 flex justify-center items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-500 hover:text-white"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                :
                state === 1?
                    <div className='space-y-5 pt-3'>
                        <p className='font-semibold'>To able to delete this company type your password here to confirm your identity </p>
                        <div className="w-full">
                            <FloatingInput
                                label='Password'
                                labelId='password'
                                type='password'
                                value={password}
                                onChange={handlePassword}
                            />
                        </div>
                        <div className="flex gap-3">

                            <button
                                onClick={()=>{setState(0)}}
                                className="w-full shadow-md transition-all mt-3 flex justify-center items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-500 hover:text-white"
                            >
                                go back
                            </button>
                            <button
                                onClick={()=>{
                                    setPassword('')
                                    handleModal()
                                    formData({password})
                                }}
                                className="w-full shadow-md transition-all mt-3 flex justify-center items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-500 bg-red-100 hover:bg-red-500 hover:text-white"
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                :null
            }
       </div>
    </BaseModal>
  )
}

export default CompanyDeleteModal
