import React from 'react'
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const About = () => {
    return (
        <>
        <Navbar />
        <div className='w-full bg-sky-50 lg:h-[624px] px-2 pt-10 lg:pt-0 h-auto'>
            <div className="w-7/12 mx-auto grid grid-cols-1 lg:grid-cols-2 justify-items-center h-full">
            <div className=''>
                    <img src="/images/daily-plan.webp" className='h-[572px]'  alt="" />
                </div>
                <div className='flex justify-center lg:items-start items-center  flex-col h-full'>
                    <h5 className=" text-blue-600 border-2 py-2 px-10 rounded-3xl border-slate-200 font-normal leading-normal">About Us</h5>
                    <h1 className="text-center lg:text-start lg:text-5xl text-4xl text-black mt-5">
                        <span className=''>Build healthy habbits</span>
                        <br />
                        <span className="">with Nutriflow AI</span>
                    </h1>
                    <p className='mt-4'>NutriFlow AI: Transforming YouTube's nutritional insights into <br />
                    personalized, actionalable health data.</p>
                    <button className='btn px-10 bg-orange-500 rounded-1xl mt-5'>
                        <span className=" text-center text-white text-base font-normal  leading-normal tracking-tight">Start Today</span>
                        
                    </button>
                </div>
               
            </div>
        </div>
        <Footer />
        </>
    )
}

export default About;