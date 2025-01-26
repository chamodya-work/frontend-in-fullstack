import React, { useEffect, useState } from 'react';
import './Banner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import images from '../../assets/bannerImages';
import { useNavigate } from 'react-router-dom';

const Banner = () => {

  const [movie, setMovie] = useState('');
  const [users, setUsers] = useState('');
  const navigate = useNavigate();

  console.log(localStorage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('http://localhost:8081/getAllMovies');
        const jsonResult = await result.json();

        const fetchedMovie = jsonResult[
          Math.floor(Math.random() * jsonResult.length)
        ]

        setMovie(fetchedMovie);
      } catch (error) {
        console.log(error)
      }
    }

    const fetchUsers = async () => {
      try {
        const result = await fetch('http://localhost:8081/getAllGUser');
        setUsers(await result.json());

      } catch (error) {
        console.log(error)
      }
    }

    fetchData();
    fetchUsers();
  }, []);


  useEffect(() => {
    if (users.length > 0) {
      let newUser = localStorage.getItem("userEmail");
      users?.map(user => {
        if (newUser === user.email) {
          let loggedUser = JSON.stringify(user);
          localStorage.setItem("loggedUser", loggedUser);
          console.log(localStorage);
        }
      });
    }
  }, [users]);

  console.log(movie);

  return (
    <div className='banner_wrapper'>
      <div className='banner__background'
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(
              ${movie?.backdrop_path}
            )`,
          backgroundPosition: "center center",
        }}
      />

      <div className='banner__leftGradient' />
      <div className='banner__topGradient' />
      <div className='banner__bottomGradient' />

      <div className='banner__content'>
        <img src=""></img>
        <h4>Duration: {movie?.watch_time} min</h4>
        <h3>{movie?.vote_average}</h3>
        <div>
          {movie?.genres?.map((genre, index) => (
            <span key={index}>{genre} | </span>
          ))}
        </div>
        <h2>{movie?.name}</h2>
        <p>{movie?.overview}</p>

        <div className='banner__content-buttons'>
          <button onClick={() => { navigate(`/movieTrailer/${movie?.movie_id}`) }} className='banner__content-buttons_watchButton buttons'><FontAwesomeIcon className="icon" icon={faPlay} />WATCH</button>
          <button className='banner__content-buttons_addListButton buttons'><FontAwesomeIcon className="icon" icon={faPlus} />ADD LIST</button>
        </div>
      </div>
    </div>
  )
}

export default Banner