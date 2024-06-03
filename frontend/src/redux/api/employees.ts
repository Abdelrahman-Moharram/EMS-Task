import { apiSlice } from "../services/apiSlice";


const EmployeesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({

        getEmployeeList:builder.query({
            query:()=>({
                url:`employees/`,
                method:'GET',
            }),
            providesTags:['employees']
        }),

        getEmployeeDetails:builder.query({
            query:({employee_id}:{employee_id:string|undefined})=>({
                url:`employees/${employee_id}`,
                method:'GET',
            }),
        }),
        getHiringStages:builder.mutation({
            query:({stage}:{stage:string|null})=>({
                url:"employees/hiring-stages",
                method:'POST',
                body:{stage}
            }),
        }),

        createEmployee:builder.mutation({
            query:({employee, company_id})=>({
                url:`employees/companies/${company_id}/create`,
                method:'POST',
                body:{...employee}
            }),
            invalidatesTags: ['employees']
        }),



        editEmployee:builder.mutation({
            query:({employee, company_id})=>({
                url:`employees/companies/${company_id}/update`,
                method:'PUT',
                body:{...employee}
            }),
            invalidatesTags: ['employees']

        }),

        deleteEmployee:builder.mutation({
            query:({employee_id, company_id})=>({
                url:`employees/companies/${company_id}/${employee_id}/delete`,
                method:'DELETE',
            }),
            invalidatesTags: ['employees']

        }),
        // delete_employee
        getFormEmployee:builder.query({
            query:({employee_id}:{employee_id:string})=>({
                url:`employees/${employee_id}/form`,
                method:'GET',
            }),
        }),
        
       
    })
         
}) 
export const {
    useGetEmployeeListQuery,
    useGetHiringStagesMutation,
    useCreateEmployeeMutation,
    useGetFormEmployeeQuery,
    useEditEmployeeMutation,
    useDeleteEmployeeMutation,
    useGetEmployeeDetailsQuery
    
} = EmployeesApiSlice