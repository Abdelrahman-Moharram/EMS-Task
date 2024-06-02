import React, { useState } from 'react'
import BaseModal from '../../../Components/Modals/BaseModal'

const EditDepartments = () => {
    const [editModal, setEditModal] = useState(false)


    const handleEditModal = ()=>{
            setEditModal(!editModal)
    }
  return (
    <BaseModal
        open={editModal}
        handleClose={handleEditModal}
    >
        <div></div>
    </BaseModal>
  )
}

export default EditDepartments
