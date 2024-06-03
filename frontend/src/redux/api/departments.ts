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
        getCompanyDepartmentsSelectList:builder.mutation({
            query:({company_id}:{company_id:string|undefined})=>({
                url:`${base_url}${company_id}/departments_select`,
                method:'GET',
            }),
        }),
        
        getDepartmentDetails:builder.query({
            query:({department_id}:{department_id:string | undefined})=>({
                url:`departments/${department_id}`,
                method:'GET',
            }),
            providesTags: ['departments'],
        }),

        getDepartmentEmployees:builder.query({
            query:({department_id}:{department_id:string | undefined})=>({
                url:`departments/${department_id}/employees`,
                method:'GET',
            }),
            providesTags: ['departments'],
        }),

        getDepartmentForm:builder.query({
            query:({department_id}:{department_id:string | undefined})=>({
                url:`departments/${department_id}/base`,
                method:'GET',
            }),
            providesTags: ['departments'],
        }),


        createDepartment:builder.mutation({
            query:({company_id, department}:{company_id:string|undefined, department:departmentType})=>({
                url:`companies/${company_id}/departments/create`,
                method:'POST',
                body: department
            }),
            invalidatesTags: ['departments'],
        }),
        editDepartment:builder.mutation({
            query:({department_id, department}:{department_id:string|undefined, department:departmentType})=>({
                url:`departments/${department_id}/edit`,
                method:'PUT',
                body: department
            }),
            invalidatesTags: ['departments'],
        }),

        deleteDepartment:builder.mutation({
            query:({department_id}:{department_id:string|undefined})=>({
                url:`departments/${department_id}/delete`,
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
    useGetDepartmentDetailsQuery,
    useGetDepartmentFormQuery,
    useGetDepartmentEmployeesQuery,
    useGetCompanyDepartmentsSelectListMutation
} = EmployeesApiSlice