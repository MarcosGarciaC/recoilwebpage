import React, { useEffect, useRef, useState } from 'react'

import './Profile.css'
import { games } from '../../assets/assets.js'

/* ─── Mock data ─────────────────────────────────────────── */
const BADGES = [
  {
    id: 1, label: 'Crítico Elite', color: '#FFD700', bg: '#2a2200',
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.46 0z"/></svg>
  },
  {
    id: 2, label: 'Análisis Profundo', color: '#9CFF93', bg: '#0a1f0a',
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#9CFF93" className="bi bi-award-fill" viewBox="0 0 16 16">
    <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864z"/>
    <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z"/>
    </svg>
  },
  {
    id: 3, label: 'Horror Fan', color: '#FF6B6B', bg: '#250f0f',
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"/><path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/></svg>
  },
  {
    id: 4, label: 'Jugón Versátil', color: '#00E3FD', bg: '#001a1f',
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16"><path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 15a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5m2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.514L8.5 9.56zm-4 8.372A6 6 0 0 0 14 8 6 6 0 0 0 4.5 13.872"/></svg>
  },
  {
    id: 5, label: 'Descubridor Indie', color: '#AC89FF', bg: '#1a1230',
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/></svg>
  },
  {
    id: 6, label: 'Reseñador Top', color: '#FFD700', bg: '#2a2200',
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16"><path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z"/><path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z"/><path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/></svg>
  },
  {
    id: 7, label: 'Constructivo', color: '#9CFF93', bg: '#0a1f0a',
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16"><path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/></svg>
  },
  {
    id: 8, label: 'Veterano', color: '#FF9F43', bg: '#251500',
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16"><path d="M5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/></svg>
  },
  {
    id: 9, label: 'Detallista', color: '#00E3FD', bg: '#001a1f',
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.099zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>
  },
  {
    id: 10, label: 'Perfeccionista', color: '#AC89FF', bg: '#1a1230',
    svg: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16"><path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"/></svg>
  },
]

const GENRES = [
  { name: 'RPG',        svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#AC89FF" className="bi bi-headset" viewBox="0 0 16 16"> <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5"/></svg>, pct: 78, count: 39, color: '#AC89FF' },
  { name: 'Acción',     svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FF6B6B" className="bi bi-crosshair" viewBox="0 0 16 16"> <path d="M8.5.5a.5.5 0 0 0-1 0v.518A7 7 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7 7 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7 7 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7 7 0 0 0 8.5 1.018zm-6.48 7A6 6 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6 6 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6 6 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6 6 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/></svg>, pct: 65, count: 22, color: '#FF6B6B' },
  { name: 'Aventura',   svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#00E3FD" className="bi bi-book-half" viewBox="0 0 16 16"> <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/></svg>, pct: 60, count: 28, color: '#00E3FD' },
  { name: 'Horror',     svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9CFF93" className="bi bi-emoji-astonished" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/> <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5M4.884 4.022a2 2 0 0 1 1.458-.048.5.5 0 0 0 .316-.948 3 3 0 0 0-2.167.077 3.1 3.1 0 0 0-.773.478q-.036.03-.07.064l-.002.001a.5.5 0 0 0 .707.708l-.001.002.001-.002a2 2 0 0 1 .122-.1 2 2 0 0 1 .41-.232Zm6.232 0a2 2 0 0 0-1.458-.048.5.5 0 1 1-.316-.948 3 3 0 0 1 2.168.077 3 3 0 0 1 .773.478l.07.064v.001a.5.5 0 0 1-.706.708l.002.002-.002-.002a2 2 0 0 0-.122-.1 2 2 0 0 0-.41-.232ZM8 10c-.998 0-1.747.623-2.247 1.246-.383.478.08 1.06.687.98q1.56-.202 3.12 0c.606.08 1.07-.502.687-.98C9.747 10.623 8.998 10 8 10"/></svg>, pct: 48, count: 24, color: '#9CFF93' },
  { name: 'Estrategia', svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" className="bi bi-feather" viewBox="0 0 16 16"> <path d="M15.807.531c-.174-.177-.41-.289-.64-.363a3.8 3.8 0 0 0-.833-.15c-.62-.049-1.394 0-2.252.175C10.365.545 8.264 1.415 6.315 3.1S3.147 6.824 2.557 8.523c-.294.847-.44 1.634-.429 2.268.005.316.05.62.154.88q.025.061.056.122A68 68 0 0 0 .08 15.198a.53.53 0 0 0 .157.72.504.504 0 0 0 .705-.16 68 68 0 0 1 2.158-3.26c.285.141.616.195.958.182.513-.02 1.098-.188 1.723-.49 1.25-.605 2.744-1.787 4.303-3.642l1.518-1.55a.53.53 0 0 0 0-.739l-.729-.744 1.311.209a.5.5 0 0 0 .443-.15l.663-.684c.663-.68 1.292-1.325 1.763-1.892.314-.378.585-.752.754-1.107.163-.345.278-.773.112-1.188a.5.5 0 0 0-.112-.172M3.733 11.62C5.385 9.374 7.24 7.215 9.309 5.394l1.21 1.234-1.171 1.196-.027.03c-1.5 1.789-2.891 2.867-3.977 3.393-.544.263-.99.378-1.324.39a1.3 1.3 0 0 1-.287-.018Zm6.769-7.22c1.31-1.028 2.7-1.914 4.172-2.6a7 7 0 0 1-.4.523c-.442.533-1.028 1.134-1.681 1.804l-.51.524zm3.346-3.357C9.594 3.147 6.045 6.8 3.149 10.678c.007-.464.121-1.086.37-1.806.533-1.535 1.65-3.415 3.455-4.976 1.807-1.561 3.746-2.36 5.31-2.68a8 8 0 0 1 1.564-.173"/></svg>, pct: 35, count: 17, color: '#FFD700' },
  { name: 'Indie',      svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FF9F43" className="bi bi-dice-6" viewBox="0 0 16 16"> <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3z"/> <path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-8 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/></svg>, pct: 33, count: 16, color: '#FF9F43' },
]

/* ─── GenreBar ───────────────────────────────────────────── */
function GenreBar({ name, svg, pct, count, color, delay }) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimated(true) },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="genre-row" ref={ref} style={{ '--delay': `${delay}ms` }}>
      <span className="genre-icon">{svg}</span>
      <span className="genre-name">{name}</span>
      <div className="genre-bar-track">
        <div
          className="genre-bar-fill"
          style={{ background: color, width: animated ? `${pct}%` : '0%' }}
        />
      </div>
      <span className="genre-pct" style={{ color }}>{pct}%</span>
      <span className="genre-count">({count})</span>
    </div>
  )
}

/* ─── Main ───────────────────────────────────────────────── */
const Profile = () => {
  const [isEditing, setIsEditing]       = useState(false)
  const [bio, setBio]                   = useState('"Jugamos todo, criticamos lo justo."')
  const [tempBio, setTempBio]           = useState(bio)
  const [name, setName]                 = useState('Osmin Reviews')
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName]         = useState(name)
  const [avatarHover, setAvatarHover]   = useState(false)
  const [coverHover, setCoverHover]     = useState(false)
  const [avatarPhoto, setAvatarPhoto]   = useState(null)
  const carouselRef = useRef(null)
  const fileInputRef = useRef(null)

  /* reveal on scroll */
  useEffect(() => {
    const reveals = document.querySelectorAll('.p-reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('p-active') }),
      { threshold: 0.12 }
    )
    reveals.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  /* carousel helpers — same logic as Home */
  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.game-card').offsetWidth
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.game-card').offsetWidth
      carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })
    }
  }

  /* auto-scroll — same as Home */
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const cardWidth = carouselRef.current.querySelector('.game-card').offsetWidth + 30
        const maxScrollLeft = carouselRef.current.scrollWidth - carouselRef.current.clientWidth
        if (carouselRef.current.scrollLeft >= maxScrollLeft) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })
        }
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const saveEdit = () => { setBio(tempBio); setIsEditing(false) }
  const saveName = () => { setName(tempName); setIsEditingName(false) }
  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }
  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setAvatarPhoto(URL.createObjectURL(file))
    }
  }

  /* Sync with session user stored in localStorage */
  useEffect(() => {
    try {
      const raw = localStorage.getItem('currentUser')
      if (raw) {
        const u = JSON.parse(raw)
        // If avatar was stored as a blob: URL from a previous session it won't be valid
        // after reload. Remove it and avoid assigning invalid blob URLs to img src.
        let avatarVal = u.avatar || null
        if (typeof avatarVal === 'string' && avatarVal.startsWith('blob:')) {
          delete u.avatar
          try { localStorage.setItem('currentUser', JSON.stringify(u)) } catch (e) {}
          avatarVal = null
        }
        setName(u.name || name)
        setTempName(u.name || tempName)
        setBio(u.bio || bio)
        setTempBio(u.bio || tempBio)
        setAvatarPhoto(avatarVal)
      }
    } catch (e) {}
  }, [])

  const persistUser = (patch) => {
    try {
      const raw = localStorage.getItem('currentUser')
      const cur = raw ? JSON.parse(raw) : {}
      const updated = { ...cur, ...patch }
      try {
        localStorage.setItem('currentUser', JSON.stringify(updated))
        window.dispatchEvent(new Event('userUpdated'))
      } catch (err) {
        console.error('Failed to persist user to localStorage:', err)
        alert('No se pudo guardar la imagen en localStorage (demasiado grande). Intenta subir una imagen más pequeña.')
      }
    } catch (e) {}
  }

  // Resize and compress image file to a Data URL (max dimension `maxDim` px)
  const fileToDataUrlResized = (file, maxDim = 256, mime = 'image/jpeg', quality = 0.8) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onerror = () => reject(new Error('File read error'))
      reader.onload = () => {
        const img = new Image()
        img.onload = () => {
          const { width, height } = img
          let w = width, h = height
          if (w > h) {
            if (w > maxDim) { h = Math.round(h * (maxDim / w)); w = maxDim }
          } else {
            if (h > maxDim) { w = Math.round(w * (maxDim / h)); h = maxDim }
          }
          const canvas = document.createElement('canvas')
          canvas.width = w
          canvas.height = h
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, w, h)
          try {
            const dataUrl = canvas.toDataURL(mime, quality)
            resolve(dataUrl)
          } catch (err) {
            reject(err)
          }
        }
        img.onerror = () => reject(new Error('Image load error'))
        img.src = reader.result
      }
      reader.readAsDataURL(file)
    })
  }

  const saveEditPersist = () => { setBio(tempBio); setIsEditing(false); persistUser({ bio: tempBio }) }
  const saveNamePersist = () => { setName(tempName); setIsEditingName(false); persistUser({ name: tempName }) }
  const handleAvatarChangePersist = async (event) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const dataUrl = await fileToDataUrlResized(file, 256, 'image/jpeg', 0.8)
        setAvatarPhoto(dataUrl)
        persistUser({ avatar: dataUrl })
      } catch (err) {
        console.error('Error processing avatar image:', err)
        alert('No se pudo procesar la imagen. Prueba con otra imagen o un tamaño menor.')
      }
    }
  }

  return (
    <section id="profile-page">

      {/* ── COVER ── */}
      <div
        className={`profile-cover ${coverHover ? 'cover-hovered' : ''}`}
        onMouseEnter={() => setCoverHover(true)}
        onMouseLeave={() => setCoverHover(false)}
      >
        <div className="cover-gradient" />
        <div className="cover-grid" />
        <div className="cover-noise" />
        {[...Array(6)].map((_, i) => (
          <span key={i} className="cover-particle" style={{ '--i': i }} />
        ))}
        <button className={`cover-edit-btn ${coverHover ? 'visible' : ''}`} title="Editar portada">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
          Editar portada
        </button>
      </div>

      {/* ── PROFILE HEADER ── */}
      <div className="profile-header p-reveal p-reveal-up">
        {/* Avatar */}
        <div
          className="avatar-wrapper"
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAvatarChangePersist}
          />
          <div className={`avatar-ring ${avatarHover ? 'ring-glow' : ''}`}>
            <div className="avatar-inner">
              {avatarPhoto ? (
                <img src={avatarPhoto} alt="Avatar" className="avatar-photo" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" fill="rgba(255,255,255,0.15)" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.029 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
              )}
            </div>
            <div
              className={`avatar-overlay ${avatarHover ? 'av-show' : ''}`}
              onClick={handleAvatarClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#9CFF93" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
            </div>
          </div>
          <span className="online-dot" title="En línea" />
        </div>

        {/* Identity */}
        <div className="profile-identity">
          <div className="name-row">
            {isEditingName ? (
              <div className="name-edit-row">
                <input
                  className="name-input"
                  value={tempName}
                  onChange={e => setTempName(e.target.value)}
                  maxLength={30}
                />
                <button className="name-save-btn" onClick={saveNamePersist}>Guardar</button>
                <button className="name-cancel-btn" onClick={() => setIsEditingName(false)}>Cancelar</button>
              </div>
            ) : (
              <>
                <h1 className="profile-name">{name}</h1>
                <span className="verified-badge" title="Verificado">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#9CFF93" viewBox="0 0 16 16">
                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
                  </svg>
                </span>
                <button
                  className="icon-edit-btn"
                  onClick={() => { setIsEditingName(true); setTempName(name) }}
                  title="Editar nombre"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9CFF93" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                  </svg>
                </button>
              </>
            )}
          </div>

          {isEditing ? (
            <div className="bio-edit-row">
              <input
                className="bio-input"
                value={tempBio}
                onChange={e => setTempBio(e.target.value)}
                maxLength={80}
              />
              <button className="bio-save-btn" onClick={saveEditPersist}>Guardar</button>
              <button className="bio-cancel-btn" onClick={() => setIsEditing(false)}>Cancelar</button>
            </div>
          ) : (
            <div className="bio-row">
              <p className="profile-bio">{bio}</p>
              <button
                className="icon-edit-btn"
                onClick={() => { setIsEditing(true); setTempBio(bio) }}
                title="Editar lema"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9CFF93" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
              </button>
            </div>
          )}

          <div className="profile-stats">
            <div className="stat-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9CFF93" className="bi bi-activity" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2"/>
            </svg> 
              <span className="stat-number">124</span> 
              <span className="stat-label">Reseñas totales</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9CFF93" viewBox="0 0 16 16">
                <path d="M13 2a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v1H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1z"/>
                <path d="M5.5 4a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5zm.5 7V5h6v6z"/>
              </svg>
              <span className="stat-number">12</span>
              <span className="stat-label">Juegos reseñados este mes</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN GRID: badges + genres ── */}
      <div className="profile-grid">

        {/* LEFT — BADGES */}
        <div className="profile-left">
          <div className="profile-card p-reveal p-reveal-left">
            <div className="card-header">
              <span className="card-label">Insignias</span>
              <button className="see-all-btn">Ver todas</button>
            </div>
            <div className="badges-grid">
              {BADGES.map(b => (
                <div
                  key={b.id}
                  className="badge-item"
                  style={{ '--badge-color': b.color, '--badge-bg': b.bg }}
                  title={b.label}
                >
                  <div className="badge-box">
                    <span className="badge-svg" style={{ color: b.color }}>{b.svg}</span>
                  </div>
                  <span className="badge-label">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — GENRES */}
        <div className="profile-right">
          <div className="profile-card p-reveal p-reveal-right">
            <div className="card-header">
              <span className="card-label">Géneros Favoritos</span>
              <button className="see-all-btn">Ver detalles</button>
            </div>
            <div className="genres-list">
              {GENRES.map((g, i) => (
                <GenreBar key={g.name} {...g} delay={i * 80} />
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ── ELITE RATINGS CAROUSEL (exact Home replica) ── */}
      <section id="elite-rating" className="p-reveal p-reveal-left">
        <div className="head-heading">
          <h1>Juegos Favoritos</h1>
          <div className="head-options">
            <button onClick={scrollLeft}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
                <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
              </svg>
            </button>
            <button onClick={scrollRight}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
              </svg>
            </button>
          </div>
        </div>

        <div className="game-cards__carousel" ref={carouselRef}>
          {games.slice(0, 7).map((game, index) => (
            <div className="game-card" key={index}>
              <div>
                <div className="rating-overlay">
                  <p className="user-score__number">{game.rating}</p>
                  <p className="user-score">USER SCORE</p>
                </div>
                <img src={game.image} alt={game.title} />
              </div>
              <div className="game-card__description">
                <h3>{game.title}</h3>
                <div className="description-details">
                  <p>{game.genre}</p>
                  <span className="separator-dot" />
                  <p>{game.release_year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </section>
  )
}

export default Profile
