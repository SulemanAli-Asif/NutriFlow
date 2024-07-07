import React from 'react'
import { LogoWhite } from './Logo'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <section className='bg-black pb-5 pt-10'>
            <footer className="footer p-10 container mx-auto  text-white mt-20">
                <aside>
                    <LogoWhite />
                    {/* <img src="/logo.png" className="h-10" alt="" /> */}
                    <h3 className="mt-10 text-white text-base font-normal font-['Inter'] leading-tight">NutriFlow AI: Translationg YouTube's food <br />content into your daily nutritional data.</h3>
                    <div className='flex justify-center mt-5 items-center'>
                    <a className='p-2' href=""><img src="/images/icon/icon-1.svg" alt="" /></a>
                    <a className='p-2' href=""><img src="/images/icon/icon-2.svg" alt="" /></a>
                    <a className='p-2' href=""><img src="/images/icon/icon-3.svg" alt="" /></a>
                    <a className='p-2' href=""><img src="/images/icon/icon-4.svg" alt="" /></a>
                    <a className='p-2' href=""><img src="/images/icon/icon-5.svg" alt="" /></a>
                    <a className='w-6 h-6 flex justify-center items-center rounded-full bg-white' href=""><img src="/images/icon/icon-6.svg" alt="" /></a>
                </div>
                </aside>
                <nav>
                    <header className="footer-title">Quick Links</header>
                    <a className="link link-hover">Home</a>
                    <a className="link link-hover">About</a>
                    <a className="link link-hover">Pricing</a>
                    <a className="link link-hover">Contact</a>
                </nav>
                <nav>
                    <header className="footer-title">Support</header>
                    <a className="link link-hover">Privacy Policy</a>
                    <a className="link link-hover">Language</a>
                    <a className="link link-hover">Terms & Conditions</a>
                
                </nav>
                <nav>
                    <header className="footer-title">Contact Info</header>
                    <a className="link link-hover">+11234567890</a>
                    <a className="link link-hover">infor@domain.com</a>
                    <a className="link link-hover">t20 King St Charlson Sc</a>
                </nav>
            </footer>
            <div className='flex flex-col items-center text-sm pt-4'>
                <div className='lg:flex text-center text-gray-300 foot'>
                    <p>©Nutriflow AI, All Rights Reserved (2024)
                    </p>
                   
                </div>
                
            </div>
        </section>
    )
}

export default Footer