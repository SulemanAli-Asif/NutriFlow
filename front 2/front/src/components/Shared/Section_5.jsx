import React from 'react'

const Section_5 = () => {
    return (
        <div className='bg-primary lg:h-[448px] w-full mt-20'>
            <div className="container h-full mx-auto p-10 flex flex-col justify-center">
                <div className='flex justify-center'>
                    <img src="/images/section-5.svg" alt="" />
                </div>
                <h1 className="mt-5 text-center text-white text-4xl lg:text-[68px] font-semibold  lg:leading-[80px]">If it’s edible, it’s in here</h1>
                <h2 className="mt-5 text-center text-white text-2xl lg:text-[28px] font-normal  lg:leading-9">Food tracking app with 18 million global foods</h2>
                <button className='btn btn-link no-underline text-base lg:mt-5 mt-2 text-white'>Search food calories
                    <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 25 25" fill="none">
                        <path d="M10.39 6.69995L8.97998 8.10995L13.56 12.7L8.97998 17.29L10.39 18.7L16.39 12.7L10.39 6.69995Z" fill="white" />
                    </svg>

                </button>
            </div>
        </div>
    )
}

export default Section_5