import { useGetEmployeeListQuery } from '../../redux/api/employees'
import EmployeeCardsList from '../../Components/Lists/EmployeeCardsList'
import { GoPlus } from 'react-icons/go'
import OverLay from '../../Components/Modals/OverLay'
import { useState } from 'react'
import CreateEmployees from './CreateEmployees'

const EmployeeList = () => {
  const [overlay, setOverLay] = useState(false)
  const {data} = useGetEmployeeListQuery(undefined)
  const handleOverLay = () =>{
    setOverLay(!overlay)
  }
  return (
    <>
      <OverLay
        handleToggler={handleOverLay}
        toggleDetails={overlay}
      >
        <CreateEmployees 
          handleOverLay={handleOverLay}
        />
      </OverLay>
      <div className='lg:w-[80%] min-h-screen  w-full mx-auto bg-white rounded-lg my-3 overflow-hidden p-5 pb-3'>
        <button
            onClick={handleOverLay}
            className="flex items-center gap-1 w-fit px-8 py-3 border border-primary rounded-md my-3 hover:bg-primary transition-all hover:text-white"
        >
            <GoPlus /> Create
        </button>
              

        <EmployeeCardsList
          cards={data?.employees}
        />
      </div>
    </>
  )
}

export default EmployeeList
