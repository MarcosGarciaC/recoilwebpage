import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Genders.css'

//categories images
import acction from '../../assets/categories/action.webp'
import rpg from '../../assets/categories/adventure.webp'
import estrategia from '../../assets/categories/header (3).jpg'
import indie from '../../assets/categories/header (2).jpg'
import deportes from '../../assets/categories/1254546.webp'
import horror from '../../assets/categories/image.png'
import sim from '../../assets/categories/sim.png'
import rv from '../../assets/categories/header (4).jpg'

const categories = [
  { title: 'ACCION', image: acction, genre: 'Acción' },
  { title: 'RPG', image: rpg, genre: 'RPG' },
  { title: 'ESTRATEGIA', image: estrategia, genre: 'Estrategia' },
  { title: 'INDIE', image: indie, genre: 'Indie' },
  { title: 'DEPORTES', image: deportes, genre: 'Deportes' },
  { title: 'HORROR', image: horror, genre: 'Horror' },
  { title: 'SIMULACION', image: sim, genre: 'Simulación' },
  { title: 'REALIDAD VIRTUAL', image: rv, genre: 'Realidad Virtual' }
]

const Genders = () => {
  const navigate = useNavigate()

  const goToFilteredCatalog = genre => {
    navigate(`/gamecatalogfiltered?genre=${encodeURIComponent(genre)}`)
  }

  return (
    <div className='genders'>
      <div className='title-box'>
        <p>ARCHIVE_SYSTEM_V4.0</p>
        <div className='title-row'>
          <h1>EXPLORA LOS <span className='green-color__text'>GENEROS</span></h1>
          <div className='title-row__sumrecords'>
            <p>TOTAL_RECORDS</p>
            <h2>12,842</h2> {/*Change it with a dinamic value calculated from assets.js*/}
          </div>
        </div>
      </div>
      <div className="categories-division">
        <div className="categories-bento">
          {categories.slice(0, 3).map((category, idx) => (
            <div
              key={category.title}
              className='box box--clickable'
              style={{ gridArea: `box-${idx + 1}`, background: 'white' }}
              onClick={() => goToFilteredCatalog(category.genre)}
            >
              <img src={category.image} alt={category.title} />
              <div className="categorie-info flex">
                <p className='p-number width'>01 / popularity</p>
                <h4 className='h4-gener width'>{category.title}</h4>
              </div>
            </div>
          ))}
        </div>
        <div className="categories-bento__middle">
          {categories.slice(3, 6).map((category, idx) => (
            <div
              key={category.title}
              className='box box--clickable'
              style={{ gridArea: `box-${idx + 4}`, background: 'white' }}
              onClick={() => goToFilteredCatalog(category.genre)}
            >
              <img src={category.image} alt={category.title} />
              <div className="categorie-info flex">
                <p className='p-number width'>02 / Popularity</p>
                <h4 className='h4-gener width'>{category.title}</h4>
              </div>
            </div>
          ))}
        </div>
        <div className="categories-bento__bottom">
          {categories.slice(6).map((category, idx) => (
            <div
              key={category.title}
              className='box box--clickable'
              style={{ gridArea: `box-${idx + 7}`, background: 'white' }}
              onClick={() => goToFilteredCatalog(category.genre)}
            >
              <img src={category.image} alt={category.title} />
              <div className="categorie-info flex">
                <p className='p-number width'>03 / Popularity</p>
                <h4 className='h4-gener width'>{category.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Genders
