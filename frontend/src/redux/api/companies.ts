import { apiSlice } from "../services/apiSlice";


const EmployeesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({


        getCompaniesList:builder.query({
            query:({page, size}:{page:number, size:number})=>({
                url:"companies/",
                method:'GET',
                params:{page:page, size:size}
            }),
            providesTags: ['companies'],

        }),

        getCompaniesEmployees:builder.query({
            query:({company_id}:{company_id:string|undefined})=>({
                url:`companies/${company_id}/employees`,
                method:'GET',
            }),
        }),
        

        getCompaniesDetails:builder.query({
            query:({company_id}:{company_id:string | undefined})=>{
                return{
                    url:`companies/${company_id}`,
                    method:'GET',
                }
            },
            providesTags: ['company'],
        }),

        createCompany:builder.mutation({
            query:({name, description}:{name:string, description:string})=>{
                return{
                    url:`companies/create`,
                    method:'POST',
                    body:{name, description}
                }
            },
            invalidatesTags: ['companies']
        }),

        companyForm:builder.query({
            query:({company_id}:{company_id:string|undefined})=>{
                return{
                    url:`companies/${company_id}/base`,
                    method:'GET',
                }
            }
        }),

        companyEdit:builder.mutation({
            query:({company, company_id}:
                    {
                        company:{
                            id:string, name:string, description:string
                        }, company_id:string|undefined})=>{
                return{
                    url:`companies/${company_id}/edit`,
                    method:'PUT',
                    body:company
                }
            },
            invalidatesTags: ['companies']
        }),

        deleteCompany:builder.mutation({
            query:({company_id, password}:{company_id:string|undefined, password:string})=>{
                return{
                    url:`companies/${company_id}/delete`,
                    method:'DELETE',
                    body:{password}
                }
            },
            invalidatesTags: ['companies']
        }),
        
    })
         
}) 

export const {
    useGetCompaniesListQuery,
    useGetCompaniesDetailsQuery,
    useCreateCompanyMutation,
    useCompanyEditMutation,
    useCompanyFormQuery,
    useDeleteCompanyMutation,
    useGetCompaniesEmployeesQuery
} = EmployeesApiSlice