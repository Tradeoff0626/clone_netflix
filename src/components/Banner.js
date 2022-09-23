import axios from '../api/axios';
import React, { useState, useEffect } from 'react'
import requests from '../api/requests';
import './Banner.css'
import styled from 'styled-components';

function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

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

  if(!isClicked) {
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
              <button className='banner__button play' onClick={() => setIsClicked(true)}>Play</button>
              <button className='banner__button info'>More Information</button>
            </div>
  
            <h1 className='banner__description'>{truncate(movie.overview, 100)}</h1>
          </div>
          <div className='banner--fadeBottom'></div>
      </header>
    );
  } else {
    return (
      //비디오 배너를 styled-component로 구현
      <Container>
        <HomeContainer>
          <Iframe 
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
            >
          </Iframe>
        </HomeContainer>
      </Container>
    )
  }
}

//Style을 JS 형식으로 컴포넌트화
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;


const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export default Banner