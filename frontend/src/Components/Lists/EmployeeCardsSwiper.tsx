
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import Card from '../Cards/EmployeeCard';
import EmployeeCard from '../Cards/EmployeeCard';


interface card{
  id: string,
  user_id: string,
  email: string,
  username: string,
  phonenumber: string,
  designation: string,
  hired_on: Date,
  role: string,
  status: string,
  image?:string,
  departmentName:string;
  companyName:string
}
interface Props{
    cards: card[];
}
const EmployeeCardsSwiper = ({cards}: Props) => {
  return (
    <>
      
      {
        cards && cards.length > 0
            ?
          <Swiper
              slidesPerView={3.5}
              breakpoints={{
                      480: {
                      slidesPerView: 1,
                      spaceBetween: 30
                      },
                  
                      640: {
                      slidesPerView: 2,
                      spaceBetween: 40
                      },
                      1024:{
                      slidesPerView: 3,
                      spaceBetween: 40
                      }
                      ,
                      1280:{
                      slidesPerView: 4,
                      spaceBetween: 40
                      }
                      
              }}
              spaceBetween={30}
              loop={true}
              pagination={{
                  clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"        
              >
              
              { 
              cards.map((card)=>(
                  <SwiperSlide key={card.id}>
                      <EmployeeCard
                        data={card}
                      />
                  </SwiperSlide>
                  ))
              }
          </Swiper>
      :null
    }
    </>


  )
}

export default EmployeeCardsSwiper