import React from 'react'
import { LogoWhite } from './Logo'
import { Link } from 'react-router-dom'
import "../page/Common.css"
const Banner = () => {
  return (
    <div className='lg:h-[80vh] pb-5 h-auto w-full bg-sky-50'>
     

      <div className="container home grid lg:grid-cols-2 pt-10 grid-cols-1 mx-auto h-full">
        <div className='w-full h-full flex flex-col justify-center items-end'>
          <div>
            <h5 className="lg:text-start text-gray text-base font-semibold  leading-normal">#1 nutrition tracking app</h5>

            <h1 className=" text-black text-3xl lg:text-start lg:text-[58px] mt-3 font-medium  lg:leading-[80px]">Reach your goals with</h1>
            <h1 className=" text-black text-3xl lg:text-start lg:text-[58px] mt-5 font-light  lg:leading-[55px]">Nutriflow AI</h1>
            <h4 className=" text-black lg:text-start text-base font-normal mt-5 leading-[30px]">Nutriflow AI: Transforming Youtube food content into personalized 
            nutrition data and science.</h4>
            <div className='flex lg:justify-start'>
              <Link to={'/user-interface'} className='btn px-10 bg-orange-500 rounded-1xl mt-5 '>
                <span className=" text-center text-white  text-base font-bold  uppercase leading-normal tracking-tight">Find Nutrition</span>
                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 25 25" fill="none">
                  <path d="M10.7 6.33997L9.29001 7.74997L13.87 12.34L9.29001 16.93L10.7 18.34L16.7 12.34L10.7 6.33997Z" fill="#ffffff" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
        <div className='w-full h-full flex lg:mt-0 mt-10 justify-center items-center'>
          <img id='home-img' src="/images/hero-phone-large.webp" alt="" className='h-[500px]' />
        </div>
      </div>
    </div>
  )
}

export default Banner