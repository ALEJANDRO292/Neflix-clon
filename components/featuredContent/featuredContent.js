import React from 'react';
import './card.scss';

const Card = ({movie}) => {

    const posterBaseUrl = "http://image.tmdb.org/t/p/original";

    const handleShowDetails =() =>{

    }

    return (
        <div className="cardContainer">
            <img className="cardImg" src={`${posterBaseUrl}/${movie.poster_path}`} alt="" />
        </div>
    );
import React from "react";
import "./card.scss";

const Card = ({ movie }) => {
  const posterBaseUrl = "http://image.tmdb.org/t/p/original";

  return (
    <div className="cardContainer">
      <img
        className="cardImg"
        src={`${posterBaseUrl}/${movie.poster_path}`}
        alt=""
      />
      <div className="det">
        <span className="movieTitle">{movie.title}</span>
        <span className="movieVote">
          Imdb: <b>{movie.vote_average}</b>
        </span>
        <span className="movieLang">
          Language: <b>{movie.original_language}</b>
        </span>
      </div>
    </div>
  );
};



export default Card; 
export default Card;
 53  src/components/card/card.scss 
@@ -1,20 +1,45 @@
.cardContainer{
.cardContainer {
  transition: transform 300ms ease 100ms;

    transition: transform 300ms ease 100ms;
  &:hover {
    transform: scale(1.5) !important;

    &:hover{

        transform: scale(1.5) !important;        
    .det {
      visibility: visible;
    }


    .cardImg{
        margin: 10px;
        width: 228px;
        height: 128px;
        object-fit: cover;
  }

  .cardImg {
    margin: 10px;
    width: 228px;
    height: 128px;
    object-fit: cover;
  }

  .det {
    visibility: hidden;

    .movieTitle {
      position: absolute;
      bottom: 30px;
      left: 20px;
      font-weight: 700;
    }


} 
    .movieVote {
      position: absolute;
      bottom: 10px;
      left: 20px;
      font-size: 10px;
      font-weight: 300;
    }

    .movieLang {
      position: absolute;
      bottom: 10px;
      left: 65px;
      font-size: 10px;
      font-weight: 300;
    }
  }
}
 36  src/components/featuredContent/FeaturedContent.js 
@@ -0,0 +1,36 @@
import React from "react";
import "./featuredContent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";

const FeaturedContent = () => {
  return (
    <div
      className="featuredContainer"
      style={{ backgroundImage: `url(${require("../../assets/2.jpg")})` }}
    >
      <div className="desc">
        <div className="row titleImg">
          <img
            src={require("../../assets/forrest.webp")}
            alt=""
            className="m-5"
            width="400px"
          />
        </div>
        <div className="row buttons m-3">
          <button className="btn playButton">
            <FontAwesomeIcon icon={faPlay} className="mr-2" />
            Play
          </button>
          <button className="btn myListButton">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            My List
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;
 24  src/components/featuredContent/featuredContent.scss 
@@ -0,0 +1,24 @@
.featuredContainer{
    height: 90vh;
    background-size: cover;

    .desc{
        left: 0px;
        width: 40vw;
        height: 100%;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));

    }

    .playButton {
        font-weight: 700;
        background-color: white;
        margin-right: 10px;
      }

      .myListButton {
        font-weight: 900;
        background-color: #505050;
        color: white;
      }
} 
 69  src/components/navbar/Navbar.js 
@@ -0,0 +1,69 @@
import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGift,
  faBell,
  faSearch,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.scss";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-md navbar-dark fixed-top"
      style={{ backgroundColor: scrolled && "black" }}
    >
      <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <img src={Logo} alt="logo" height="50px" className="ml-3" />
        <ul className="navbar-nav">
          <li className="nav-item ml-5">Home</li>
          <li className="nav-item ml-3">Tv Shows</li>
          <li className="nav-item ml-3">Movies</li>
          <li className="nav-item ml-3">Latest</li>
          <li className="nav-item ml-3">My List</li>
        </ul>
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-3">
            <FontAwesomeIcon icon={faSearch} />
          </li>
          <li className="nav-item mr-3">KIDS</li>
          <li className="nav-item mr-3">
            <FontAwesomeIcon icon={faGift} />
          </li>
          <li className="nav-item mr-3">
            <FontAwesomeIcon icon={faBell} />
          </li>
          <li className="nav-item">
            <img
              src={require("../../assets/user.jpg")}
              alt="user"
              height="25px"
              className="mr-1"
            />
            <FontAwesomeIcon icon={faCaretDown} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
 0  src/components/navbar/navbar.scss 
Empty file.
  157  src/pages/homepage/Homepage.js 
@@ -4,15 +4,22 @@ import Card from "../../components/card/Card";
import Slider from "react-slick";
import axios from "axios";
import Detail from "../../components/details/Details";
import Navbar from "../../components/navbar/Navbar";
import FeaturedContent from "../../components/featuredContent/FeaturedContent";

const Homepage = () => {
  const API_KEY = "641aef8bfa01c60ca1f37f2125893261";
  const [popularMovies, setPopularMovies] = useState(null);
  const [trendMovies, setTrendMovies] = useState(null);
  const [actionMovies, setActionMovies] = useState(null);
  const [horrorMovies, setHorrorMovies] = useState(null);
  const [familyMovies, setFamilyMovies] = useState(null);

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  let refT, refP = useRef(null);
  const executeScroll = (r) => scrollToRef(r);
  const refT = useRef();
  const refP = useRef();
  const refA = useRef();
  const refH = useRef();
  const refF = useRef();

  useEffect(() => {
    axios
@@ -21,25 +28,38 @@ const Homepage = () => {
    axios
      .get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`)
      .then((res) => setTrendMovies(res.data.results));
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`
      )
      .then((res) => setActionMovies(res.data.results));
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`
      )
      .then((res) => setHorrorMovies(res.data.results));
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10751`
      )
      .then((res) => setFamilyMovies(res.data.results));
  }, []);

  console.log(popularMovies);

  const [detailSection, setDetailSection] = useState({
    staus: false,
    section: null,
  });
  const [detail, setDetail] = useState(null);

  const handleDetail = (movie, section, r) => {
    executeScroll(r)
  const handleDetail = (movie, section, ref) => {
    setDetailSection({
      staus: true,
      section: section,
    });
    axios
      .get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`)
      .then((res) => setDetail(res.data));
    window.scrollTo(0, ref.current.offsetTop);
  };

  let settings = {
@@ -50,54 +70,13 @@ const Homepage = () => {
    speed: 500,
  };
  return (
    <div className="container-fluid homepageContainer">
      <nav class="navbar navbar-expand-md navbar-dark bg-transparent">
        <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Left
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="//codeply.com">
                Codeply
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
          </ul>
        </div>
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">
                Right
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
          </ul>
        </div>
      </nav>
    <div className="homepageContainer">
      <FeaturedContent/>
      <Navbar/>
      <div>
        <span className="genreTitle" ref={refT}>Trends on Netflix</span>
        <span className="genreTitle" ref={refT}>
          Trends on Netflix
        </span>
        <Slider {...settings}>
          {trendMovies &&
            trendMovies.map((movie) => (
@@ -117,7 +96,9 @@ const Homepage = () => {
          />
        )}
      <div>
        <span className="genreTitle" ref={refP}>Populer on Netflix</span>
        <span className="genreTitle" ref={refP}>
          Populer on Netflix
        </span>
        <Slider {...settings}>
          {popularMovies &&
            popularMovies.map((movie) => (
@@ -136,6 +117,72 @@ const Homepage = () => {
            setDetail={setDetail}
          />
        )}
      <div>
        <span className="genreTitle" ref={refA}>
          Action Movies
        </span>
        <Slider {...settings}>
          {actionMovies &&
            actionMovies.map((movie) => (
              <div onClick={() => handleDetail(movie, "action", refA)}>
                <Card movie={movie} />
              </div>
            ))}
        </Slider>
      </div>
      {detail &&
        detailSection.section &&
        detailSection.section === "action" && (
          <Detail
            detail={detail}
            setDetailSection={setDetailSection}
            setDetail={setDetail}
          />
        )}
      <div>
        <span className="genreTitle" ref={refH}>
          Horror Movies
        </span>
        <Slider {...settings}>
          {horrorMovies &&
            horrorMovies.map((movie) => (
              <div onClick={() => handleDetail(movie, "horror", refH)}>
                <Card movie={movie} />
              </div>
            ))}
        </Slider>
      </div>
      {detail &&
        detailSection.section &&
        detailSection.section === "horror" && (
          <Detail
            detail={detail}
            setDetailSection={setDetailSection}
            setDetail={setDetail}
          />
        )}
      <div>
        <span className="genreTitle" ref={refF}>
          Family Movies
        </span>
        <Slider {...settings}>
          {familyMovies &&
            familyMovies.map((movie) => (
              <div onClick={() => handleDetail(movie, "family", refF)}>
                <Card movie={movie} />
              </div>
            ))}
        </Slider>
      </div>
      {detail &&
        detailSection.section &&
        detailSection.section === "family" && (
          <Detail
            detail={detail}
            setDetailSection={setDetailSection}
            setDetail={setDetail}
          />
        )}
    </div>
  );
};
  9  src/pages/homepage/homepage.scss 
@@ -1,6 +1,5 @@
.homepageContainer {
  background-color: black;
  height: 1000px;
  color: white;
  font-family: "Roboto", sans-serif;

@@ -46,14 +45,6 @@
      font-weight: 700;
    }
  }

  .sliderContainer {
    &:hover {
      .cardContainer {
        transform: translateX(-25%);
      }
    }
  }
  .genreTitle {
    margin: 10px;
    font-weight: 700;