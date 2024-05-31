import { useParams } from "react-router-dom";
import { useGetCompaniesDetailsQuery } from "../../redux/api/companies"
import SectionHeader from "../../Components/Common/SectionHeader";
import DetailsSection from "./components/DetailsSection";
import CardsList from "../../Components/Lists/CardsList";

const CompanyDetails = () => {
  let {company_id} = useParams();
  
  const {data} = useGetCompaniesDetailsQuery({company_id})
  return (
    <div className="lg:w-[80%] min-h-screen w-full mx-auto bg-white rounded-lg my-3 overflow-hidden p-5">
      <SectionHeader title={data?.company.name} />
      <DetailsSection company={data?.company} is_employee={data?.is_employee} />
      <p className="mx-4 my-12 font-semibold">
        {data?.company.description}
      </p>

      <CardsList cards={data?.departments} />
    </div>
  )
}

export default CompanyDetails
