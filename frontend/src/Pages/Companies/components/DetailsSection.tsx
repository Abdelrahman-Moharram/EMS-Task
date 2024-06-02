import DetailItem from '../../Departments/Components/DetailItem';
import { FcDepartment } from "react-icons/fc";
import { FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import { ImageSkeleton } from '../../../Components/Common';
import { useAppSelector } from '../../../redux/hooks';
import LinkWithArrow from '../../../Components/Buttons&Links/LinkWithArrow';
import ManagerOrNull from '../../../Components/Guard/Content.Guard/ManagerOrNull';

interface companyType{
    id: string;
    created_at: Date;
    employees_len: number;
    departments_len: number
}

interface props{
    company: companyType
    is_employee: boolean
}
const DetailsSection = ({company, is_employee}:props) => {
    const created_date = () => {
        const date = new Date(company.created_at)
        return date.toDateString()
    }    
    const {user} = useAppSelector(state=>state.auth)
  return (
    <div className='p-5 shadow-md rounded-md w-full relative'>
        {
            company?.id?
            <div className='space-y-3'>
                <DetailItem icon={<FcDepartment />} name='Departments' value={company.departments_len.toString()} />
                <DetailItem icon={<FaUserFriends  />} name='Employees' value={company.employees_len.toString()} />
                <DetailItem icon={<FaCalendarAlt />} name='Created At' value={created_date()} />
            </div>
            :
            <div className=''>
                <ImageSkeleton height='22px' rounded='7px' width='30%' margin='10px 0px' />
                <ImageSkeleton height='22px' rounded='7px' width='30%' margin='10px 0px' />
                <ImageSkeleton height='22px' rounded='7px' width='30%' margin='10px 0px' />
            </div>
        }
        <div className="absolute bottom-10 right-24">
            <ManagerOrNull>
            {
                is_employee || user.role === 'Admin'? 
                    <LinkWithArrow href='dashboard' text='dashboard' />
                :null
            }
            </ManagerOrNull>
            {
                !user?.role && is_employee ?
                    <LinkWithArrow href='Apply' text='apply' />
                :null
            }
        </div>
    </div>
  )
}

export default DetailsSection
