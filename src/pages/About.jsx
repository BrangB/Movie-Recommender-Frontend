import React from 'react'
import {motion} from 'framer-motion'
import "../css/main.css"
import { useLottie } from "lottie-react";
import step from '../lottie/step.json'
import movie_about from '../assets/movies_about.jpg'
import movies_result from '../assets/movies_result.png'
import { FaArrowLeft } from "react-icons/fa";
import {Link} from 'react-router-dom'

const About = () => {
  
  const options = {
    animationData: step,
    loop: true
  };

  const { View } = useLottie(options);

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <motion.div 
            initial={{ x: -1000 }}
            animate={{ x:  0}}
            transition={{ duration: 1, delay: .2}}
            className='fixed top-10 left-20'>
              <Link to='/'><div className='text-xl bg-[#f8b500] text-white py-3 px-4'><FaArrowLeft /></div></Link>
        </motion.div> 
        <motion.div 
            initial={{ y: -1000 }}
            animate={{ y:  0}}
            transition={{ duration: 1}}  
            className='w-full h-auto md:w-[500px] md:h-[600px] bg-white p-4 shadow-lg overflow-y-auto aboutmodel'
        >
          <div className='flex justify-between items-center mb-6'>
            <div className=' p-5 text-3xl font-semibold text-[#f8b500] bebas-neue-regular text-left leading-8'>About Us <br />&<br /> Instruction</div>
            <div>
              {View}
            </div>
          </div>
          <div className='p-6'>
            <p className='py-2 px-5 text-sm font-bold uppercase bg-[#f8b500] text-white inline-block'>How To Use</p>
            <p className='text-justify mt-5'>
              <span className='font-bold'>Select Your Preferences:</span> Choose your favorite movies. We will provide random movies with 5 rounds. You have to choice one movie in each round.
              Then click to generate recommendation movies. <br />
              <div className='w-[90%] h-[150px] m-6 mx-auto'>
                <img src={movie_about} className='w-full h-full object-cover' alt="choice movei" />
              </div>
              <span className='font-bold'>Get Recommendations: </span>After rating five movies, we'll generate personalized movie recommendations based on your preferences.<br />
              <div className='w-[90%] h-[150px] m-6 mx-auto'>
                <img src={movies_result} className='w-full h-full object-cover' alt="choice movei" />
              </div>
              <span className='font-bold'>Explore Recommendations: </span>Click on any recommended movie to learn more about it and start watching.<br />
              <span className='font-bold'>Provide Feedback: </span>Help us improve by rating the recommended movies. Your feedback ensures better recommendations in the future.
              Ready to find your next favorite movie? Click on the "Begin Recommendation" button to start!</p>
        </div>
        </motion.div>

    </div>
  )
}

export default About