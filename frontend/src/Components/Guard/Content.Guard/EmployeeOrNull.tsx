import React from 'react'
import { useAppSelector } from '../../../redux/hooks';

const EmployeeOrNull = ({children}:{children:React.ReactNode}) => {
	const { user } = useAppSelector(state => state.auth);
    return(
        <>
        {
            ['Admin', 'Manager', 'Employee'].includes(user.role)?
                children 
            :null
        }
        </>
    )
}


export default EmployeeOrNull