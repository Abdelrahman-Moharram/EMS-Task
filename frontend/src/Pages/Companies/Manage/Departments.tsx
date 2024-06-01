import { useDeleteDepartmentMutation, useGetCompanyDepartmentsListQuery } from '../../../redux/api/departments'
import { Link, useParams } from 'react-router-dom';
import SectionHeader from '../../../Components/Common/SectionHeader';
import CardOptionsList from '../../../Components/Lists/CardOptionsList';
import { useState } from 'react';
import DeleteModal from '../../../Components/Modals/DeleteModal';
import { GoPlus } from 'react-icons/go';
import { toast } from 'react-toastify';

const Departments = () => {
    const {company_id} = useParams();
    const {data} = useGetCompanyDepartmentsListQuery({company_id})
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteItem, setDeleteitem] = useState('')
    const [deleteDepartment, {isLoading}] = useDeleteDepartmentMutation()    

    const handleDeleteModal = ()=>{
        setDeleteModal(!deleteModal)
    }

    const handleDelete = (id:string)=>{
        setDeleteitem(id);
        handleDeleteModal()        
    }
    
    const deleteAction = ()=>{
        deleteDepartment({company_id, department_id:deleteItem})
        .unwrap()
        .then((res:any)=>{
            console.log(res);
            setDeleteModal(false)
            setDeleteitem('')
            toast.success(res?.message)
        }).catch(err=>{
            toast.success(err?.data.message)
        })
    }
  return (
    <>


        <DeleteModal 
            title='Delete Department'
            open={deleteModal}
            handleClose={handleDeleteModal}
            isLoading={isLoading}
            deleteAction={deleteAction}
        >
            Are you sure you want to delete  
            <span className='font-bold px-1'>
             '
            {
                deleteItem?
                    data?.departments?.find((i:any)=>i.id === deleteItem).name
                :null
            }
            ' 
            </span>
            Department

            ?
        </DeleteModal>

        <div className='p-3'>
            <SectionHeader title={'Departments'} />
            <div className="my-8">
            <Link
                to={'create'} 
                className="flex items-center gap-1 w-fit px-8 py-3 border border-primary rounded-md my-3 hover:bg-primary transition-all hover:text-white"
            >
                <GoPlus /> Create
            </Link>
            </div>
            <CardOptionsList 
                cards={data?.departments}
                handleDelete={handleDelete}
            />
        </div>
    </>
  )
}

export default Departments
