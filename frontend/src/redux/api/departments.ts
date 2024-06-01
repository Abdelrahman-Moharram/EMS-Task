import { apiSlice } from "../services/apiSlice"

const base_url = 'companies/'

interface departmentType{
    id?: string | undefined;
    name: string;
    description: string;
}

const EmployeesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getAllDepartmentsList:builder.query({
            query:({page, size}:{page:number, size:number})=>({
                url:'departments/',
                method:'GET',
                params:{page:page, size:size}
            }),
            providesTags: ['departments'],
        }),

        getCompanyDepartmentsList:builder.query({
            query:({company_id}:{company_id:string|undefined})=>({
                url:`${base_url}${company_id}/departments`,
                method:'GET',
            }),
            providesTags: ['departments'],
        }),
        getCompanyDepartmentDetails:builder.query({
            query:({company_id, department_id}:{company_id:string|undefined, department_id:string | undefined})=>({
                url:`${base_url}${company_id}/departments/${department_id}`,
                method:'GET',
            }),
            providesTags: ['departments'],
        }),

        getCompanyDepartmentForm:builder.query({
            query:({company_id, department_id}:{company_id:string|undefined, department_id:string | undefined})=>({
                url:`${base_url}${company_id}/departments/${department_id}/base`,
                method:'GET',
            }),
            providesTags: ['departments'],
        }),


        createDepartment:builder.mutation({
            query:({company_id, department}:{company_id:string|undefined, department:departmentType})=>({
                url:`${base_url}${company_id}/departments/create`,
                method:'POST',
                body: department
            }),
            invalidatesTags: ['departments'],
        }),

        editDepartment:builder.mutation({
            query:({company_id, department_id, department}:{company_id:string|undefined, department_id:string|undefined, department:departmentType})=>({
                url:`${base_url}${company_id}/departments/${department_id}/edit`,
                method:'PUT',
                body: department
            }),
            invalidatesTags: ['departments'],
        }),

        deleteDepartment:builder.mutation({
            query:({company_id, department_id}:{company_id:string|undefined, department_id:string|undefined})=>({
                url:`${base_url}${company_id}/departments/${department_id}/delete`,
                method:'DELETE',
            }),
            invalidatesTags: ['departments'],
        }),


    })
})


export const {
    useGetAllDepartmentsListQuery,
    useGetCompanyDepartmentsListQuery,
    useCreateDepartmentMutation,
    useEditDepartmentMutation,
    useDeleteDepartmentMutation,
    useGetCompanyDepartmentDetailsQuery,
    useGetCompanyDepartmentFormQuery,
} = EmployeesApiSlice