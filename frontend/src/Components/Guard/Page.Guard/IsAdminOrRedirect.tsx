import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../redux/hooks';

const IsAdminOrRedirect = ({children}:{children:React.ReactNode}) => {
	const { user } = useAppSelector(state => state.auth);
    const nav = useNavigate()

    useEffect(() => {
        if(user?.role?.toLowerCase() === "admin"){
            return nav("/")
        }
      }, [user?.role]);
    return(
        children 
    )
}


export default IsAdminOrRedirect