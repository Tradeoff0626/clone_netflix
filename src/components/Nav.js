import React, { useState, useEffect } from 'react'
import './Nav.css'

function Nav() {
  const [show, setShow] = useState(false);

  //처음 랜더링이 될때 NavscrollY의 값이 변경되면 'show' 상태를 변경하는 이벤트 핸들러를 등록. unmount되면 초기화.
  useEffect(() => {
    window.addEventListener('scroll', () =>
        setShow(window.scrollY > 50 ? true : false)
    );

    return () => {
      window.removeEventListener('scroll', () => {});
    }
  }, [])
  
  return (
    //scroll이 맨위<->아래로 이동시 class가 다음과 같이 변경됨. ('nav false' <-> 'nav nav_black')
    <nav className={`nav ${show && 'nav__black'}`}>
        <img
            alt='Netflix logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/220px-Netflix_2015_logo.svg.png'
            className='nav__logo'
            onClick={ () => window.location.reload() }
        />
        <img 
            alt='User logged'
            src='https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41'
            className='nav__avatar'
        />
    </nav>
    );
}

export default Nav;
