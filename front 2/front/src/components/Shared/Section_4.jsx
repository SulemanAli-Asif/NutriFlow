import React from 'react'

const Section_4 = () => {
    return (
        <div className='w-full bg-white mt-20'>
            <div className="container mx-auto flex justify-center">
                <div className='lg:w-[993px] w-full h-auto py-5 lg:py-0 lg:h-[380px] bg-neutral lg:flex items-center justify-center lg:justify-between rounded-xl'>
                    <div className='lg:p-10 p-5'>
                    <h5 className="text-center lg:text-start text-neutral-400 text-base font-semibold leading-normal">35+ apps and devices</h5>
                    <h1 className="mt-3 text-white text-4xl lg:text-5xl font-semibold text-center lg:text-start leading-[60px]">Sync steps, weight,<br/>workouts & more</h1>
                    </div>
                    <img src="/images/app-integrations-large.webp" className='lg:h-[276px] ' alt="" />
                </div>
            </div>
        </div>
    )
}

export default Section_4