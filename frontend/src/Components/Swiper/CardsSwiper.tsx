
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import BasicCard from '../Cards/BasicCard';


interface card{
    id: string
    name: string
    created_at: Date
    description: string
}
interface Props{
    cards: card[];
    prefix: string
}
const CardsSwiper = ({cards, prefix}: Props) => {
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
                      <BasicCard prefix={prefix} card={card} />
                  </SwiperSlide>
                  ))
              }
          </Swiper>
      :null
    }
    </>


  )
}

export default CardsSwiper