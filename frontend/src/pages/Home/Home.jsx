import React, { useRef, useEffect } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'

import { header_games } from '../../assets/assets.js'
import { games } from '../../assets/assets.js'

//category images
import fps_category from '../../assets/banner_tac_stance.jpg'
import rpg_category from '../../assets/adventure.webp'
import sim_category from '../../assets/unnamed.png'

const Home = () => {
  const carouselRef = useRef(null)

  const navigate = useNavigate()

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.game-card').offsetWidth
      carouselRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.game-card').offsetWidth
      carouselRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const cardWidth =
          carouselRef.current.querySelector('.game-card').offsetWidth + 30

        const maxScrollLeft =
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth

        // Si llega al final, vuelve al inicio
        if (carouselRef.current.scrollLeft >= maxScrollLeft) {
          carouselRef.current.scrollTo({
            left: 0,
            behavior: 'smooth'
          })
        } else {
          carouselRef.current.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
          })
        }
      }
    }, 3000) 

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      {
        threshold: 0.15
      }
    )

    reveals.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])
  
  return (
    <section id='home' >
      <header className='hero-section' >
        {header_games.map((game, index) => {
          return (
            <div className='hero-games' key={index}>
              <img src={game.game_img} alt="Hero" className='hero-section__img' />
              <div className='overlay'>
                <div className="text-overlay reveal reveal-left">
                  <h2 className='hero-overlay__heading'>{game.game_name}</h2>
                  <p className='hero-overlay__text'>{game.game_description}</p>
                  <div className="btn-overlay">
                    <button className='btn-review' onClick={() => navigate(game.game_link)}>Leer reseñas</button>
                    <button className='btn-gameplay' onClick={() => window.open(game.game_video, "_blank")}>Ver Gameplay</button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </header>
      <section id='featured-genders' className='reveal reveal-right'>
        <div className='fg-heading__txt'>
          <div className='htxt-left'>
            <p className='htxt-p'>Pulse check</p>
            <h3 className='htxt-h3'>Categorias destacadas</h3>
          </div>
          <div className="htxt-right">
            <p>LIVE DATA FEED / 2024</p>
          </div>
        </div>
        {/*BENTO GRID */}
        <div className="categories-box">
          <div className="box" style={{ gridArea: "box-1" }}>
            <img src={fps_category} alt="" className='' />
            <div className="categorie-info">
              <p className='p-number width'>01 / Genre</p>
              <h4 className='h4-gener width'>FPS Tactico</h4>
              <p className='p-description width'>Precisión que presiona y ejecuta un abrumador momento en los videojuegos</p>
              <a className='link-to__page'>Explora más</a>
            </div>
          </div>
          <div className="box" style={{ gridArea: "box-2" }}>
            <img src={rpg_category} alt="" className='' />
            <div className="categorie-info">
              <p className='p-number width blue-color'>02 / World Building</p>
              <h4 className='h4-gener width'>RPG MUNDO ABIERTO</h4>
              <a className='link-to__page'>Explora más</a>
            </div></div>
          <div className="box" style={{ gridArea: "box-3" }}>
            <div className="categorie-info indie">
              <p className='p-number width purple-color'>03 / RADAR</p>
              <h4 className='h4-gener width'>Gemas Indie</h4>
              <a className='link-to__page hidden-cgr'>HIDDEN</a>
            </div></div>
          <div className="box" style={{ gridArea: "box-4" }}>
            <img src={sim_category} alt="" className='' />
            <div className="categorie-info">
              <h4 className='h4-gener width'>ultra sim</h4>
              <a className='link-to__page'>Explora más</a>
            </div></div>
        </div>
      </section>
      <section id='elite-rating' className='reveal reveal-left'>
        <div className="head-heading">
          <h1>Elite Ratings</h1>
          <div className="head-options">
            <button onClick={scrollLeft}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
              <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
            </svg></button>
            <button onClick={scrollRight}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
              <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
            </svg></button>
          </div>
        </div>
        <div className='game-cards__carousel' ref={carouselRef}>
          {games.map((game, index) => {
            return (
              <div className="game-card" key={index}>
                <div>
                  <div className="rating-overlay">
                    <p className='user-score__number'>{game.rating}</p>
                    <p className='user-score'>USER SCORE</p>
                  </div>
                  <img src={game.image}></img>
                </div>
                <div className='game-card__description'>
                  <h3>{game.title}</h3>
                  <div className='description-details'>
                    <p>{game.genre}</p>
                    <span className='separator-dot'></span>
                    <p>{game.release_year}</p>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </section>
      <section id='discord-call__action' className='reveal reveal-right'>
        <div className='call-action__box'>
          <div className='message-icon'>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#9CFF93" className="bi bi-chat-left" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#9CFF93" className="bi bi-chat-left-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            </svg>
          </div>
          <h1>JOIN THE KINETIC CRITIQUE</h1>
          <p>Be part of a high-octane community of analysts, developers, and pro-players.
            Real-time discussions, early review access, and direct links to the RECOIL staff.</p>
          <button className='call-action__button'>JOIN THE DISCORD <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
            <path fill-Rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
            <path fill-Rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
          </svg></button>
        </div>
      </section>
    </section>
  )
}

export default Home
