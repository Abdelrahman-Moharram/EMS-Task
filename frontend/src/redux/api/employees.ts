import { apiSlice } from "../services/apiSlice";


const EmployeesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({


        getHiringStages:builder.query({
            query:()=>({
                url:"employees/hiring-stages",
                method:'GET',
            }),
        }),

        createEmployee:builder.mutation({
            query:(credentials)=>({
                url:"employees/create",
                method:'POST',
                body:{...credentials}
            }),
        }),

        editEmployee:builder.mutation({
            query:(credentials)=>({
                url:"employees/edit",
                method:'PUT',
                body:{...credentials}
            }),
        }),

       
    })
         
}) 
export const {
    useGetHiringStagesQuery,
    useCreateEmployeeMutation
} = EmployeesApiSlice