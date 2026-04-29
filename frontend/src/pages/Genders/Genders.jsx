import React from 'react'
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


const Genders = () => {
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
          <div className="box" style={{ gridArea: "box-1", background: "white" }}>
            <img src={acction} alt="" />
            <div className="categorie-info flex">
              <p className='p-number width'>01 / Genre</p>
              <h4 className='h4-gener width'>ACCION</h4>
            </div>
          </div>
          <div className="box" style={{ gridArea: "box-2", background: "white" }}>
            <img src={rpg} />
            <div className="categorie-info flex">
              <p className='p-number width'>01 / Genre</p>
              <h4 className='h4-gener width'>RPG</h4>
            </div>
          </div>
          <div className="box" style={{ gridArea: "box-3", background: "white" }}>
            <img src={estrategia} />
            <div className="categorie-info flex">
              <p className='p-number width'>01 / Genre</p>
              <h4 className='h4-gener width'>ESTRATEGIA</h4>
            </div>
          </div>
        </div>
        <div className="categories-bento__middle">
          <div className="box" style={{ gridArea: "box-4", background: "white" }}>
            <img src={indie} alt="" />
            <div className="categorie-info flex">
              <p className='p-number width'>01 / Genre</p>
              <h4 className='h4-gener width'>INDIE</h4>
            </div>
          </div>
          <div className="box" style={{ gridArea: "box-5", background: "white" }}>
            <img src={deportes} alt="" />
            <div className="categorie-info flex">
              <p className='p-number width'>01 / Genre</p>
              <h4 className='h4-gener width'>DEPORTES</h4>
            </div>
          </div>
          <div className="box" style={{ gridArea: "box-6", background: "white" }}>
            <img src={horror} alt="" />
            <div className="categorie-info flex">
              <p className='p-number width'>01 / Genre</p>
              <h4 className='h4-gener width'>HORROR</h4>
            </div>
          </div>
        </div>
        <div className="categories-bento__bottom">
          <div className="box" style={{ gridArea: "box-7", background: "white" }}>
            <img src={sim} alt="" />
            <div className="categorie-info flex">
              <p className='p-number width'>01 / Genre</p>
              <h4 className='h4-gener width'>SIMULACION</h4>
            </div>
          </div>
          <div className="box" style={{ gridArea: "box-8", background: "white" }}>
            <img src={rv} alt="" />
            <div className="categorie-info flex">
              <p className='p-number width'>01 / Genre</p>
              <h4 className='h4-gener width'>REALIDAD VIRTUAL</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Genders
