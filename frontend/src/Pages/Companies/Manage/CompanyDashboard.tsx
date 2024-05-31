import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import CompanyForm from '../components/CompanyForm'
import { useCompanyEditMutation, useCompanyFormQuery } from '../../../redux/api/companies'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'



const CompanyDashboard = () => {
    const {company_id} = useParams();
    const {data, isLoading:companyLoading} = useCompanyFormQuery({company_id})
    const [CompanyEdit, {isLoading}] = useCompanyEditMutation()
    const nav = useNavigate()
    const [company, setCompany] = useState({
      id:'',
      name:'',
      description:''
    })
    useEffect(()=>{
      if(data?.company)
        setCompany(data?.company)
    },[companyLoading])
    const  changeCompany = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target
        setCompany({...company, [name]:value})
    }
    const handleForm =(e:FormEvent)=>{
        e.preventDefault()
        if(company){
            CompanyEdit({company: company, company_id})
            .unwrap()
            .then((res:any)=>{
                toast.success(res?.message)
            }).catch(err=>{
                toast.success(err?.data.message)
            })
        }
    }
   
  return (
    <div>
      {

        company?.name ?
          <CompanyForm 
            company={company}
            changeCompany={changeCompany}
            handleForm={handleForm}
            isLoading={isLoading}
            buttonText='Save'
          />
        :null
      }
    </div>
  )
}

export default CompanyDashboard
