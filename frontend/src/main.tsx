import React from 'react'

import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { createRoot } from "react-dom/client";
import Layout from './Pages/Shared/Layout.js';
import { Provider } from './redux/index.js';
import Logout from './Pages/Auth/Logout.tsx';
import Login from './Pages/Auth/Login.tsx';
import Register from './Pages/Auth/Register.tsx';
import Index from './Pages/Home/Index.tsx';
import Authenticated from './Components/Guard/Page.Guard/AuthenticatedOrRedirect.tsx';
import NotAuthenticated from './Components/Guard/Page.Guard/NotAuthenticatedOrRedirect.tsx';
import CompaniesList from './Pages/Companies/CompaniesList.tsx';
import AuthenticatedOrRedirect from './Components/Guard/Page.Guard/AuthenticatedOrRedirect.tsx';
import CompanyDetails from './Pages/Companies/CompanyDetails.tsx';
import CreateCompany from './Pages/Companies/CreateCompanies.tsx';
import ManageLayout from './Pages/Companies/Manage/ManageLayout.tsx';
import CompanyDashboard from './Pages/Companies/Manage/CompanyDashboard.tsx';
import DeleteCompany from './Pages/Companies/Manage/DeleteCompany.tsx';
import Departments from './Pages/Departments/Departments.tsx';
import DepartmentDetails from './Pages/Departments/DepartmentDetails.tsx';
import DepartmentEmployee from './Pages/Departments/DepartmentEmployee.tsx';
import CompanyEmployees from './Pages/Companies/Manage/Employees.tsx';


const router = createBrowserRouter([
  {
    path:'/',
    element:
    <Authenticated>
      <Layout />
    </Authenticated>,
    children:[
      {index:true, element:<Index />},
      {
        path:'/auth',
        children:[
          {
            path:"logout",
            element:
            <Authenticated>
              <Logout />
            </Authenticated>
          },
          {
            path:"login",
            element:
            <NotAuthenticated>
              <Login />
            </NotAuthenticated>
          },
          {
            path:"register",
            element:
            <NotAuthenticated>
              <Register />
            </NotAuthenticated>
          }
        ]
      },
      {
        path:'/companies',
        children:[
          {
            index:true,
            element:
            <AuthenticatedOrRedirect>
              <CompaniesList />
            </AuthenticatedOrRedirect>
          },
          {
            path:'create',
            element:<CreateCompany />
          },
          {
            path:":company_id",
            children:[
              {
                index:true,
                element:<CompanyDetails />
              },
              {
                path:'dashboard',
                element:<ManageLayout />,
                children:[
                  {
                    index:true, element:<CompanyDashboard />
                  },
                  {
                    path:'departments',
                    children:[
                      {index:true, element:<Departments />},
                      {path:':department_id', element:<DepartmentDetails />},                      
                      {path:':department_id/employees', element:<DepartmentEmployee />},                      
                    ]
                  },
                  {
                    path:'delete',
                    element:<DeleteCompany />
                  },
                  {
                    path:'employees',
                    element:<CompanyEmployees />
                  }
                  
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)