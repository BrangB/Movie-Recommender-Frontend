import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RandomMoviesContainer } from "../main";
import MovieItem from "../components/MovieItem";
import { useNavigate } from 'react-router-dom';
import Loading from "../components/Loading";


const Movies = () => {
    const { movies, setMovies, chosenMovies, setChosenMovies , setRecommendedMovies } = useContext(RandomMoviesContainer);
    const [roundValue, setRoundValue] = useState(1);
    const navigate = useNavigate();

    const API_KEY = '8ecbf28985308ca3b14b540321587f1f';
    const API_URL = 'https://api.themoviedb.org/3';

    const local = "http://127.0.0.1:8080"
    const server = "https://moviebackendpython.onrender.com"
    
    const getMovies = async () => {
        try {
            const response = await axios.get(`${API_URL}/movie/popular?release_date.lte=2018-01-01`, {
                params: {
                    api_key: API_KEY,
                    language: 'en-US',
                    page: Math.floor(Math.random() * 100) + 1,
                },
            });
            
            const randomMovies = response.data.results
                .sort(() => Math.random() - 0.5)
                .slice(0, 10);
    
            setMovies(randomMovies);
        } catch (error) {
            console.error('Error fetching random movies:', error);
        }
    }

    const addMovies = (movie) => {
        setChosenMovies(prevChosenMovies => [...prevChosenMovies, { movie_id: movie.id, title: movie.title }]);
    }

    useEffect(() => {
        getMovies();
    }, []);


    useEffect(() => {
        if (roundValue === 6) {
            console.log("sending");
            console.log(chosenMovies);
    
            axios.post(`${server}/recommendations`, chosenMovies)
            .then(response => {
                console.log('Data sent successfully:', response.data);
                setRecommendedMovies(response.data.recommendations)
                localStorage.setItem("r_movies", JSON.stringify(response.data.recommendations));
                navigate("/recommendations_result");
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });        
        }
    }, [chosenMovies, roundValue]);

    

    const updateRoundValue = () => {
        setRoundValue(prevVal => prevVal + 1);
    }
  
    return (
        <div>
            {roundValue !== 6 ? (
                <div className="w-full flex items-center justify-center text-2xl p-12 flex-col gap-8 overflow-hidden">
                    <h1 className="text-5xl font-bold text-gradient">Choose A Movie</h1>
                    <span className="text-[#f8b500] text-2xl uppercase font-bold">Round ({roundValue})</span>
                    <MovieItem movies={movies} addMovies={addMovies} refreshMovies={getMovies} updateRoundValue={updateRoundValue} roundValue={roundValue}/>
                </div>
            ) : (
            <div className="w-screen h-screen flex items-center justify-center text-2xl p-12 flex-col gap-8 overflow-hidden">
                <h1 className="text-4xl font-bold text-gradient">Generating Recommendations</h1>
                <Loading />
            </div>
            )}
        </div>
    );
}

export default Movies;
