
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

const Section_6 = () => {
    return (
        <div className='w-full mt-20 bg-white'>
            <div className="container mx-auto">
                <h5 className="text-center text-neutral-500 text-base font-semibold  leading-normal">Get Results</h5>
                <h1 className=" text-center text-black text-opacity-90 lg:text-5xl text-4xl font-semibold mt-5 lg:leading-[60px]">Nutrition tracking works,<br />here's the proof</h1>
                <div className="lg:flex justify-center mt-14 p-5">
                    <img className='w-[297.50px] lg:mx-0 mx-auto h-[314.44px]' src="/images/success-users-left-desktop.webp" alt="" />
                    <div className='lg:w-[327px] w-full h-[180px]'>
                        <Carusel />
                    </div>
                    <img className='w-[297.50px] mx-auto lg:mx-0 mt-20 lg:mt-0 h-[314.44px]' src="/images/success-users-right.webp" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Section_6

const Carusel = () => {
    return <div className='p-5'>
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper-2"
        >
            {
                slides.map((r, index) => (
                    <SwiperSlide key={index}>
                        <Card data={r} />
                    </SwiperSlide>
                ))
            }


        </Swiper>
    </div>
}
const Card = ({ data }) => {
    return <div>
        <p className='text-sm'>“{data.title}”</p>
        <h5 className='text-xs font-semibold mt-5'>{data.user}</h5>
    </div>
}

const slides = [
    {
        title: "I was 307 lbs, and today I am 199 lbs. I participated in a diabetes prevention program, learning how proper nutrition and exercise are essential. That is when I began using Eterna Vitality. I still use it everyday.",
        user: "Rohis. s"

    },
    {
        title: "I was 307 lbs, and today I am 199 lbs. I participated in a diabetes prevention program, learning how proper nutrition and exercise are essential. That is when I began using Eterna Vitality. I still use it everyday.",
        user: "Rohis. s"

    },
    {
        title: "I was 307 lbs, and today I am 199 lbs. I participated in a diabetes prevention program, learning how proper nutrition and exercise are essential. That is when I began using Eterna Vitality. I still use it everyday.",
        user: "Rohis. s"

    },
    {
        title: "I was 307 lbs, and today I am 199 lbs. I participated in a diabetes prevention program, learning how proper nutrition and exercise are essential. That is when I began using Eterna Vitality. I still use it everyday.",
        user: "Rohis. s"

    },
]