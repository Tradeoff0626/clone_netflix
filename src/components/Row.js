import axios from '../api/axios';
import React, { useEffect, useState} from 'react'
import './Row.css'
import MovieModal from './MovieModal';

//구조분해 할당으로 props 받음
function Row({title, id, fetchUrl, isLargeRow}) {
  
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    //console.log('request', request);
    setMovies(request.data.results);
  }

  const handleClick = (movie) => {
    setModalOpen(true);         //modal 출력
    setMovieSelected(movie);    //modal에 전달할 movie 정보 설정
  }

  return (
    <section className='row'>
      <h2>{title}</h2>
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span 
            className='arrow' 
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth-80;
            }}
            >{'<'}
            </span>
        </div>
      <div id={id} className='row__posters'>
        {movies.map(movie => (
          <img 
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
        <div className='slider__arrow-right'>
          <span 
            className='arrow'
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth-80;
            }}
            >
            {'>'}
          </span>
        </div>
      </div>
      {
        modalOpen && (
          <MovieModal {...movieSelected /* movieSelected의 property들을 props로 전달 */} setModalOpen={setModalOpen} />
        )
      }
    </section>
  )
}

export default Row