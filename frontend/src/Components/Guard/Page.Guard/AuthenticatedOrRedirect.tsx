import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../redux/hooks';

const AuthenticatedOrRedirect = ({children}:{children:React.ReactNode}) => {
	const { isAuthenticated } = useAppSelector(state => state.auth);
    const nav = useNavigate()

    useEffect(() => {
        if(!isAuthenticated)
        nav("/auth/login")
      }, [isAuthenticated]);
    return(
        children 
    )
}


export default AuthenticatedOrRedirect