import React, { useEffect, useRef, useState } from 'react'
import Banner from '../Shared/Banner'
import Review from '../Shared/Review'
import Steps from '../Shared/Steps'
import Section_4 from '../Shared/Section_4'
import Section_5 from '../Shared/Section_5'
import Section_6 from '../Shared/Section_6'
import Section_7 from '../Shared/Section_7'
import Section_8 from '../Shared/Section_8'
import Section_9 from '../Shared/Section_9'
import Section_10 from '../Shared/Section_10'
import Section_11 from '../Shared/Section_11'
import Section_12 from '../Shared/Section_12'
import Footer from '../Shared/Footer'
import Navbar from '../Shared/Navbar'

const Home = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        console.log(scrollY)
        // Check if the user has scrolled down 100 pixels
        if (scrollY < 200) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };

    useEffect(() => {
        // Add scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div className=''>
            {/* <Navbar  /> */}
            <Banner />
            
             <Steps />
           {/* <Section_4 />
            <Section_5 />
            <Section_6 /> */}
            <Section_7 />
            {/* <Section_8 /> */}
            {/* <Section_9 /> */}
            {/* <Section_10 />
            <Section_11 />
            <Section_12 /> */}
            {/* <Footer /> */}
        </div>
    )
}

export default Home