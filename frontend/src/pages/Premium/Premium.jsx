import React, { useEffect, useRef, useState,useCallback } from 'react'
import './Premium.css'

// Video y audio
import heroVideo from '../../assets/Videos and audios/GameplaySilksong.mp4'
import clickSound from '../../assets/Videos and audios/btnSound02.mp3'
import hoverSound from '../../assets/Videos and audios/btnSound04.mp3'

//Fotos
import user1 from '../../assets/users/User01.jpg'
import user2 from '../../assets/users/User02.jpg'
import user3 from '../../assets/users/User03.jpg'
import user4 from '../../assets/users/User04.jpg'
import user5 from '../../assets/users/User05.jpg'

    // ── Feature Card ──────────────────────────────────────────────────────────────
    const FeatureCard = ({ number, color, title, description, icon, wide }) => (
    <div className={`feature-card ${wide ? 'feature-card--wide' : ''} reveal reveal-up`}>
        <div className="feature-card__icon" style={{ color }}>
        {icon}
        </div>
        <div className="feature-card__body">
        <p className="feature-card__number" style={{ color }}>{number} / Feature</p>
        <h4 className="feature-card__title">{title}</h4>
        <p className="feature-card__desc">{description}</p>
        </div>
    </div>
    )

    // ── Pricing Perk ─────────────────────────────────────────────────────────────
    const Perk = ({ text }) => (
    <li className="perk">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#9CFF93" viewBox="0 0 16 16">
        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
        </svg>
        <span>{text}</span>
    </li>
    )

    // ── Main Premium Page ─────────────────────────────────────────────────────────
    const Premium = () => {
    const parallaxRef = useRef(null)
    const [btnHovered, setBtnHovered] = useState(false)
    const [btnClicked, setBtnClicked] = useState(false)
    const [activeUsers, setActiveUsers] = useState('0')
    const [satisfaction, setSatisfaction] = useState('0%')
    const statsRef = useRef(null)

    const videoRef = useRef(null)
    const audioRef = useRef(null)
    const [volume, setVolume] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [showVolumeBar, setShowVolumeBar] = useState(false)
    const volumeBarRef = useRef(null)
    const [isMuted, setIsMuted] = useState(true)

    // Calcula el ícono de volumen según el nivel
    const VolumeIcon = useCallback(() => {
    if (isMuted || volume === 0) return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
        <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 1.504a.5.5 0 0 1 0 .707L12.207 7l1.647 1.646a.5.5 0 0 1-.708.708L11.5 7.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 7 9.146 5.354a.5.5 0 0 1 .708-.708L11.5 6.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
        </svg>
    )
    if (volume < 0.35) return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
        <path d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12zM6.312 6.39 8 5.04v5.92L6.312 9.61A.5.5 0 0 0 6 9.5H4v-3h2a.5.5 0 0 0 .312-.11z"/>
        </svg>
    )
    if (volume < 0.7) return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
        <path d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12zm2.025 4a2.5 2.5 0 0 0 0-4 .5.5 0 1 1 0 1 1.5 1.5 0 0 1 0 3 .5.5 0 1 1 0 1 2.5 2.5 0 0 0 0-1z"/>
        </svg>
    )
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
        <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
        <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
        <path d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06"/>
        </svg>
    )
    }, [volume, isMuted])

    // Calcula volumen desde posición del drag en la barra vertical
    const calcVolumeFromY = useCallback((clientY) => {
        const bar = volumeBarRef.current
        if (!bar) return
        const rect = bar.getBoundingClientRect()
        const relY = rect.bottom - clientY
        const raw = relY / rect.height
        const clamped = Math.min(1, Math.max(0, raw))
        setVolume(clamped)
        if (videoRef.current) {
            videoRef.current.volume = clamped
            videoRef.current.muted = clamped === 0
            if (clamped > 0) setIsMuted(false)
            else setIsMuted(true)
        }
    }, [])

    const handleMouseDownVolume = useCallback((e) => {
        e.preventDefault()
        setIsDragging(true)
        calcVolumeFromY(e.clientY)
    }, [calcVolumeFromY])

    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return
        calcVolumeFromY(e.clientY)
    }, [isDragging, calcVolumeFromY])

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
    }, [])

    // Touch support
    const handleTouchMoveVolume = useCallback((e) => {
        if (!isDragging) return
        calcVolumeFromY(e.touches[0].clientY)
    }, [isDragging, calcVolumeFromY])

    


    // Parallax scroll effect
    useEffect(() => {
        const onScroll = () => {
        if (parallaxRef.current) {
            const scrollY = window.scrollY
            parallaxRef.current.style.transform = `translateY(${scrollY * 0.45}px)`
        }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Intersection Observer for reveal animations
    useEffect(() => {
        const reveals = document.querySelectorAll('.reveal')
        const observer = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active') }),
        { threshold: 0.12 }
        )
        reveals.forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    // Counter animation
    useEffect(() => {

    let started = false

    const animateCounter = () => {

        let users = 0
        let satisfactionValue = 0

        const usersTarget = 12000
        const satisfactionTarget = 98

        const duration = 2200
        const increment = 30

        const usersStep = usersTarget / (duration / increment)
        const satisfactionStep = satisfactionTarget / (duration / increment)

        const counter = setInterval(() => {

        users += usersStep
        satisfactionValue += satisfactionStep

        if (users >= usersTarget) {
            users = usersTarget
        }

        if (satisfactionValue >= satisfactionTarget) {
            satisfactionValue = satisfactionTarget
        }

        if (users >= 1000) {
            setActiveUsers(`${Math.floor(users / 1000)}K+`)
        } else {
            setActiveUsers(Math.floor(users).toString())
        }

        setSatisfaction(`${Math.floor(satisfactionValue)}%`)

        if (
            users === usersTarget &&
            satisfactionValue === satisfactionTarget
        ) {
            clearInterval(counter)
        }

        }, increment)
    }

    const observer = new IntersectionObserver(
        entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting && !started) {
            started = true
            animateCounter()
            }

        })

        },
        { threshold: 0.4 }
    )

    if (statsRef.current) {
        observer.observe(statsRef.current)
    }

    return () => observer.disconnect()

    }, [])

    useEffect(() => {
    if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('touchmove', handleTouchMoveVolume)
        window.addEventListener('touchend', handleMouseUp)
  }
  return () => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    window.removeEventListener('touchmove', handleTouchMoveVolume)
    window.removeEventListener('touchend', handleMouseUp)
  }
}, [isDragging, handleMouseMove, handleMouseUp, handleTouchMoveVolume])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        video.muted = true
        video.volume = 0
        video.play().catch(() => {})
}   , [])

    const handleBtnClick = () => {
        setBtnClicked(true)
        if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
    }
        setTimeout(() => setBtnClicked(false), 1800)
    }

    const playHover = useCallback(() => {
        const audio = new Audio(hoverSound)
        audio.volume = 0.4
        audio.play().catch(() => {})
    }, [])

    

    const features = [
        {
        number: '01',
        color: '#9CFF93',
        title: 'Subir Nuevos Títulos de Juegos',
        description: 'Añade joyas indie no catalogadas o éxitos de taquilla AAA a nuestra base de datos central. Da forma al futuro de la crítica de videojuegos.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
            </svg>
        )
        },
        {
        number: '02',
        color: '#00E3FD',
        title: 'Insignia de Crítico Verificado',
        description: 'Gánate el respeto con la insignia operativa de neón. Tus reseñas tienen prioridad y se destacan en el feed global de RECOIL.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
            </svg>
        )
        },
        {
        number: '03',
        color: '#AC89FF',
        title: 'Protocolos de Acceso Temprano',
        description: 'Sé el primero en interactuar con nuevas herramientas de revisión, módulos de visualización de datos y funciones de comunidad antes de su lanzamiento global.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
            </svg>
        ),
        wide: true
        }
    ]

    const perks = [
        'Envíos a la base de datos de juegos infinitos',
        'Credencial de Identidad Verificada Permanente',
        'Acceso prioritario a las funciones de HUD',
        'Cero interrupciones publicitarias',
        'Soporte operativo 24/7',
        'Descuentos en merch RECOIL'
    ]

    return (
        <>

        {/* ── HERO PARALLAX ── */}
        <section className="premium-hero">

        <audio ref={audioRef} src={clickSound} preload="auto" />

        <div className="premium-hero__bg-wrap">
            <video
            ref={videoRef}
            className="premium-hero__video"
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            />
            <div className="premium-hero__noise" />
            <div className="premium-hero__vignette" />
        </div>


        <div
            className="volume-controller"
            onMouseEnter={() => setShowVolumeBar(true)}
            onMouseLeave={() => { if (!isDragging) setShowVolumeBar(false) }}
        >
            <div className={`volume-bar-wrap ${showVolumeBar || isDragging ? 'volume-bar-wrap--visible' : ''}`}>
            <div
                className="volume-bar-track"
                ref={volumeBarRef}
                onMouseDown={handleMouseDownVolume}
                onTouchStart={(e) => { setIsDragging(true); calcVolumeFromY(e.touches[0].clientY) }}
            >
                <div
                className="volume-bar-fill"
                style={{ height: `${volume * 100}%` }}
                />
                <div
                className="volume-bar-thumb"
                style={{ bottom: `calc(${volume * 100}% - 8px)` }}
                />
            </div>
            <span className="volume-percentage">{Math.round(volume * 100)}%</span>
            </div>

            {/* Botón ícono de volumen */}
            <button
                className="volume-btn"
                onClick={() => {
                if (isMuted) {
                    const restored = volume > 0 ? volume : 0.5
                    setIsMuted(false)
                    setVolume(restored)
                    if (videoRef.current) {
                    videoRef.current.muted = false
                    videoRef.current.volume = restored
                    }
                } else {
                    setIsMuted(true)
                    if (videoRef.current) {
                    videoRef.current.muted = true
                    }
                    setVolume(0)
                }
                }}
                aria-label="Controlar volumen"
                >
                <VolumeIcon />
            </button>
        </div>

        <div className="premium-hero__content reveal reveal-up">
            <p className="premium-hero__eyebrow">System Upgrade Required</p>
            <h1 className="premium-hero__heading">
            VUELVETE UN OPERADOR <span className="neon-text">RECOIL.</span>
            </h1>
            <p className="premium-hero__sub">
            Desbloquea todo el potencial cinético de la plataforma RECOIL.<br />
            Influye en el catálogo, verifica tu estatus y obtén ventajas tácticas.
            </p>
            <div className="premium-hero__scroll-hint">
            <span>SCROLL</span>
            <div className="scroll-line" />
            </div>
        </div>
        </section>

        {/* ── OPERATIVE GRID ── */}
        <section className="operative-layout">

        {/* LEFT SIDE */}
        <div className="operative-left reveal reveal-left">

            <div className="pf-heading">
            <p className="pf-eyebrow">Pulse Check</p>
            <h2 className="pf-title">VENTAJAS OPERATIVAS</h2>
            <p className="pf-sub">
                Todo lo que obtienes al activar tu protocolo de operador.
            </p>
            </div>

        <div className="features-bento">

            <div className="grid-subir">
                <FeatureCard {...features[0]} />
            </div>

            <div className="grid-insignia">
                <FeatureCard {...features[1]} />
            </div>

            <div className="grid-protocolos">
                <FeatureCard {...features[2]} />
            </div>

            <div className="grid-pricing">

                <div className="pricing-card">
                <div className="pricing-card__inner">

                    <div className="pricing-card__top">
                    <div>
                        <h3>PLAN OPERATIVO</h3>
                        <p className="pricing-card__uplink">
                        UNLIMITED UPLINK
                        </p>
                    </div>

                    <div className="pricing-card__price">
                        <span className="price-amount">$9.99</span>
                        <span className="price-period">PER MONTH</span>
                    </div>
                    </div>

                    <ul className="perks-list">
                    {perks.map((p, i) => (
                        <Perk key={i} text={p} />
                    ))}
                    </ul>

                    <button
                        className={`cta-btn ${btnHovered ? 'cta-btn--hovered' : ''} ${btnClicked ? 'cta-btn--clicked' : ''}`}
                        onMouseEnter={() => { setBtnHovered(true); playHover() }}
                        onMouseLeave={() => setBtnHovered(false)}
                        onClick={handleBtnClick}
                    >
                    <span className="cta-btn__glow" />
                    <span className="cta-btn__scanline" />

                    <span className="cta-btn__text">
                        {btnClicked
                        ? '// INICIANDO PROTOCOLO...'
                        : 'AUTORIZAR ACTUALIZACIÓN'}
                    </span>
                    </button>

                    <p className="cta-sub">
                    INSTANT ACTIVATION UPON AUTHORIZATION
                    </p>

                </div>

                <span className="card-corner card-corner--tl" />
                <span className="card-corner card-corner--tr" />
                <span className="card-corner card-corner--bl" />
                <span className="card-corner card-corner--br" />
                </div>

            </div>
        </div>
        </div>
        </section>

        {/* ── MID SECTION ── */}
        <section className="mid-operative reveal reveal-up" ref={statsRef}>

    <p className="pricing-eyebrow">
        LIVE DATA FEED / 2024
    </p>

    <h2 className="mid-operative__title">
        PLAN OPERATIVO
    </h2>

    <p className="pricing-label">
        UNLIMITED UPLINK
    </p>

    <div className="mid-operative-grid">

        {/* LEFT SIDE */}
        <div className="featured-review">

            <div className="featured-review__user">

                <img className="featured-review__avatar" src={user5} alt="usuario" />

                <div>
                    <h3>@Saint_Chochit</h3>
                    <span>OPERADOR VERIFICADO</span>
                </div>

            </div>

            <p className="featured-review__text">
                RECOIL me dio más que una plataforma para reseñar.
                Me dio voz, herramientas y una comunidad que realmente
                entiende la crítica. Desde que tengo acceso completo,
                mis análisis llegan más lejos, influyen más y la conexión
                con otros operadores es brutal. La mejor inversión que
                he hecho en mucho tiempo.
            </p>

            <p className="featured-review__footer">
                MIEMBRO DESDE 2023
            </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="stats-column">

            <div className="stat-box">

                <div className="stat-box__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                    </svg>
                </div>

                <div>
                    <p className="stat-box__label">
                        OPERADORES ACTIVOS
                    </p>

                    <h3 className="stat-box__number">
                        {activeUsers}
                    </h3>

                    <span className="stat-box__sub">
                        EN TODO EL SISTEMA RECOIL
                    </span>
                </div>
            </div>
            <div className="stat-box">
                <div className="stat-box__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-bar-chart-line" viewBox="0 0 16 16">
  <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z"/>
</svg>
                </div>
                <div>
                    <p className="stat-box__label">
                        SATISFACCIÓN
                    </p>

                    <h3 className="stat-box__number">
                        {satisfaction}
                    </h3>

                    <span className="stat-box__sub">
                        DE OPERADORES APROBADOS
                    </span>
                </div>
            </div>
        </div>
    </div>
</section>

        {/* ── TESTIMONIALS / SOCIAL PROOF ── */}
        <section className="premium-testimonials reveal reveal-up">
            <p className="pf-eyebrow">OPERADORES ACTIVOS / INTEL</p>
            <h2 className="pf-title">LO QUE DICEN LOS OPS</h2>
            <div className="testimonials-grid">
            {[
                {
                handle: '@Manolo_the_critic',
                text: 'La insignia verificada cambió cómo la comunidad recibe mis reseñas. Autoridad real.',
                score: '9.8',
                avatar: user2
            },

            {
                handle: '@Lure',
                text: 'El acceso temprano a features es increíble. Ya probé tres módulos antes del lanzamiento.',
                score: '9.5',
                avatar: user3
            },

            {
                handle: '@AntonioGamer',
                text: 'Sin ads, sin ruido. Solo el contenido que importa. RECOIL Premium vale cada centavo.',
                score: '10.0',
                avatar: user4
            }
            ].map((t, i) => (
                <div className="testimonial-card reveal reveal-up" key={i} style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="testimonial-score">{t.score}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <span className="testimonial-handle">{t.handle}</span>
                <img src={t.avatar} alt="user" className="testimonial-avatar" />
                </div>
            ))}
            </div>
        </section>

        {/* ── DISCORD CTA ── */}
        <section className="premium-discord reveal reveal-right">
            <div className="discord-box">
            <div className="discord-icons">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#9CFF93" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#9CFF93" viewBox="0 0 16 16" style={{ position:'absolute', top:15, left:15 }}>
                <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                </svg>
            </div>
            <h1 className="discord-heading">JOIN THE KINETIC CRITIQUE</h1>
            <p className="discord-sub">Be part of a high-octane community of analysts, developers, and pro-players. Real-time discussions, early review access, and direct links to the RECOIL staff.</p>
            <button className="discord-btn"
                onMouseEnter={() => { setBtnHovered(true); playHover() }}
                onMouseLeave={() => setBtnHovered(false)}
                onClick={handleBtnClick}
            >
                JOIN THE DISCORD
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
        </section>

        </>
    )
}

export default Premium