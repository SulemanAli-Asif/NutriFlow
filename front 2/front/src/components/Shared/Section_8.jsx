import React from 'react'

const Section_8 = () => {
    return (
        <div className='w-full bg-white mt-32'>
            <div className="container mx-auto grid lg:grid-cols-2 justify-items-center">
                <div className='flex items-center'>
                    <img className='lg:w-[112.39px] w-[80px] lg:h-[185.66px]' src="/images/running-full.webp" alt="" />
                    <img className='lg:w-[231.22px] w-[150px] rounded-xl mx-5 lg:h-[361.42px]' src="/images/dietician-large.webp" alt="" />
                    <img className='lg:w-[112.39px] w-[80px] lg:h-[185.66px]' src="/images/food-full.webp" alt="" />
                </div>
                <div className='mt-10 lg:mt-0 p-2'>
                    <h5 className="text-neutral-500 text-base font-semibold  leading-normal text-center lg:text-start">Our Philosophy</h5>
                    <h1 className=" text-black text-opacity-90 lg:text-5xl text-4xl font-semibold text-center   lg:leading-[60px]">Knowledge is power</h1>
                    <p className=" text-black text-opacity-90 text-base font-normal text-center lg:text- mt-10 lg:leading-7">“Studies show people who keep a food diary are more likely<br />to hit their goals. Eterna Vitality simplifies nutrition and<br />calorie tracking, provides the data you want, and helps you<br />make sense of it all.</p>
                    <p className=" text-black text-opacity-90 text-base font-normal mt-10 text-center lg:text- lg:leading-7">Healthy eating is a continuous journey of self-discovery. And the more you track, the more empowered you’ll become to make healthy choices that support your goals.”
                    </p>
                    <p className=" text-neutral-500 text-sm font-normal mt-5 leading-normal">Stephanie Nelson, Eterna Vitality Registered Dietitian</p>
                </div>
            </div>
        </div>
    )
}

export default Section_8