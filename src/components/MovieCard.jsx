import { Link } from "react-router-dom"

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : null;

  const detailUrl = `/movies/${movie.id}`

  return (
    <div className="flex w-[180px]">
        <div className="shadow-lg rounded overflow-hidden flex flex-col w-full">
            {posterUrl ? 
            (
                <img className="h-[230px] w-full object-contain" src={posterUrl} alt={movie.original_title} />
            ) 
            : 
            (   
                <div className="text-center p-4">
                    <h3 className="text-lg mt-2">No Photo yet</h3>
                </div>
            )}
            <div className="p-4">
              <h5 className="text-lg font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">{movie.original_title}</h5>
              <p className="mt-2 text-gray-600">{movie.release_date}</p>
                <Link to={detailUrl} className="mt-4 inline-block px-4 py-2 text-sm text-center font-semibold 
                text-white bg-blue-500 rounded-xl hover:bg-blue-600">
                  Details
                </Link>
            </div>
        </div>
    </div>
  );
};

export default MovieCard;