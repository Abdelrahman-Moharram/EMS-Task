import { useState } from 'react'
import CompanyDeleteModal from '../components/CompanyDeleteModal'
import { useNavigate, useParams } from 'react-router-dom'
import { useCompanyFormQuery, useDeleteCompanyMutation } from '../../../redux/api/companies'
import { toast } from 'react-toastify'
import SectionHeader from '../../../Components/Common/SectionHeader'
import Details from '../components/Details'
import { FaTrash } from 'react-icons/fa'

const DeleteCompany = () => {
const {company_id} = useParams()
  const {data} = useCompanyFormQuery({company_id})
  const [modal, setModal] = useState(false)
  const nav = useNavigate()

  const [deleteCompany] = useDeleteCompanyMutation()
  const handleModal = () =>{
    setModal(!modal)
  }
  const formData = ({password}:{password:string}) =>{
    deleteCompany({company_id, password})
      .unwrap()
      .then(()=>{
        toast.success(`company ${data?.company?.name} deleted successfully`)
        nav('/companies')
      }).catch((err:any)=>{
        console.log(err);
        toast.error(err?.data.message)
      })
  }
  return (
    <>
        <CompanyDeleteModal
            handleModal={handleModal} 
            open={modal} 
            company={data?.company}
            formData={formData}
        />
        <div className='px-4 py-3'>
            <SectionHeader title={data?.company.name} />
            <Details name={data?.company.name} />
            <div className='mt-12'>
                <button
                    onClick={handleModal}
                    className="w-full flex justify-center items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-500 bg-red-100 hover:bg-red-500 hover:text-white"
                >
                    <FaTrash /> Delete
                </button>
            </div>
        </div>
    </>
  )
}

export default DeleteCompany
