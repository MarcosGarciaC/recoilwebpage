import React, { useState } from 'react'
import './News.css'
import { news } from '../../assets/assets.js'

const News = () => {
  const [activeCategory, setActiveCategory] = useState('ALL_RECORDS')
  const categories = ['ALL_RECORDS', 'UPDATES', 'Patch_notes', 'Community', 'Dev_Blog']

  const highlightedNews = news.filter(item => item.highlight === 1)
  const cards = news.filter(item => {
    if (item.highlight !== 0) return false
    if (activeCategory === 'ALL_RECORDS') return true
    return item.category === activeCategory
  })


  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 8

  const filteredCards = news.filter(item => {
    if (item.highlight !== 0) return false
    if (activeCategory === 'ALL_RECORDS') return true
    return item.category === activeCategory
  })

  const totalPages = Math.ceil(filteredCards.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentCards = filteredCards.slice(startIndex, startIndex + itemsPerPage)


  return (
    <div className='news'>
      <header className='news-hero-section'>
        {highlightedNews.map((item, index) => {
          return (
            <div className='news-hero-games' key={index}>
<div 
  className="news-hero-img"
  style={{ backgroundImage: `url(${item.background_image})` }}
></div>              <div className='news-overlay'>
                <div className="news-text-overlay">
                  <h2 className='news-hero-heading'>{item.news_title}</h2>
                  <div className='published-day'>
                    <p className='datep'><span>FEATURED</span> PUBLISHED: {item.published_date}</p>
                  </div>
                  <p className='news-hero-text'>{item.description}</p>
                  <div className="news-btn-overlay">
                    <button
                      className='news-btn-review'
                      onClick={() => navigate(item.article_link)}
                    >
                      Leer artículo
                    </button>

                    <button
                      className='news-btn-gameplay'
                      onClick={() => window.open(item.trailer_link, "_blank")}
                    >
                      Watch Trailer
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )
        })}
      </header>
      <div className='news-filter'>
        <ul className='news-filter__options'>
          {categories.map(category => (
            <li
              key={category}
              className={category === activeCategory ? 'active' : ''}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className='news-card__box'>
        {currentCards.map((item, index) => (
          <div className='news-card' key={`${item.news_title}-${index}`}>
            <img src={item.background_image} alt={item.news_title} />
            <h3>{item.news_title}</h3>
            <p>{item.description}</p>
            <span className="date"><p className="date">PUBLISHED: {item.published_date}</p></span>
          </div>
        ))}

      </div>

      <div className="pagination">

        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-arrow"
        >
          ‹
        </button>

        <div className="pagination-numbers">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`pagination-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page.toString().padStart(2, '0')}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pagination-arrow"
        >
          ›
        </button>

      </div>

      <section class="subscribe-section">
        <div class="subscribe-container">

          <span class="subscribe-tag">STAY_PROTOCOL_ACTIVE</span>

          <h2 class="subscribe-title">
            RECEIVE DIRECT TRANSMISSIONS
          </h2>

          <p class="subscribe-description">
            Get the latest patch notes, event details, and exclusive rewards delivered directly to your neural interface.
          </p>

          <form class="subscribe-form">
            <input
              type="email"
              placeholder="INPUT EMAIL ADDRESS"
              class="subscribe-input"
            />

            <button class="subscribe-button">
              SUBSCRIBE
            </button>
          </form>

        </div>
      </section>


    </div>
  )
}

export default News
