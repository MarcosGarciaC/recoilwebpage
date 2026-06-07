import React, { useState } from 'react'
import './GamePage.css'
import { useParams, useNavigate } from 'react-router-dom'
import { games, users } from '../../assets/assets.js'

const GamePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const game = games.find(g => g.id === Number(id))

  const initialReviews = users.flatMap(u => (
    u.recent_reviews
      .filter(r => r.game_id === Number(id))
      .map(r => ({ ...r, username: u.username }))
  ))

  const [reviews, setReviews] = useState(initialReviews)
  const [rating, setRating] = useState(4)
  const [reviewText, setReviewText] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showAllReviews, setShowAllReviews] = useState(false)

  const criticScore = (game?.rating || 0)

  const handleRatingClick = (value) => {
    setRating(value)
    setErrorMessage('')
  }

  const handleReviewSubmit = () => {
    if (!reviewText.trim()) {
      setErrorMessage('Por favor escribe tu opinión antes de subirla.')
      return
    }

    const newReview = {
      username: 'Tú',
      rating,
      comment: reviewText.trim(),
      game_id: Number(id)
    }

    setReviews([newReview, ...reviews])
    setReviewText('')
    setRating(4)
    setErrorMessage('')
  }

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3)

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
              <button className='btn-add_fav'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
              </svg> AGREGAR A FAV</button>
              <button className='btn-wrt__opinion'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16"> <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" /> <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" /> </svg> ESCRIBE UNA RESEÑA</button>
            </div>
          </div>
        </div>
      </header>
      <section className="community-section">
        <div className="community-left">
          <div className="critic-box">
            <div className='critic-d'>
              <h1 className="critic-score">{criticScore}</h1>
              <div className="critic-meta">
                <div className="stars">★★★★★</div>
                <div className="meta-sub"><p>Based on {reviews.length || 142} reviews</p></div>
              </div>
            </div>
          </div>
          <div className='description-side'>
            <h3 className="veredict-title">DESCRIPCION</h3>
            <p className="veredict-text">{game.description}</p>
          </div>
        </div>

        <div className="community-right">
          <h2 className="community-title">LO QUE PIENSA LA COMUNIDAD</h2>

          <div className="reviews-row">
            {displayedReviews.length > 0 ? displayedReviews.map((r, idx) => (
              <div key={idx} className="review-card">
                <div className="review-header">
                  <p className="review-user">{r.username}</p>
                  <p className="review-score">{r.rating}/5</p>
                </div>
                <p className="review-text">{r.comment}</p>
              </div>
            )) : (
              <div className="review-card">
                <p className="review-text">Aún no hay reseñas. Sé el primero en dejar una opinión.</p>
              </div>
            )}
          </div>
          {reviews.length > 3 && (
            <button
              type="button"
              className="show-all-btn"
              onClick={() => setShowAllReviews(prev => !prev)}
            >
              {showAllReviews ? 'Ocultar comentarios' : 'Ver todos los comentarios'}
            </button>
          )}

          <div className="submit-review">
            <h3>TRANSMIT YOUR REVIEW</h3>
            <div className="rating-buttons">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  type="button"
                  className={`rating-btn ${n === rating ? 'active' : ''}`}
                  onClick={() => handleRatingClick(n)}
                >
                  {String(n).padStart(2, '0')}
                </button>
              ))}
            </div>
            <textarea
              className="review-input"
              placeholder="TYPE YOUR EXPERIENCE HERE..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            {errorMessage && <p className="review-error">{errorMessage}</p>}
            <button type="button" className="upload-btn" onClick={handleReviewSubmit}>UPLOAD REVIEW</button>
          </div>
        </div>
      </section>
    </section>
  )
}

export default GamePage
