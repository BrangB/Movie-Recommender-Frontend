import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

export const RandomMoviesContainer = createContext(null);

function Index() {
  const [movies, setMovies] = useState([]);
  const [chosenMovies, setChosenMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <RandomMoviesContainer.Provider value={{ movies, setMovies, chosenMovies, setChosenMovies, recommendedMovies, setRecommendedMovies }}>
          <App />
        </RandomMoviesContainer.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Index />);
