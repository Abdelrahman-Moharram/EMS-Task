import ImageSkeleton from './ImageSkeleton';
import { HiBuildingOffice } from 'react-icons/hi2';
interface props{
  title: string;
}
const SectionHeader = ({title}:props) => {
  return (
    <div className="">
      <div className='flex items-center '>
          {
              title?
              <div className='flex gap-4 items-center'>
                  <div className='p-4 bg-gray-100 rounded-full'>
                    <HiBuildingOffice className='text-2xl text-primary' />
                  </div>
                  <h1 className='text-3xl font-bold '>{title}</h1>
              </div>
              : 
              <div className='flex gap-4 items-center p-4'>
                  <ImageSkeleton width='80px' height='80px' rounded='100%' />
                  <ImageSkeleton width='300px' height='40px' />
              </div>
          }
          
      </div>
      <hr className='mb-8 mt-2' />
    </div>
  )
}

export default SectionHeader
