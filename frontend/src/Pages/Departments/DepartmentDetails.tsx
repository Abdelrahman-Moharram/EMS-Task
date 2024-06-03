import { useParams } from 'react-router-dom'
import { useGetDepartmentDetailsQuery } from '../../redux/api/departments'
import SectionHeader from '../../Components/Common/SectionHeader'
import DetailsSection from './Components/DetailsSection'
import EmployeeCardsSwiper from '../../Components/Lists/EmployeeCardsSwiper'
import LinkWithArrow from '../../Components/Buttons&Links/LinkWithArrow'

const DepartmentDetails = () => {
  const {department_id} = useParams()
  const {data} = useGetDepartmentDetailsQuery({department_id}) 
  console.log(data);
  
  return (
    <div className='p-4'>
      <SectionHeader title={data?.department?.name} />
      <DetailsSection details={data?.department} />
      
      <p className="mx-4 my-12 font-semibold">
        {data?.department?.description}
      </p>
      <hr />
      <div className="p-4 mt-5">
        <h3 className='font-bold'>Department Employees</h3>
        <EmployeeCardsSwiper
          cards={data?.department?.employee_set}
        />
        <div className="flex justify-end m-1">
          <LinkWithArrow href='employees' text='See All' />
        </div>
      </div>
    </div>
  )
}

export default DepartmentDetails
