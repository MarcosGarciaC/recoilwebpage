import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Settings.css'
import FondoSettings from '../../assets/FondoSettings.jpg'

const Settings = () => {
  const navigate = useNavigate()
  const bgRef = useRef(null)
  const [offsetY, setOffsetY] = useState(0)
  const [currentUser, setCurrentUser] = useState(null)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showChangeEmail, setShowChangeEmail] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [emailError, setEmailError] = useState('')
  const [emailSuccess, setEmailSuccess] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('currentUser')
      if (raw) setCurrentUser(JSON.parse(raw))
    } catch (e) {}
  }, [])

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const reveals = document.querySelectorAll('.s-reveal')

    const activateReveal = (element) => {
      element.classList.add('s-active')
    }

    if (reveals.length === 0) return

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activateReveal(entry.target)
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.08 }
      )

      reveals.forEach((el) => observer.observe(el))
      return () => observer.disconnect()
    }

    reveals.forEach(activateReveal)
  }, [])

  const handlePasswordSubmit = () => {
    setPasswordError('')
    setPasswordSuccess('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Completa todos los campos')
      return
    }

    if (!currentUser?.password) {
      setPasswordError('No se encontró contraseña del usuario')
      return
    }

    if (currentPassword !== currentUser.password) {
      setPasswordError('Contraseña actual incorrecta')
      return
    }

    if (newPassword.length < 8) {
      setPasswordError('La nueva contraseña debe tener al menos 8 caracteres')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('La contraseña de confirmación no coincide')
      return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []
    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? { ...user, password: newPassword } : user
    )
    localStorage.setItem('users', JSON.stringify(updatedUsers))

    const updatedUser = { ...currentUser, password: newPassword }
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    setCurrentUser(updatedUser)
    setPasswordSuccess('Contraseña actualizada correctamente')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const updateStoredUser = (patch) => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? { ...user, ...patch } : user
    )
    localStorage.setItem('users', JSON.stringify(updatedUsers))

    const updatedUser = { ...currentUser, ...patch }
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    setCurrentUser(updatedUser)
    try { window.dispatchEvent(new Event('userUpdated')) } catch (e) {}
    return updatedUser
  }

  const handleEmailSubmit = () => {
    setEmailError('')
    setEmailSuccess('')

    if (!newEmail.trim()) {
      setEmailError('Introduce un correo válido')
      return
    }

    if (newEmail === currentUser.email) {
      setEmailError('El correo es igual al actual')
      return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []
    const emailTaken = users.some(
      (user) => user.email === newEmail && user.email !== currentUser.email
    )
    if (emailTaken) {
      setEmailError('Este correo ya está en uso')
      return
    }

    updateStoredUser({ email: newEmail })
    setEmailSuccess('Correo actualizado correctamente')
    setNewEmail('')
    setShowChangeEmail(false)
  }

  const passwordType = showPasswords ? 'text' : 'password'
  const userEmail = currentUser?.email || 'Sin sesión activa'

  return (
    <section id="settings-page">

      {/* ── PARALLAX BACKGROUND ── */}
      <div
        className="settings-bg"
        ref={bgRef}
        style={{ backgroundPosition: `center ${offsetY * 0.22}px` }}
      >
        <img
          src={FondoSettings}
          alt="Settings background"
          style={{ transform: `translate3d(0, ${offsetY * 0.18}px, 0)` }}
        />
      </div>

      {/* ── CONTENT ── */}
      <div className="settings-content">

        {/* HEADER */}
        <div className="settings-header s-reveal s-reveal-up">
          <p className="settings-eyebrow">PANEL DE CONTROL / OPERADOR</p>
          <h1>CONFIGURACIÓN</h1>
          <p className="settings-sub">Administra tu cuenta y preferencias en RECOIL.</p>
        </div>

        {/* ══════ BENTO GRID ══════ */}
        <div className="settings-bento">

          {/* ── SEGURIDAD ── */}
          <div className="s-card s-card--security s-reveal s-reveal-left">
            <span className="s-card-corner s-card-corner--tl" />
            <span className="s-card-corner s-card-corner--tr" />
            <span className="s-card-corner s-card-corner--bl" />
            <span className="s-card-corner s-card-corner--br" />

            <div className="s-card__header">
              <div className="s-card__icon">
                <i className="bi bi-shield-lock-fill"></i>
              </div>
              <div>
                <p className="s-card__eyebrow">01 / Seguridad</p>
                <h3 className="s-card__title">SEGURIDAD</h3>
                <p className="s-card__desc">Mantén tu cuenta protegida.</p>
              </div>
            </div>

            <div className="s-card__items">
              <div className="s-card__row s-card__row--with-action">
                <span className="s-row__label">
                  <i className="bi bi-key-fill"></i>
                  Contraseña
                </span>
                <button
                  className="s-btn-change"
                  type="button"
                  onClick={() => {
                    setShowChangePassword((prev) => !prev)
                    setPasswordError('')
                    setPasswordSuccess('')
                  }}
                >
                  <span className="s-btn-change__glow" />
                  {showChangePassword ? 'Cerrar' : 'Cambiar'}
                </button>
              </div>
              <div className="s-card__row s-card__row--with-action">
                <span className="s-row__label">
                  <i className="bi bi-phone-fill"></i>
                  Autenticación en 2 pasos
                </span>
                <div className="s-row-action-with-status">
                  <label className="s-toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="s-toggle__slider"></span>
                  </label>
                  <span className="s-status-text">ON</span>
                </div>
              </div>
            </div>

            {showChangePassword && (
              <div className="password-form">
                <div className="password-form__header">
                  <h4>Cambiar contraseña</h4>
                  <p>Usa tu contraseña actual y elige una nueva con seguridad.</p>
                </div>

                <div className="password-form__fields">
                  <div className="password-field">
                    <label>Contraseña actual</label>
                    <div className="password-input-group">
                      <input
                        type={passwordType}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Introduce tu contraseña actual"
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowPasswords((prev) => !prev)}
                        aria-label="Mostrar contraseña"
                      >
                        <i className={`bi ${showPasswords ? 'bi-eye-slash' : 'bi-eye'}`} />
                      </button>
                    </div>
                  </div>

                  <div className="password-field">
                    <label>Nueva contraseña</label>
                    <div className="password-input-group">
                      <input
                        type={passwordType}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Nueva contraseña"
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowPasswords((prev) => !prev)}
                        aria-label="Mostrar contraseña"
                      >
                        <i className={`bi ${showPasswords ? 'bi-eye-slash' : 'bi-eye'}`} />
                      </button>
                    </div>
                  </div>

                  <div className="password-field">
                    <label>Confirmar contraseña</label>
                    <div className="password-input-group">
                      <input
                        type={passwordType}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repite la nueva contraseña"
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowPasswords((prev) => !prev)}
                        aria-label="Mostrar contraseña"
                      >
                        <i className={`bi ${showPasswords ? 'bi-eye-slash' : 'bi-eye'}`} />
                      </button>
                    </div>
                  </div>

                  {passwordError && <p className="form-feedback form-feedback--error">{passwordError}</p>}
                  {passwordSuccess && <p className="form-feedback form-feedback--success">{passwordSuccess}</p>}

                  <button
                    type="button"
                    className="s-action-btn password-submit-btn"
                    onClick={handlePasswordSubmit}
                  >
                    <i className="bi bi-check-circle" />
                    Guardar contraseña
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── CORREOS ── */}
          <div className="s-card s-card--email s-reveal s-reveal-right">
            <span className="s-card-corner s-card-corner--tl" />
            <span className="s-card-corner s-card-corner--tr" />
            <span className="s-card-corner s-card-corner--bl" />
            <span className="s-card-corner s-card-corner--br" />

            <div className="s-card__header">
              <div className="s-card__icon s-card__icon--cyan">
                <i className="bi bi-envelope-fill"></i>
              </div>
              <div>
                <p className="s-card__eyebrow">02 / Correo</p>
                <h3 className="s-card__title">CORREO</h3>
                <p className="s-card__desc">Dirección vinculada a tu cuenta.</p>
              </div>
            </div>

            <div className="s-card__items">
              <div className="s-card__row s-card__row--col">
                <span className="s-row__label">
                  <i className="bi bi-at"></i>
                  Correo actual
                </span>
                <span className="s-email-display">
                  {userEmail}
                  {currentUser?.email && (
                    <i className="bi bi-patch-check-fill s-verified"></i>
                  )}
                </span>
              </div>
              <div className="s-card__row s-card__row--with-action">
                <span className="s-row__label s-row__label--muted">
                  Cambiar correo
                </span>
                <button className="s-btn-change" type="button"
                    onClick={() => {
                        setShowChangeEmail(prev => !prev)
                        setEmailError('')
                        setEmailSuccess('')
                    }}
                    >
                    <span className="s-btn-change__glow" />
                    {showChangeEmail ? 'Cerrar' : 'Cambiar'}
                </button>
              </div>

                {showChangeEmail && (
                <div className="password-form">

                    <div className="password-form__header">
                    <h4>Cambiar correo</h4>
                    <p>
                        Introduce una nueva dirección de correo.
                    </p>
                    </div>

                    <div className="password-form__fields">

                    <div className="password-field">
                        <label>Nuevo correo</label>

                        <div className="password-input-group">
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="nuevo@email.com"
                        />
                        </div>
                    </div>

                    {emailError && (
                        <p className="form-feedback form-feedback--error">
                        {emailError}
                        </p>
                    )}

                    {emailSuccess && (
                        <p className="form-feedback form-feedback--success">
                        {emailSuccess}
                        </p>
                    )}

                    <button
                        type="button"
                        className="s-action-btn password-submit-btn"
                        onClick={handleEmailSubmit}
                    >
                        Guardar correo
                    </button>

                    </div>

                </div>
                )}

            </div>
          </div>

          {/* ── IDIOMA Y REGIÓN ── */}
          <div className="s-card s-card--lang s-reveal s-reveal-left">
            <span className="s-card-corner s-card-corner--tl" />
            <span className="s-card-corner s-card-corner--tr" />
            <span className="s-card-corner s-card-corner--bl" />
            <span className="s-card-corner s-card-corner--br" />

            <div className="s-card__header">
              <div className="s-card__icon s-card__icon--purple">
                <i className="bi bi-globe2"></i>
              </div>
              <div>
                <p className="s-card__eyebrow">03 / Localización</p>
                <h3 className="s-card__title">IDIOMA Y REGIÓN</h3>
                <p className="s-card__desc">Personaliza tu idioma y región.</p>
              </div>
            </div>

            <div className="s-card__items">
              <div className="s-card__row">
                <span className="s-row__label">
                  <i className="bi bi-translate"></i>
                  Idioma
                </span>
                <select defaultValue="es" className="s-select">
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="pt">Português</option>
                </select>
              </div>
              <div className="s-card__row">
                <span className="s-row__label">
                  <i className="bi bi-geo-alt-fill"></i>
                  Región
                </span>
                <select defaultValue="mx" className="s-select">
                  <option value="mx">México</option>
                  <option value="ar">Argentina</option>
                  <option value="es">España</option>
                  <option value="ni">Nicaragua</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── PRIVACIDAD ── */}
          <div className="s-card s-card--privacy s-reveal s-reveal-right">
            <span className="s-card-corner s-card-corner--tl" />
            <span className="s-card-corner s-card-corner--tr" />
            <span className="s-card-corner s-card-corner--bl" />
            <span className="s-card-corner s-card-corner--br" />

            <div className="s-card__header">
              <div className="s-card__icon s-card__icon--cyan">
                <i className="bi bi-incognito"></i>
              </div>
              <div>
                <p className="s-card__eyebrow">04 / Privacidad</p>
                <h3 className="s-card__title">PRIVACIDAD</h3>
                <p className="s-card__desc">Controla tu visibilidad en la plataforma.</p>
              </div>
            </div>

            <div className="s-card__items">
              {[
                { label: 'Perfil Público',          icon: 'bi-person-fill' },
                { label: 'Mostrar Actividad',        icon: 'bi-activity' },
                { label: 'Mostrar Reseñas',          icon: 'bi-chat-square-text-fill' },
                { label: 'Mostrar Juegos Favoritos', icon: 'bi-controller' },
              ].map(({ label, icon }) => (
                <div className="s-card__row" key={label}>
                  <span className="s-row__label">
                    <i className={`bi ${icon}`}></i>
                    {label}
                  </span>
                  <label className="s-toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="s-toggle__slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* ── ACCIONES DE CUENTA ── */}
          <div className="s-card s-card--actions s-reveal s-reveal-left">
            <span className="s-card-corner s-card-corner--tl" />
            <span className="s-card-corner s-card-corner--tr" />
            <span className="s-card-corner s-card-corner--bl" />
            <span className="s-card-corner s-card-corner--br" />

            <div className="s-card__header">
              <div className="s-card__icon">
                <i className="bi bi-sliders2"></i>
              </div>
              <div>
                <p className="s-card__eyebrow">05 / Cuenta</p>
                <h3 className="s-card__title">ACCIONES</h3>
                <p className="s-card__desc">Gestiona o elimina tu cuenta.</p>
              </div>
            </div>

            <div className="s-card__items s-card__items--actions">
              <button className="s-action-btn">
                <i className="bi bi-person-gear"></i>
                Cambiar Cuenta
              </button>
              <button className="s-action-btn s-action-btn--danger">
                <i className="bi bi-trash3-fill"></i>
                Eliminar Cuenta
              </button>
            </div>
          </div>

          {/* ── PREMIUM BANNER ── */}
          <div className="s-card s-card--premium s-reveal s-reveal-right">
            <span className="s-card-corner s-card-corner--tl" />
            <span className="s-card-corner s-card-corner--tr" />
            <span className="s-card-corner s-card-corner--bl" />
            <span className="s-card-corner s-card-corner--br" />
            <div className="premium-glow" />

            <div className="premium-top">
              <div className="premium-icon-wrap">
                <i className="bi bi-stars"></i>
              </div>
              <div>
                <p className="s-card__eyebrow" style={{ color: 'var(--green)' }}>
                  PROTOCOLO ÉLITE / ACTÍVALO AHORA
                </p>
                <h2 className="premium-title">RECOIL<br />PREMIUM</h2>
              </div>
            </div>

            <p className="premium-desc">
              Lleva tu experiencia al siguiente nivel y apoya a la comunidad.
            </p>

            <ul className="premium-features-list">
              <li className="premium-feature-item">
                <i className="bi bi-palette-fill"></i>
                Temas exclusivos
              </li>
              <li className="premium-feature-item">
                <i className="bi bi-patch-check-fill"></i>
                Insignias especiales
              </li>
              <li className="premium-feature-item">
                <i className="bi bi-graph-up-arrow"></i>
                Estadísticas avanzadas
              </li>
              <li className="premium-feature-item">
                <i className="bi bi-person-badge-fill"></i>
                Perfil avanzado
              </li>
            </ul>

            <button className="premium-cta-btn" onClick={() => navigate('/premium')} >
              <span className="premium-cta-btn__glow" />
              <span className="premium-cta-btn__scanline" />
              <span className="premium-cta-btn__text">
                <i className="bi bi-star-fill"></i>
                VER PLANES
              </span>
            </button>
          </div>

        </div>
        {/* ══════ /BENTO GRID ══════ */}

      </div>
    </section>
  )
}

export default Settings