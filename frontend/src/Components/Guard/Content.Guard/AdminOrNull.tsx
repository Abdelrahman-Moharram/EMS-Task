import React from 'react'
import { useAppSelector } from '../../../redux/hooks';

const AdminOrNull = ({children}:{children:React.ReactNode}) => {
	const { user } = useAppSelector(state => state.auth);
    return(
        <>
        {
            user.role === 'Admin'?
                children 
            :null
        }
        </>
    )
}


export default AdminOrNull