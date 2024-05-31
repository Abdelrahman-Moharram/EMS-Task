import {Nav} from '../../Components/Shared'
import { Outlet } from 'react-router-dom'
import { BackToTop, Setup } from '../../Components/utils'

const Layout = () => {
  return (
      <div className='bg-gray-100 min-h-screen'>
        <Nav />
          <Setup />
          <Outlet />
        <BackToTop />
      </div>
  )
}

export default Layout
