import axios from '../api/axios';
import React, { useState, useEffect } from 'react'
import requests from '../api/requests';
import './Banner.css'

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    
    //현재 상영 중인 영화의 목록을 가져온다.
    const request = await axios.get(requests.fetchNowPlaying);

    //영화 목록 중 임의의 영화 ID를 하나 선택한다.
    const movieId = request.data.results[
        Math.floor(Math.random() * request.data.results.length)
    ].id;

    //선택된 영화의 상세정보(vedios 정보 포함)를 구조분해할당(data를 movieDetail 이름으로)하여 저장.
    //https://developers.themoviedb.org/3/getting-started/append-to-response
    const {data: movieDetail} = await axios(`movie/${movieId}`, {
        params: { append_to_response : 'videos' },
    });

    setMovie(movieDetail);
  }

  //str이 n보다 크면 n만큼 출력 후 뒤에 ... 붙이는 기능
  const truncate = (str, n) => {
    return str?.length>n ? str.substr(0, n-1) + '...' : str;
  }
  
  return (
    <header 
      className='banner' 
      style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}>

        <div className='banner__contents'>
          <h1 className='banner__title'>{movie.title || movie.name || movie.original_name}</h1>

          <div className='banner__buttons'>
            <button className='banner__button play'>Play</button>
            <button className='banner__button info'>More Information</button>
          </div>

          <h1 className='banner__description'>{truncate(movie.overview, 100)}</h1>
        </div>
        <div className='banner--fadeBottom'></div>
    </header>
  )
}


export default Banner