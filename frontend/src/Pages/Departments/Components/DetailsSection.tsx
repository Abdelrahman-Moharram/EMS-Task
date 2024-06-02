import DetailItem from '../../Departments/Components/DetailItem';
import { FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import { ImageSkeleton } from '../../../Components/Common';


interface detailsType{
    id: string;
    created_at: Date;
    employees_len: number;
}

interface props{
    details: detailsType
}
const DetailsSection = ({details}:props) => {
    const created_date = () => {
        const date = new Date(details.created_at)
        return date.toDateString()
    }    
  return (
    <div className='p-5 shadow-md rounded-md w-full relative'>
        {
            details?.id?
            <div className='space-y-3'>
                <DetailItem icon={<FaUserFriends  />} name='Employees' value={details.employees_len.toString()} />
                <DetailItem icon={<FaCalendarAlt />} name='Created At' value={created_date()} />
            </div>
            :
            <div className=''>
                <ImageSkeleton height='22px' rounded='7px' width='30%' margin='10px 0px' />
                <ImageSkeleton height='22px' rounded='7px' width='30%' margin='10px 0px' />
                <ImageSkeleton height='22px' rounded='7px' width='30%' margin='10px 0px' />
            </div>
        }
    </div>
  )
}

export default DetailsSection
