import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../redux/hooks';

const NotAuthenticatedOrRedirect = ({children}:{children:React.ReactNode}) => {
	const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);
    const nav = useNavigate()

    useEffect(() => {
        if(isAuthenticated){
            nav("/")
        }
      }, [isAuthenticated]);

    return(
        !isLoading?
            children
        :null
    )
}

export default NotAuthenticatedOrRedirect
