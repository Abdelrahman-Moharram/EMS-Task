import { Link, useSearchParams } from "react-router-dom";
import CardsList from "../../Components/Lists/CardsList"
import { useGetCompaniesListQuery } from "../../redux/api/companies"
import { useEffect } from "react";
import Paginition from "../../Components/Lists/Pagination";
import SectionHeader from "../../Components/Common/SectionHeader";
import { GoPlus } from "react-icons/go";

const CompaniesList = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page')
  const size = searchParams.get('size')
  useEffect(()=>{

      if(!page)
        searchParams.set('page', '1')
      
      if(!size)
        searchParams.set('size', '10')
    
      if(!size || !page){
        setSearchParams(searchParams);
      }
  }, [size, page])
    
    const {data} = useGetCompaniesListQuery({page:page? parseInt(page)-1: 0, size:size?parseInt(size):10})
  return (
    <div className="lg:w-[80%] min-h-screen w-full mx-auto bg-white rounded-lg my-3 overflow-hidden p-5">
      <div className="min-h-dvh">
        <SectionHeader title="All Companies" />
        
        <div className="my-8">
          <Link
            to={'/companies/create'} 
            className="flex items-center gap-1 w-fit px-8 py-3 border border-primary rounded-md my-3 hover:bg-primary transition-all hover:text-white"
          >
            <GoPlus /> Create
          </Link>
        </div>
        <CardsList cards={data?.companies} prefix="/companies/" />
      </div>

      <div className="flex justify-center my-10 font-extrabold'">
        <Paginition totalPages={data?.total} />
      </div>
    </div>
  )
}

export default CompaniesList
