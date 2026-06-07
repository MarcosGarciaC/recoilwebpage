import { useEffect, useRef } from 'react';
import './ArticleNews.css';

const patchData = [
  {
    agent: 'NEXUS',
    type: 'nerf',
    label: 'Nerf',
    desc: 'Velocidad de recarga de su habilidad Escudo Táctico reducida de 12s a 18s. Daño de barrera pasiva reducido un 15%.',
  },
  {
    agent: 'QUASAR',
    type: 'buff',
    label: 'Buff',
    desc: 'Radio de explosión de Pulso Gravitacional aumentado en 20%. Cooldown reducido de 25s a 19s.',
  },
  {
    agent: 'VORTEX',
    type: 'fix',
    label: 'Ajuste',
    desc: 'Corregida la hitbox al usar Teletransporte Cinético en superficies irregulares. Eliminado el microstutter al aterrizar.',
  },
  {
    agent: 'PHANTOM',
    type: 'nerf',
    label: 'Nerf',
    desc: 'Duración de invisibilidad reducida de 4.5s a 3.2s. Se añade un sonido de activación audible en radio de 8m.',
  },
  {
    agent: 'STRIKER',
    type: 'buff',
    label: 'Buff',
    desc: 'Daño base de Carga Explosiva aumentado de 85 a 110. Nuevo efecto visual de advertencia para oponentes.',
  },
];

const relatedNews = [
  { color: '#0d2a2a', tag: 'Competitivo', title: 'Temporada S2 2026: fechas y recompensas confirmadas', date: '2 Jun 2026' },
  { color: '#1a1a0d', tag: 'Parche',      title: 'Hotfix 4.7.1: corrección de bugs críticos en Vortex',  date: '28 May 2026' },
  { color: '#1a0d1a', tag: 'Evento',      title: 'Recoil Invitational: equipos clasificados y formato',  date: '20 May 2026' },
];

function drawHero(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(156,255,147,0.05)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  const grd = ctx.createRadialGradient(W * 0.6, H * 0.4, 0, W * 0.6, H * 0.4, 200);
  grd.addColorStop(0, 'rgba(156,255,147,0.12)');
  grd.addColorStop(1, 'rgba(156,255,147,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);

  const grd2 = ctx.createRadialGradient(W * 0.2, H * 0.7, 0, W * 0.2, H * 0.7, 150);
  grd2.addColorStop(0, 'rgba(0,227,253,0.08)');
  grd2.addColorStop(1, 'rgba(0,227,253,0)');
  ctx.fillStyle = grd2;
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.translate(W / 2, H / 2);
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
    const r = 120;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(156,255,147,0.6)';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'rgba(156,255,147,0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(angle) * 120;
    const y = Math.sin(angle) * 120;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = 'rgba(156,255,147,0.2)';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = 'rgba(156,255,147,0.7)';
  ctx.font = '700 11px "Space Grotesk", sans-serif';
  ctx.fillText('PARCHE 4.7.2 — RECOIL ANTICHEAT UPDATE', 32, H - 32);
}

function drawThumb(canvas, color) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color || '#111';
  ctx.fillRect(0, 0, 52, 52);
  ctx.strokeStyle = 'rgba(156,255,147,0.15)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 52; i += 13) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 52); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(52, i); ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(26, 26, 12, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(156,255,147,0.3)';
  ctx.stroke();
  ctx.fillStyle = 'rgba(156,255,147,0.15)';
  ctx.fill();
}

export default function ArticleNews() {
  const heroRef = useRef(null);
  const thumbRefs = useRef([]);

  useEffect(() => {
    drawHero(heroRef.current);
    thumbRefs.current.forEach((el, i) => {
      if (el) drawThumb(el, relatedNews[i].color);
    });
  }, []);

  return (
    <>
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <a href="#">Inicio</a>
        <span className="bc-sep">/</span>
        <a href="#">Noticias</a>
        <span className="bc-sep">/</span>
        <span className="bc-current">Parche 4.7.2</span>
      </div>

      {/* MAIN LAYOUT */}
      <div className="page-wrapper">

        {/* ── ARTICLE ── */}
        <main>
          <div className="article-header">
            <div className="article-tags">
              <span className="tag tag-update">Actualización</span>
              <span className="tag tag-patch">Parche 4.7.2</span>
              <span className="tag tag-breaking">Cambios Mayores</span>
            </div>

            <h1 className="article-title">
              Recoil rompe el meta:<br />
              el parche 4.7.2 redefine<br />
              las clasificatorias
            </h1>

            <p className="article-subtitle">
              El equipo de Recoil lanza una de las actualizaciones más ambiciosas del año, alterando el balance de
              14 agentes, ajustando el sistema antitrampas Ric9chet y corrigiendo errores críticos de firmware.
            </p>

            <div className="article-meta">
              <div className="meta-author">
                <div className="author-avatar">JC</div>
                <span>Juan Caballero</span>
              </div>
              <div className="meta-sep" />
              <span>4 de Junio, 2026</span>
              <div className="meta-sep" />
              <span>8 min lectura</span>
              <div className="meta-score">
                <span className="score-dot" />
                8.9 USER SCORE
              </div>
            </div>
          </div>

          {/* HERO */}
          <div className="hero-image">
            <canvas ref={heroRef} width={720} height={420} />
            <div className="hero-overlay" />
            <div className="hero-badge">EXCLUSIVA</div>
          </div>

          {/* BODY */}
          <div className="article-body">
            <p>
              Después de semanas de rumores en los foros oficiales y filtraciones en redes sociales,{' '}
              <strong>Recoil ha lanzado oficialmente el parche 4.7.2</strong>, y la recepción de la comunidad ha
              sido polarizante. Mientras una parte de los jugadores celebra los ajustes largamente esperados al
              sistema de movimiento, otros elevan sus voces de protesta por los cambios al sistema Ric9chet.
            </p>

            <div className="callout">
              <div className="callout-label">⚠ Nota del desarrollador</div>
              "Este parche representa nuestro mayor esfuerzo por equilibrar el juego competitivo sin sacrificar la
              experiencia de los jugadores casuales. Sabemos que algunos cambios serán polémicos, pero los datos
              respaldan cada decisión."
              <br /><br />
              — Equipo Recoil, 04/06/2026
            </div>

            <h2>Ric9chet y el problema de BIOS</h2>
            <p>
              Uno de los puntos más calientes del parche tiene que ver con la actualización obligatoria del driver
              de Ric9chet. A partir del 4.7.2, el anticheat{' '}
              <strong>requiere acceso a ciertos registros del firmware BIOS</strong> para validar la integridad del
              hardware. Esto ha generado incompatibilidades en placas madre de gama media.
            </p>
            <p>
              Jugadores con placas ASUS ROG Strix B550-F, MSI MAG B660 y algunas variantes de Gigabyte Z790 han
              reportado errores de inicialización que impiden el acceso a partidas clasificatorias. El equipo
              reconoció el problema y promete un hotfix antes del 10 de junio.
            </p>

            <h2>Cambios de balance: lo más importante</h2>
            <p>El parche toca a 14 agentes del roster actual. Aquí los más relevantes para el meta competitivo actual:</p>

            <table className="patch-table">
              <thead>
                <tr>
                  <th>Agente</th>
                  <th>Cambio</th>
                </tr>
              </thead>
              <tbody>
                {patchData.map((row) => (
                  <tr key={row.agent}>
                    <td>{row.agent}</td>
                    <td>
                      <span className={`change-type change-${row.type}`}>{row.label}</span>
                      <br />
                      {row.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2>Mejoras al sistema de clasificatorias</h2>
            <p>
              Más allá del balance, el parche introduce{' '}
              <strong>cambios estructurales en el sistema de ranking</strong>. El MMR oculto ahora tiene mayor peso
              en los primeros 20 partidos de la temporada, y se han ajustado los umbrales de ascenso entre los
              rangos Diamante y Ascendente para reducir el llamado "elo hell".
            </p>
            <p>
              También se mejora el sistema de detección de abandono, diferenciando ahora entre desconexiones
              accidentales (permitiendo reconexión hasta 3 minutos) y abandono intencional, con penalizaciones
              escalonadas según el historial del jugador.
            </p>

            <div className="callout">
              <div className="callout-label">💡 Tip competitivo</div>
              Si usas NEXUS como agente principal, considera rotar hacia QUASAR mientras el meta se asienta. Los
              buffs a su Pulso Gravitacional lo convierten en un pick S-tier en mapas de control de zona.
            </div>

            <h2>Próximos pasos</h2>
            <p>
              El equipo de Recoil confirmó que la{' '}
              <strong>temporada competitiva 2026-S2</strong> comenzará el 15 de junio, con un nuevo mapa llamado
              "Fractura Cero" disponible solo en partidas no clasificatorias durante las primeras dos semanas. Se
              espera un segundo parche menor (4.7.3) antes del inicio oficial de la temporada para resolver los
              problemas de compatibilidad con Ric9chet.
            </p>

            <div className="article-actions">
              <button className="action-btn primary">↗ Ver notas completas</button>
              <button className="action-btn">♡ 2.4K</button>
              <button className="action-btn">⌗ Compartir</button>
              <button className="action-btn">⊡ Guardar</button>
            </div>
          </div>
        </main>

        {/* ── SIDEBAR ── */}
        <aside className="sidebar">

          {/* Community Score */}
          <div className="sidebar-card">
            <div className="sidebar-heading">
              <h3>LO QUE PIENSA LA COMUNIDAD</h3>
              <span className="live-badge">LIVE</span>
            </div>
            <div className="score-card">
              <div className="score-big">8.9</div>
              <div className="score-label">User Score · 12,440 votos</div>
              <div className="score-bar-wrap">
                <div className="score-bar-fill" style={{ width: '89%' }} />
              </div>
              <div className="score-breakdown">
                <div className="score-row">
                  <span>Balance</span>
                  <div className="score-row-bar"><div className="score-row-fill green" style={{ width: '72%' }} /></div>
                  <span className="score-row-val">7.2</span>
                </div>
                <div className="score-row">
                  <span>Anticheat</span>
                  <div className="score-row-bar"><div className="score-row-fill cyan" style={{ width: '55%' }} /></div>
                  <span className="score-row-val">5.5</span>
                </div>
                <div className="score-row">
                  <span>Rendimiento</span>
                  <div className="score-row-bar"><div className="score-row-fill green" style={{ width: '91%' }} /></div>
                  <span className="score-row-val">9.1</span>
                </div>
              </div>
            </div>

            <div className="review-item">
              <div className="review-header">
                <div className="reviewer">
                  <div className="reviewer-avatar">V</div>
                  <div>
                    <div className="reviewer-name">V_QUANTUM</div>
                    <div className="reviewer-rank">Platinum Reviewer</div>
                  </div>
                </div>
                <div className="review-score-badge">10/10</div>
              </div>
              <div className="review-text">
                Maldito ric9chet maldita update firware bios por ustedes no puedo jugar clasificatorias
              </div>
            </div>

            <div className="review-item">
              <div className="review-header">
                <div className="reviewer">
                  <div className="reviewer-avatar cyan-avatar">N</div>
                  <div>
                    <div className="reviewer-name">NOVA_STRIDE</div>
                    <div className="reviewer-rank">Elite Explorer</div>
                  </div>
                </div>
                <div className="review-score-badge cyan">9.5/10</div>
              </div>
              <div className="review-text">
                tengo problemas de conexion hace un dia e reinstalado y nada aun necesito una solucion
              </div>
            </div>
          </div>

          {/* Related News */}
          <div className="sidebar-card">
            <div className="sidebar-heading">
              <h3>NOTICIAS RELACIONADAS</h3>
            </div>
            {relatedNews.map((item, i) => (
              <div className="related-item" key={i}>
                <div className="related-thumb">
                  <canvas
                    ref={(el) => (thumbRefs.current[i] = el)}
                    width={52}
                    height={52}
                  />
                </div>
                <div className="related-info">
                  <div className="related-tag">{item.tag}</div>
                  <div className="related-title">{item.title}</div>
                  <div className="related-date">{item.date}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="sidebar-card">
            <div className="sidebar-heading"><h3>TEMAS</h3></div>
            <div className="tags-list">
              {['Parches','Balance','Ric9chet','Clasificatorias','NEXUS','QUASAR','PHANTOM','Meta','S2 2026'].map((t) => (
                <button className="tag-pill" key={t}>{t}</button>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </>
  );
}
