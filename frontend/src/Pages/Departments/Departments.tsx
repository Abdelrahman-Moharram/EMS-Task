import { useDeleteDepartmentMutation, useGetCompanyDepartmentsListQuery } from '../../redux/api/departments'
import { Link, useParams } from 'react-router-dom';
import SectionHeader from '../../Components/Common/SectionHeader';
import CardOptionsList from '../../Components/Lists/CardOptionsList';
import { useState } from 'react';
import DeleteModal from '../../Components/Modals/DeleteModal';
import { GoPlus } from 'react-icons/go';
import { toast } from 'react-toastify';
import OverLay from '../../Components/Modals/OverLay';
import CreateDepartment from './CreateDepartment';
import EditDepartment from './EditDepartment';

const Departments = () => {
    const {company_id} = useParams();
    const {data} = useGetCompanyDepartmentsListQuery({company_id})
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [createModal, setCreateModal] = useState(false)
    const [item, setItem] = useState('')
    
    const [deleteDepartment, {isLoading}] = useDeleteDepartmentMutation()    

    const handleDeleteModal = ()=>{
        setDeleteModal(!deleteModal)
    }

    const handleEditModal = ()=>{
        setEditModal(!editModal)
    }
    const handleEdit = (id:string)=>{
        setItem(id);
        handleEditModal()        
    }
    const handleDelete = (id:string)=>{
        setItem(id);
        handleDeleteModal()        
    }
    
    const deleteAction = ()=>{
        deleteDepartment({department_id:item})
        .unwrap()
        .then((res:any)=>{
            setDeleteModal(false)
            setItem('')
            toast.success(res?.message)
        }).catch(err=>{
            toast.success(err?.data.message)
        })
    }
    const handleCreateModal = ()=>{
        setCreateModal(!createModal)
    }
  return (
    <>
        <OverLay 
            toggleDetails={createModal}
            handleToggler={handleCreateModal}
        >
            <CreateDepartment 
                handleClose={handleCreateModal}
            />
        </OverLay>

        <OverLay 
            toggleDetails={editModal}
            handleToggler={handleEditModal}
        >
            <EditDepartment 
                oldDepartment={data?.departments?.find((i:any)=>i.id === item)}
                department_id={item}
                handleClose={handleEditModal}
            />
        </OverLay>
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
                item?
                    data?.departments?.find((i:any)=>i.id === item).name
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
            <button
                onClick={handleCreateModal}
                className="flex items-center gap-1 w-fit px-8 py-3 border border-primary rounded-md my-3 hover:bg-primary transition-all hover:text-white"
            >
                <GoPlus /> Create
            </button>
            </div>
            <CardOptionsList 
                cards={data?.departments}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </div>
    </>
  )
}

export default Departments
