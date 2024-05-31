import React, { useEffect } from 'react'
import { useAppSelector } from '../../../redux/hooks';
import { useNavigate } from 'react-router-dom';

const IsNotAdmin = ({children}:{children:React.ReactNode}) => {
    const { user } = useAppSelector(state => state.auth);
    const nav = useNavigate()

    useEffect(() => {
        if(user?.role?.toLowerCase() !== "admin"){
            return nav("/")
        }
      }, [user?.role]);
    return(
        children 
    )
}

export default IsNotAdmin
