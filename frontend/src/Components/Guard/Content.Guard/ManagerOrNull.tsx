import React from 'react'
import { useAppSelector } from '../../../redux/hooks';

const ManagerOrNull = ({children}:{children:React.ReactNode}) => {
	const { user } = useAppSelector(state => state.auth);
    return(
        <>
        {
            ['Admin', 'Manager'].includes(user.role)?
                children 
            :null
        }
        </>
    )
}


export default ManagerOrNull