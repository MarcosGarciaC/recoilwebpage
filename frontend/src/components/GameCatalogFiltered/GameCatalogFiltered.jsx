import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import './GameCatalogFiltered.css'
import { games } from '../../assets/assets.js'

const availableGenres = [
  'Acción',
  'RPG',
  'Estrategia',
  'Indie',
  'Deportes',
  'Horror',
  'Simulación',
  'Realidad Virtual'
]

const normalizeText = text =>
  text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const GameCatalogFiltered = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const selectedGenre = searchParams.get('genre') || ''
  const normalizedGenre = normalizeText(selectedGenre)

  const [score, setScore] = useState(5)

  const filteredGames = games.filter(game => {
    const matchesGenre = selectedGenre
      ? normalizeText(game.genre).includes(normalizedGenre)
      : true

    const matchesScore = game.rating <= score

    return matchesGenre && matchesScore
  })
  const onGenreClick = genre => {
    navigate(`/gamecatalogfiltered?genre=${encodeURIComponent(genre)}`)
  }

  const onGameClick = id => {
    navigate(`/game/${id}`)
  }



  return (
    <div className='game-catalog-filtered-page'>
      <aside>
        <p className='aside-title'>Refine Results</p>
        <div className='genre-filter'>
          <p className='p-number'>GENRE SELECTION</p>

          <div className='genre-selection__array'>
            {availableGenres.map(genre => (
              <button key={genre} className={`genre-selection__btn ${normalizeText(genre) === normalizedGenre ? 'active' : ''}`} onClick={() => onGenreClick(genre)}>
                {genre.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className='range-filter'>
          <p className='p-number'>
            SCORE RANGE ({score} - 5)
          </p>

          <input
            type='range'
            id='score-range'
            min='0'
            max='5'
            step='0.1'
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            style={{
              background: `linear-gradient(
        to right,
        #9CFF93 0%,
        #9CFF93 ${(score / 5) * 100}%,
        #2b2b2b ${(score / 5) * 100}%,
        #2b2b2b 100%
      )`
            }}
          />
        </div>
        <div className='platform'>
          <p className='p-number'>SELECCION DE PLATAFORMA</p>
          <div id='checkbox-list'>
            <label>
              <input type='checkbox' />
              PLAYSTATION 5
            </label>

            <label>
              <input type='checkbox' />
              PC / WINDOWS
            </label>

            <label>
              <input type='checkbox' />
              XBOX SERIES X
            </label>
          </div>
        </div>
      </aside>

      <main className='catalog-results'>
        <div className='catalog-header'>
          <h1 id='h1-header__catalog'>{selectedGenre ? `Catalogo de juesgos de ${selectedGenre}` : 'Catálogo completo'}</h1>
          <p className='hero-overlay__text'>
            {selectedGenre
              ? `Mostrando ${filteredGames.length} resultado${filteredGames.length === 1 ? '' : 's'} para "${selectedGenre}"`
              : 'Selecciona un género desde Genders para filtrar el catálogo.'}
          </p>
        </div>

        <div className='display-games__catalog'>
          {filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <div
                className="game-card"
                key={game.id}
                role="button"
                tabIndex={0}
                onClick={() => onGameClick(game.id)}
                onKeyDown={(e) => { if (e.key === 'Enter') onGameClick(game.id) }}
              >
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
            ))
          ) : (
            <div className='catalog-empty'>
              <p>No se encontraron juegos para este género.</p>
              <small>Prueba otro género desde la selección.</small>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default GameCatalogFiltered