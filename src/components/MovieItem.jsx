import React from "react";
import { motion } from "framer-motion";

const MovieItem = ({ movies, addMovies, refreshMovies, updateRoundValue, roundValue }) => {
    
    const UpdateMovies = () => {
        if(roundValue < 6){
            refreshMovies();
        }
        updateRoundValue()
    }
  return (
    <div className="px-40">
      {movies.length === 0 ? (
        <p>There is no items</p>
      ) : (
        <div className="flex flex-wrap justify-center items-start gap-5">
          {movies.map((movie, index) => (
            <motion.div
              initial={{ x: -2000 }}
              animate={{ x: 0 }}
              transition={{ duration: 1.2, delay: 0 + index / 5}}
              exit={{ x: -2000 }}
              key={movie.id}
              className="w-[170px] h-[170px] rounded-xl overflow-hidden shadow-md mb-5 duration-200 border-4 hover:border-[#f8b500]"
              onClick={() => addMovies(movie)}
            >
                <div className="w-full h-full relative">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover duration-200 absolute"
                    />
                    <div className="titleOverlay text-sm text-white bg-[#00000098] w-full h-full opacity-0 hover:opacity-100 duration-200 absolute top-0 left-0 flex items-center justify-center uppercase font-bold text-center z-50 backdrop-blur-sm cursor-pointer" onClick={() => UpdateMovies()}>{movie.title}</div>
                </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieItem;
