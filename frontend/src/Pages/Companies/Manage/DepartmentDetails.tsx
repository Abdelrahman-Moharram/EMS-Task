import React from 'react'
import { useParams } from 'react-router-dom'

const DepartmentDetails = () => {
    const {department_id} = useParams()
  return (
    <div>
      {department_id}
    </div>
  )
}

export default DepartmentDetails
