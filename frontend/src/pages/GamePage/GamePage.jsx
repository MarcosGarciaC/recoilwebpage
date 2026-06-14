import React, { useEffect, useState } from 'react'
import './GamePage.css'
import { useParams, useNavigate } from 'react-router-dom'
import { games, users } from '../../assets/assets.js'

const GamePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const game = games.find(g => g.id === Number(id))

  const initialReviews = users.flatMap(u =>
    u.recent_reviews
      .filter(r => r.game_id === Number(id))
      .map(r => ({ ...r, username: u.username }))
  )

  const [reviews, setReviews] = useState(initialReviews)
  const [rating, setRating] = useState(1)
  const [reviewText, setReviewText] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState('')
  const [editRating, setEditRating] = useState(4)
  const [currentUser, setCurrentUser] = useState('Tú')
  const [avatarPhoto, setAvatarPhoto] = useState(null)
  const [showReviewForm, setShowReviewForm] = useState(false)

  useEffect(() => {
    const loadUser = () => {
      try {
        const raw = localStorage.getItem('currentUser')
        if (raw) {
          const u = JSON.parse(raw)
          let avatarVal = u.avatar || null
          if (typeof avatarVal === 'string' && avatarVal.startsWith('blob:')) {
            delete u.avatar
            try { localStorage.setItem('currentUser', JSON.stringify(u)) } catch (e) {}
            avatarVal = null
          }
          if (u.name) setCurrentUser(u.name)
          if (avatarVal) setAvatarPhoto(avatarVal)
        }
      } catch (e) {}
    }

    loadUser()
    window.addEventListener('userUpdated', loadUser)
    return () => window.removeEventListener('userUpdated', loadUser)
  }, [])

  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / reviews.length
    : 0

  const ownReview = reviews.find(r => r.username === currentUser)

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
      username: currentUser,
      rating,
      comment: reviewText.trim(),
      game_id: Number(id)
    }
    setReviews(prev => [newReview, ...prev.filter(r => r.username !== currentUser)])
    setReviewText('')
    setRating(1)
    setErrorMessage('')
  }

  const handleEditSave = () => {
    if (!editText.trim()) return
    setReviews(prev =>
      prev.map(r => r.username === currentUser ? { ...r, comment: editText, rating: editRating } : r)
    )
    setIsEditing(false)
  }

  const handleDelete = () => {
    setReviews(prev => prev.filter(r => r.username !== currentUser))
    setIsEditing(false)
  }

  const startEditing = () => {
    setEditText(ownReview.comment)
    setEditRating(ownReview.rating)
    setIsEditing(true)
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

      {/* ── HEADER ── */}
      <header className="game-header" style={{ backgroundImage: `url(${game.image})` }}>
        <div className="game-header-overlay">
          <div className="game-header__desc">
            <div className="header-desc__left">
              <h1 className='game-title'>{game.title}</h1>
              <div className="game-key__description">
                <p>DEV: <span className='green-color'>{game.developer}</span></p>
                <p>
                  PLATFORM: <span className='white-color'>
                    {Array.isArray(game.platforms) ? game.platforms.join(' / ') : game.platforms}
                  </span>
                </p>
                <p>GENRE: <span className='white-color'>{game.genre}</span></p>
              </div>
            </div>

            <div className="header-desc__right">
              <button className='btn-add_fav' onClick={() => setIsFavorite(prev => !prev)}>
                {isFavorite ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.281 8.717 2.01z"/>
                  </svg>
                )}
                {isFavorite ? 'EN FAVORITOS' : 'AGREGAR A FAV'}
              </button>
              <div className="review-buttons-row">
                <button className='btn-wrt__opinion'
                  onClick={() => setShowReviewForm(true)}
                >
                 ESCRIBE TU RESEÑA
                </button>
                
                <button className='btn-report'
                  title='Reportar contenido inapropiado'
                  onClick={() => console.log('Reportar contenido')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14.778 3.318A.5.5 0 0 1 15 3.75v6a.5.5 0 0 1-.724.447L11 8.618l-3.276 1.579A.5.5 0 0 1 7 9.75v-6a.5.5 0 0 1 .724-.447L11 4.882l3.276-1.579a.5.5 0 0 1 .502.015z"/>
                    <path d="M4 1a1 1 0 0 0-1 1v13.5a.5.5 0 0 0 1 0V10h2a.5.5 0 0 0 0-1H4V2h2a.5.5 0 0 0 0-1z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      
      {/* ── COMMUNITY SECTION ── */}
      <section className="community-section">

        {/* ── LEFT ── */}
        <div className="community-left">

          {/* Score */}
          <div className="critic-box">
            <p className="critic-label">CRITIC SCORE</p>
            <div className='critic-d'>
              <h1 className="critic-score">{averageRating ? averageRating.toFixed(1) : '—'}</h1>
              <div className="critic-meta">
                <div className="stars">
                  {[1,2,3,4,5].map(n => (
                    <span key={n} className={n <= Math.round(averageRating) ? 'star filled' : 'star'}>★</span>
                  ))}
                </div>
                <div className="meta-sub"><p>Based on {reviews.length} reviews</p></div>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className='description-side'>
            <h3 className="veredict-title">DESCRIPCIÓN</h3>
            <p className="veredict-text">{game.description}</p>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="community-right">
          <div className="community-title-row">
            <h2 className="community-title">LO QUE PIENSA LA COMUNIDAD</h2>
            <span className="user-score-badge">
              {averageRating ? averageRating.toFixed(1) : '—'} <span>USER SCORE</span>
            </span>
          </div>

          {/* Reseña propia */}
            {ownReview && (
            <div className="own-review-box">
              <p className="own-review-label">TU OPINIÓN SOBRE ESTE JUEGO</p>
              <div className="own-review-card">

                <div className="own-review-top">
                  <div className="own-avatar">
                    {avatarPhoto
                      ? <img src={avatarPhoto} alt={currentUser} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                      : currentUser.charAt(0).toUpperCase()
                    }
                  </div>
                  <div className="own-review-meta">
                    <span className="review-user own">{currentUser}</span>
                    <span className="own-review-score">{ownReview.rating}/5</span>
                  </div>
                  <div className="own-review-actions">
                    <button className="btn-edit-review" onClick={startEditing} title="Editar">
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                      </svg>
                      EDITAR
                    </button>
                    <button className="btn-delete-review" onClick={handleDelete} title="Eliminar">
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                      </svg>
                      ELIMINAR
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <div className="own-review-edit">
                    <div className="rating-buttons edit-rating-buttons">
                      {[1,2,3,4,5].map(n => (
                        <button
                          key={n}
                          type="button"
                          className={`rating-btn ${n === editRating ? 'active' : ''}`}
                          onClick={() => setEditRating(n)}
                        >
                          <span className="rating-num">{String(n).padStart(2,'0')}</span>
                          <span className="rating-star">{n <= editRating ? '★' : '☆'}</span>
                        </button>
                      ))}
                    </div>
                    <textarea
                      className="review-input edit-input"
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                    />
                    <div className="edit-actions">
                      <button className="btn-save-review" onClick={handleEditSave}>GUARDAR</button>
                      <button className="btn-cancel-edit" onClick={() => setIsEditing(false)}>CANCELAR</button>
                    </div>
                  </div>
                ) : (
                  <p className="review-text own-review-text">{ownReview.comment}</p>
                )}

              </div>
            </div>
          )}

          {/* Reviews grid */}
          <div className="reviews-row">
            {displayedReviews.filter(r => r.username !== currentUser).length > 0
              ? displayedReviews.filter(r => r.username !== currentUser).map((r, idx) => (
                <div key={idx} className="review-card">
                  <div className="review-header">
                    <p className="review-user">{r.username}</p>
                    <p className="review-score">{r.rating}/5</p>
                  </div>
                  <p className="review-text">{r.comment}</p>
                </div>
              ))
              : (
                <div className="review-card">
                  <p className="review-text">Aún no hay reseñas. Sé el primero.</p>
                </div>
              )
            }
          </div>

          {reviews.filter(r => r.username !== currentUser).length > 3 && (
            <button
              type="button"
              className="show-all-btn"
              onClick={() => setShowAllReviews(prev => !prev)}
            >
              {showAllReviews ? 'Ocultar comentarios' : 'Ver todos los comentarios'}
            </button>
          )}

          {/* Submit review */}
          {showReviewForm && !ownReview && (
          <div className="submit-review">
            <h3>TRANSMIT YOUR REVIEW</h3>
            <p className="submit-sub">SUBMIT TO THE ARCHIVE</p>

            <p className="rating-label">SYNC RATING</p>
            <div className="rating-buttons">
              {[1,2,3,4,5].map(n => (
                <button
                  key={n}
                  type="button"
                  className={`rating-btn ${n === rating ? 'active' : ''}`}
                  onClick={() => handleRatingClick(n)}
                >
                  <span className="rating-num">{String(n).padStart(2,'0')}</span>
                  <span className="rating-star">{n <= rating ? '★' : '☆'}</span>
                </button>
              ))}
            </div>

            <p className="rating-label">INPUT FEEDBACK</p>
            <textarea
              className="review-input"
              placeholder="TYPE YOUR EXPERIENCE HERE..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            {errorMessage && <p className="review-error">{errorMessage}</p>}
            <button type="button" className="upload-btn" onClick={handleReviewSubmit}>UPLOAD REVIEW</button>
          </div>
          )}
        </div>
      </section>
    </section>
  )
}
export default GamePage