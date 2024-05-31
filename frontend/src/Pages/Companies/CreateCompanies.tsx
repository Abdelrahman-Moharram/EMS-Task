import CompanyForm from './components/CompanyForm'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCreateCompanyMutation } from '../../redux/api/companies'


const CreateCompany = () => {
    const [createCompany, {isLoading}] = useCreateCompanyMutation()
    const nav = useNavigate()
    const initialCompany = {
        name: '',
        description:''
    }
    const [company, setCompany] = useState(initialCompany)
    const  changeCompany = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target
        setCompany({...company, [name]:value})
    }
    const handleForm =(e:FormEvent)=>{
        e.preventDefault()
        if(company){
            createCompany(company)
            .unwrap()
            .then((res:any)=>{
                setCompany(initialCompany)
                toast.success(res?.message)
                nav(`/companies/${res?.id}`)
            }).catch(err=>{
                toast.success(err?.data.message)
            })
        }
    }
  return (
    <div className='lg:w-[80%] min-h-screen w-full mx-auto bg-white rounded-lg my-3 overflow-hidden p-5'>
      <CompanyForm 
        company={company}
        changeCompany={changeCompany}
        handleForm={handleForm}
        isLoading={isLoading}
      />
    </div>
  )
}

export default CreateCompany
