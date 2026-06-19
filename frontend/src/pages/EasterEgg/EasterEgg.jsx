import {React, useEffect} from 'react'
import './EasterEgg.css'

import founderPhoto from '../../assets/Users/User05.jpg'
import SoundTrack from '../../assets/Videos and audios/Saint_Chocha_Sound.mp3'

const EasterEgg = () => {
  
  const audio = new Audio(SoundTrack)

  useEffect(() => {
    const iniciarAudio = () => {
      audio.volume = 0.6
      audio.loop = true;
        audio.play()
            .then(() => {
                // El audio inició con éxito, removemos el escuchador
                window.removeEventListener('click', iniciarAudio);
            })
            .catch((error) => console.log("Bloqueado aún:", error));
    };

    // Escucha el primer clic del usuario en la pantalla
    window.addEventListener('click', iniciarAudio);

    // Limpia el evento si el componente se desmonta
    return () => {
        window.removeEventListener('click', iniciarAudio);
    };
}, [audio]);

  
  return (
    <section id="recoil-shrine">

      <div className="shrine-bg-grid"></div>

      <div className="shrine-particles">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              '--x': `${Math.random() * 100}%`,
              '--delay': `${Math.random() * 6}s`,
              '--duration': `${4 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="shrine-container">

        <div className="shrine-candle">
          <div className="flame"></div>
        </div>

        <div className="shrine-center">

          <span className="archive-label">
            Santo 001 de Recoil
          </span>

          <div className="altar">
            <div className="altar-pillars">
              <div className="pillar left"></div>
              <div className="altar-center">
                <div className="altar-roof"></div>
                <div className="shrine-frame">
                  <div className="frame-glow"></div>
                  <img
                    src={founderPhoto}
                    alt="Founder"
                    className="shrine-photo"
                  />
                </div>

                <div className="altar-platform">
                  <div className="altar-step"></div>
                  <div className="altar-step"></div>
                  <div className="altar-step"></div>
                </div>

              </div>
              <div className="pillar right"></div>

            </div>
            <div className="altar-candle altar-candle-left">
              <div className="flame"></div>
            </div>

            <div className="altar-candle altar-candle-right">
              <div className="flame"></div>
            </div>

          </div>

          <h2 className="shrine-title">
            Santo niño de chocha
          </h2>

          <p className="shrine-description">
            Antes de las reseñas, antes de las puntuaciones,
            antes del algoritmo...
            existió un único santo que creo todo desde los cimientos.
          </p>

          <div className="shrine-stats">

            <div className="stat">
              <span className="value">9999+</span>
              <span className="label">Reseñas</span>
            </div>

            <div className="stat">
              <span className="value">∞</span>
              <span className="label">Sabiduria</span>
            </div>

            <div className="stat">
              <span className="value">100%</span>
              <span className="label">Espiritu</span>
            </div>

          </div>

          <blockquote className="shrine-quote">
            "Dejenme consulto con un experto, conmigo mismo...."
          </blockquote>

        </div>

        <div className="shrine-candle">
          <div className="flame"></div>
        </div>

      </div>

    </section>
  )
}

export default EasterEgg