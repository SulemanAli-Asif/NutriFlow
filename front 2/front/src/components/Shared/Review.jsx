
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

const Review = () => {
    return (
        <div className='lg:h-[453px] h-[400px] bg-neutral w-full'>
            <div className="container mx-auto flex h-full flex-col items-center justify-center">
                <div className="rating">
                    <input type="radio" name="rating-1" className="mask mask-star bg-warning" />
                    <input type="radio" name="rating-1" className="mask mask-star bg-warning" />
                    <input type="radio" name="rating-1" className="mask mask-star bg-warning" />
                    <input type="radio" name="rating-1" className="mask mask-star bg-warning" />
                    <input type="radio" name="rating-1" className="mask mask-star bg-warning" checked />
                </div>
                <h1 className=" text-center text-white text-4xl lg:text-5xl font-semibold mt-8  lg:leading-[60px]">3.7 Million 5-Star Reviews</h1>

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
                    className="lg:h-[150px] h-[170px]"
                >
                    {
                        reviews.map((r, index) => (
                            <SwiperSlide key={index}>
                                <ReviewCard data={r} />
                            </SwiperSlide>
                        ))
                    }


                </Swiper>
            </div>
        </div>
    )
}

export default Review

const ReviewCard = ({ data }) => {
    return (
        <div className='flex flex-col items-center'>
            <h5 className="mt-5 text-center text-white text-xl font-normal  leading-7">“{data.title}”</h5>
            <p className='text-white text-sm mt-2'>{data.user}</p>
        </div>
    )
}

const reviews = [
    {
        title: "Can’t lose weight and stay on track without it.",
        user: "Laura K."
    },
    {
        title: "Helped me get moving on my goals and tracking my weight loss and bodybuilding.",
        user: "Annette B."

    }, {
        title: "Not only are the tools super helpful, the customer service is insanely awesome!",
        user: "Iain M."
    }

]