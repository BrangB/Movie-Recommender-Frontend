import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RandomMoviesContainer } from "../main";
import {motion} from 'framer-motion';
import { FaArrowLeft } from "react-icons/fa";
import {Link} from 'react-router-dom';

const MovieDetailsView = () => {

  const { id } = useParams();
  const { recommendedMovies } = useContext(RandomMoviesContainer);
  const foundMovie = recommendedMovies.find(movie => movie.id === Number(id));
  const [movie, setMovie] = useState(foundMovie);
  const [loading, setLoading] = useState(!foundMovie);

  console.log(recommendedMovies)
  console.log(movie)

  useEffect(() => {
    if (!movie) {
      const API_KEY = '8ecbf28985308ca3b14b540321587f1f';

      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(movie => {
          setMovie(movie);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : null;

  return (
    <section>
      <motion.div 
          initial={{ x: -1000 }}
          animate={{ x:  0}}
          transition={{ duration: 1, delay: .2}}
          className='fixed top-10 left-20'>
            <Link to='/recommendations_result'><div className='text-xl bg-[#f8b500] text-white py-3 px-4'><FaArrowLeft /></div></Link>
      </motion.div> 
      <div className=' flex max-xl:flex-col max-lg:mx-20 justify-center mx-64 my-10 gap-6'>
        <img src={posterUrl} alt="" className=' max-xl:w-[400px] flex-shrink-0'/>
        <div className=''>
          <h1 className=' text-5xl text-center font-bold my-10'>{movie.original_title}</h1>
          <h4 className=' text-2xl my-5'>
              {movie.tagline}
          </h4>
          <p className="lead mt-3 text-gray-600 text-xl my-10">
            <span className=' text-2xl text-gray-950'>
              Overview
            </span>
             - {movie.overview}
          </p>
          <h4 className=' text-2xl my-5'>
              Release Date - {movie.release_date}
          </h4>
          <h4 className=' text-2xl my-5'>
              Language - {movie.spoken_languages[0].name}
          </h4>
          <h4 className=' text-2xl my-5'>
              Genres - {movie.genres.map((genre, i) => genre.name).join(', ')}
          </h4>
        </div>
      </div>
    </section>
  )
}

export default MovieDetailsView;