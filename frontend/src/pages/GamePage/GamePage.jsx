import React from 'react'
import './GamePage.css'
import { useParams, useNavigate } from 'react-router-dom'
import { games } from '../../assets/assets.js'

const GamePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const game = games.find(g => g.id === Number(id))

  if (!game) {
    return (
      <section id='GamePage'>
        <div className="game-header">
          <p>Juego no encontrado.</p>
          <button onClick={() => navigate(-1)}>Volver</button>
        </div>
      </section>
    )
  }

  return (
    <section id='GamePage'>
      <header className="game-header" style={{ backgroundImage: `url(${game.image})` }}>
        <div className="game-header-overlay">
          <div className="game-header__desc">
            <div className="header-desc__left">
              <h1 className='game-title'>{game.title}</h1>
              <div className="game-key__description">
                <p>DEV: <span className='green-color'>{game.developer}</span></p>
                <p>
                  PLATFORM: <span className='white-color'>
                  {Array.isArray(game.platforms)
                    ? game.platforms.join(' / ')
                    : game.platforms}
                    </span>
                </p>

                <p>GENRE: <span className='white-color'>{game.genre}</span></p>
                {/*<p>RELEASE: <span className='white-color'>{game.release_year}</span></p>
                <p>RATING: <span className='white-color'>{game.rating}</span></p>*/}
              </div>
            </div>

            <div className="header-desc__right">
              <button className='btn-add_fav'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" classname="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-Rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
</svg> AGREGAR A FAV</button>
              <button>ESCRIBE UNA RESEÑA</button>
            </div>
          </div>
        </div>
      </header>

      <main className='game-details'>
        <h2>Descripción</h2>
        <p>{game.description}</p>
      </main>
    </section>
  )
}

export default GamePage
