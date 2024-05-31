import { ImageSkeleton } from "../../../Components/Common"

const Details = ({name}:{name:string}) => {
  return (
    <div className='my-4'>
        {
            name?
            <p className='text-red-600 px-5'>
                The deletion of <span className='font-semibold'> '{name}' </span> company will result to lost all its data including <span className='font-semibold'> (Departments, Employee) </span>
            </p>
            :
            <>
                <ImageSkeleton width='100%' height='20px' margin='5px 0px' />
                <ImageSkeleton width='65%' height='20px' margin='5px 0px' />
            </>
        }
    </div>
  )
}

export default Details
