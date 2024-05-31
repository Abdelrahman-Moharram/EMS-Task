
import SectionHeader from '../../../Components/Common/SectionHeader'
import CardsSwiper from '../../../Components/Swiper/CardsSwiper'
import { useGetCompaniesListQuery } from '../../../redux/api/companies'
import LinkWithArrow from '../../../Components/Buttons&Links/LinkWithArrow'


const Companies = () => {
  const {data} = useGetCompaniesListQuery({page:0, size:5})
  return (
    <div>
      <SectionHeader title='Top Companies' />
      <CardsSwiper prefix='/companies/' cards={data?.companies} />

      <div className="flex justify-end  mr-8">
        <LinkWithArrow 
          href='/companies'
          text='All Companies'
        />
      </div>
    </div>
  )
}

export default Companies
