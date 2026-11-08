import { useEffect, useState } from 'react'
import './App.css'

const BASE = import.meta.env.BASE_URL

// Tiempos de la apertura del libro (deben coincidir con App.css)
const BOOK_SLIDE_MS = 900 // el libro se desliza a la derecha
const BOOK_SWING_MS = 1500 // la tapa se abre

/* ───────────── Contenido (edita aquí) ───────────── */

const PROFILE = {
  name: 'Ángel Martín',
  role: 'Estudiante de Ingeniería Informática',
  location: 'Santiago, Chile',
  tagline:
    'Me interesa el desarrollo de software, los agentes IA, y la ciberseguridad.',
  about:
    'Soy Ángel Martín, estudiante de Ingeniería Informática con orientación hacia el desarrollo de agentes IA y la construcción de software.',
  photo: `${BASE}images/homepage.jpg`,
  cv: `${BASE}CV.pdf`,
  email: 'angelkraus7@gmail.com',
  github: 'https://github.com/Malaaya',
  linkedin: '', // pega aquí la URL de tu perfil de LinkedIn para que aparezca
}

const SKILLS = [
  { group: 'Lenguajes', items: ['Python', 'Java', 'JavaScript', 'HTML', 'CSS', 'Kotlin'] },
  { group: 'Herramientas', items: ['Spring Boot', 'React', 'Docker', 'Git / GitHub', 'Linux', 'JWT'] },
  { group: 'Bases de datos', items: ['SQL', 'PL/SQL'] },
]

const EDUCATION = [
  {
    title: 'Ingeniería Informática',
    place: 'Instituto Duoc UC',
    period: '2026 – Cursando',
    current: true,
  },
  {
    title: 'Enseñanza Media',
    place: 'Colegio Santa Cruz Santiago',
    period: '2019 – 2022',
    current: false,
  },
]

const EXPERIENCE = [
  {
    title: 'Vendedor y administrador',
    place: 'Electrogame',
    period: '2023 – 2024',
    text: 'Ventas, compras de almacén, soporte técnico, manejo del sitio web y redes sociales de la tienda, y supervisión de personal.',
  },
]

const PROJECTS = [
  {
    title: 'RancioLaunch',
    text: 'Launcher de Minecraft de escritorio hecho en Python. Incluye login con cuenta Microsoft, selector de versión y de memoria RAM, sincronización automática de mods mediante un manifest y auto-actualización del propio launcher.',
    tags: ['Python', 'Microsoft Auth'],
    href: 'https://github.com/Malaaya/RancioLaunch',
  },
  {
    title: 'VRK Store',
    text: 'Backend de una tienda online de ropa, trabajado con Docker y Java.',
    tags: ['Java', 'Docker', 'Backend'],
    href: 'https://github.com/cassianmns/VRK-STORE',
  },
  {
    title: 'FelipeFamily',
    text: 'App Android que vincula productores agrícolas con prestadores de fumigación con drones (caso TECMUNDO). Incluye perfiles de productor, prestador y administrador, matching por compatibilidad y notificaciones locales. Proyecto académico.',
    tags: ['Kotlin', 'MVVM'],
    href: 'https://github.com/Malaaya/FelipeFamily',
  },
]

/* ───────────── Íconos ───────────── */

const paths = {
  github:
    'M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.02 1.76 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z',
  mail: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1.4 2L12 12.6 19.6 7H4.4Z',
  linkedin:
    'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.05c.53-1 1.84-2.06 3.78-2.06 4.04 0 4.79 2.66 4.79 6.12v5.44h-4v-4.82c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.9h-4v-11Z',
  download:
    'M12 3a1 1 0 0 1 1 1v8.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42L11 12.6V4a1 1 0 0 1 1-1ZM5 19h14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2Z',
  arrow: 'M7 17 17 7M9 7h8v8',
}

function Icon({ name, size = 18 }) {
  const stroke = name === 'arrow'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill={stroke ? 'none' : 'currentColor'}
      stroke={stroke ? 'currentColor' : 'none'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  )
}

function PageArrow({ direction }) {
  return (
    <svg
      className={`page-arrow-icon ${direction}`}
      width="34"
      height="34"
      viewBox="0 0 32 32"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M26 16H6m7-8-8 8 8 8" />
      <path d="M17 14c2-4 5-6 9-7-1 4-4 7-8 8m-1 3c2 4 5 6 9 7-1-4-4-7-8-8" />
      <path d="m19 11 1 3m-1 7 1-3m-6-5 1 3-1 3" />
      <circle cx="23" cy="16" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* ───────────── Componentes ───────────── */

function ProjectCard({ title, text, tags, href }) {
  return (
    <article className="card">
      <div className="card-top">
        <h3>{title}</h3>
        <a
          className="card-link"
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Ver código de ${title} en GitHub`}
        >
          <Icon name="github" size={20} />
        </a>
      </div>
      <p>{text}</p>
      <ul className="chips chips-sm">
        {tags.map((t) => <li className="chip" key={t}>{t}</li>)}
      </ul>
      <a className="text-link" href={href} target="_blank" rel="noreferrer">
        Ver código en GitHub <Icon name="arrow" size={16} />
      </a>
    </article>
  )
}

function Section({ title, children }) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function TimelineItem({ title, place, period, text, current }) {
  return (
    <li className={`tl-item${current ? ' is-current' : ''}`}>
      <span className="tl-dot" aria-hidden="true" />
      <div className="tl-body">
        <span className="tl-period">{period}</span>
        <h3>{title}</h3>
        <p className="tl-place">{place}</p>
        {text && <p className="tl-text">{text}</p>}
      </div>
    </li>
  )
}

function App() {
  const [currentSpread, setCurrentSpread] = useState(0)
  const [turning, setTurning] = useState(null)
  const [bookClosed, setBookClosed] = useState(true)
  const [bookOpening, setBookOpening] = useState(false)
  const [bookClosing, setBookClosing] = useState(false)
  const [bookRevealing, setBookRevealing] = useState(false)
  const [openFlow, setOpenFlow] = useState('zoom') // 'slide' (escritorio) | 'zoom' (móvil)
  const [openPhase, setOpenPhase] = useState(null) // 'slide' → 'swing'

  useEffect(() => {
    if (!turning) return undefined

    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1300
    const timeout = window.setTimeout(() => {
      setCurrentSpread(turning.targetIndex)
      setTurning(null)
    }, duration)

    return () => window.clearTimeout(timeout)
  }, [turning])

  useEffect(() => {
    if (!bookOpening) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (openFlow === 'slide') {
      // 1) el libro cerrado se desliza a la derecha, 2) la tapa se abre y muestra el contenido
      const slideMs = reduceMotion ? 0 : BOOK_SLIDE_MS
      const swingMs = reduceMotion ? 0 : BOOK_SWING_MS
      const swingTimeout = window.setTimeout(() => setOpenPhase('swing'), slideMs)
      const doneTimeout = window.setTimeout(() => {
        setBookClosed(false)
        setBookOpening(false)
        setOpenPhase(null)
      }, slideMs + swingMs)

      return () => {
        window.clearTimeout(swingTimeout)
        window.clearTimeout(doneTimeout)
      }
    }

    const duration = reduceMotion ? 0 : 1000
    const revealTimeout = window.setTimeout(() => setBookRevealing(true), duration / 2)
    const timeout = window.setTimeout(() => {
      setBookClosed(false)
      setBookOpening(false)
      setBookRevealing(false)
    }, duration)

    return () => {
      window.clearTimeout(revealTimeout)
      window.clearTimeout(timeout)
    }
  }, [bookOpening, openFlow])

  useEffect(() => {
    if (!bookClosing) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coverDelay = reduceMotion ? 0 : 500
    const closeTimeout = window.setTimeout(() => {
      setBookClosed(true)
    }, coverDelay)
    const doneTimeout = window.setTimeout(() => setBookClosing(false), coverDelay + (reduceMotion ? 0 : 500))

    return () => {
      window.clearTimeout(closeTimeout)
      window.clearTimeout(doneTimeout)
    }
  }, [bookClosing])

  const pages = [
    {
      label: '',
      folio: null,
      content: (
        <figure className="tribute-page">
          <div className="tribute-photo">
            <img src={`${BASE}images/3jaegers.png`} alt="Retrato de la familia Jaeger" />
            <span className="photo-tape top-left" aria-hidden="true" />
            <span className="photo-tape top-right" aria-hidden="true" />
            <span className="photo-tape bottom-left" aria-hidden="true" />
            <span className="photo-tape bottom-right" aria-hidden="true" />
          </div>
          <figcaption>Para ti, dentro de 2000 años</figcaption>
        </figure>
      ),
    },
    {
      label: 'Presentación',
      folio: 2,
      content: (
        <div className="intro-content">
          <section className="hero">
            <div className="hero-text">
              <p className="eyebrow">Presentación</p>
              <h1>{PROFILE.name}</h1>
              <p className="role">{PROFILE.role}</p>
              <p className="lead">{PROFILE.tagline}</p>
              <div className="cta">
                <button className="btn btn-primary" type="button" onClick={() => setCurrentSpread(2)}>
                  Ver proyectos
                </button>
                <a className="btn btn-ghost" href={PROFILE.cv} download>
                  <Icon name="download" /> Descargar CV
                </a>
              </div>
              <p className="where">{PROFILE.location}</p>
            </div>
            <div className="hero-photo">
              <div className="photo-ring">
                <img src={PROFILE.photo} alt="Ilustración de un cráneo con frutillas" />
              </div>
            </div>
          </section>
          <Section title="Sobre mí">
            <p className="about">{PROFILE.about}</p>
          </Section>
        </div>
      ),
    },
    {
      label: 'Habilidades',
      folio: 4,
      content: (
        <Section title="Habilidades técnicas">
          <div className="skills">
            {SKILLS.map(({ group, items }) => (
              <div className="skill-group" key={group}>
                <h3>{group}</h3>
                <ul className="chips">
                  {items.map((s) => (
                    <li className="chip" key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      ),
    },
    {
      label: 'Trayectoria',
      folio: 5,
      content: (
        <Section title="Trayectoria">
          <div className="two-col">
            <div>
              <h3 className="col-title">Educación</h3>
              <ol className="timeline">
                {EDUCATION.map((e) => <TimelineItem key={e.title} {...e} />)}
              </ol>
            </div>
            <div>
              <h3 className="col-title">Experiencia</h3>
              <ol className="timeline">
                {EXPERIENCE.map((e) => <TimelineItem key={e.title} {...e} />)}
              </ol>
            </div>
          </div>
        </Section>
      ),
    },
    {
      label: 'Proyectos',
      folio: 6,
      content: (
        <Section title="Proyectos">
          <div className="projects">
            {PROJECTS.map((p) => <ProjectCard key={p.title} {...p} />)}
          </div>
        </Section>
      ),
    },
    {
      label: 'Contacto',
      folio: 7,
      content: (
        <Section title="Contacto">
          <p className="about">¿Hablamos? Puedes escribirme o revisar mi trabajo en:</p>
          <div className="contact">
            <a className="btn btn-primary" href={`mailto:${PROFILE.email}`}>
              <Icon name="mail" /> {PROFILE.email}
            </a>
            <a className="btn btn-ghost" href={PROFILE.github} target="_blank" rel="noreferrer">
              <Icon name="github" /> GitHub
            </a>
            {PROFILE.linkedin && (
              <a className="btn btn-ghost" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" /> LinkedIn
              </a>
            )}
          </div>
        </Section>
      ),
    },
  ]

  const spreads = [
    { left: 0, right: 1, label: 'Inicio' },
    { left: 2, right: 3, label: 'Habilidades · Trayectoria' },
    { left: 4, right: 5, label: 'Proyectos · Contacto' },
  ]

  const turnPage = (direction) => {
    const targetIndex = currentSpread + (direction === 'forward' ? 1 : -1)
    if (!turning && targetIndex >= 0 && targetIndex < spreads.length) {
      setTurning({ direction, targetIndex })
    }
  }

  const closeBook = () => {
    if (bookOpening || bookClosing || bookClosed) return
    setTurning(null)
    setBookRevealing(false)
    setBookClosing(true)
  }

  const renderPage = (index) => (
    <>
      <div className={`page-body${pages[index].label === 'Proyectos' ? ' projects-page-body' : ''}`}>
        {pages[index].content}
      </div>
      <div className="page-number" aria-hidden="true">
        {pages[index].label && (
          <span>{String(pages[index].folio ?? index + 1).padStart(2, '0')} · {pages[index].label}</span>
        )}
      </div>
    </>
  )

  const renderTurningLeaf = (index, side, arrowDirection) => (
    <article className={`book-leaf ${side}-page`}>
      {renderPage(index)}
      <span className="page-turn-mark">
        <PageArrow direction={arrowDirection} />
      </span>
    </article>
  )

  const spread = spreads[currentSpread]
  const activeSpread = turning ? spreads[turning.targetIndex] : spread
  const siteStyle = {
    '--workshop-bg': `url("${BASE}images/rustic-workshop.png")`,
    '--key-cursor': `url("${BASE}images/key-cursor.png")`,
  }

  return (
    <div className="site-shell" style={siteStyle}>
      <main className="book-stage">
        <div className={`book-shell${bookClosed ? ' is-closed' : ''}${bookOpening ? ' is-opening' : ''}${bookClosing ? ' is-closing' : ''}`}>
          <div className={`book-open${turning ? ' is-turning' : ''}${bookClosed && !bookRevealing && openPhase !== 'swing' ? ' is-closed' : ''}${bookRevealing ? ' is-revealing' : ''}${openPhase === 'swing' ? ' is-unveiling' : ''}${bookClosing ? ' is-closing' : ''}`}>
            <div className="book-spread">
              <article className="book-leaf left-page" aria-live="polite">
                {renderPage(spread.left)}
                <button
                  type="button"
                  className="page-turn-button"
                  onClick={() => turnPage('backward')}
                  disabled={currentSpread === 0 || Boolean(turning)}
                  aria-label="Volver al pliego anterior"
                  title="Volver al pliego anterior"
                >
                  <PageArrow direction="backward" />
                </button>
              </article>
              <article className="book-leaf right-page" aria-live="polite">
                {renderPage(spread.right)}
                <button
                  type="button"
                  className="page-turn-button"
                  onClick={() => turnPage('forward')}
                  disabled={currentSpread === spreads.length - 1 || Boolean(turning)}
                  aria-label="Avanzar al siguiente pliego"
                  title="Avanzar al siguiente pliego"
                >
                  <PageArrow direction="forward" />
                </button>
              </article>
            </div>
            {turning && (
              <>
                <div className={`turn-underlay ${turning.direction}`} aria-hidden="true">
                  {turning.direction === 'forward'
                    ? <article className="book-leaf right-page">{renderPage(activeSpread.right)}</article>
                    : <article className="book-leaf left-page">{renderPage(activeSpread.left)}</article>}
                </div>
                <div className={`flip-leaf ${turning.direction}`} aria-hidden="true">
                  <div className="flip-face front">
                    {turning.direction === 'forward'
                      ? renderTurningLeaf(spread.right, 'right', 'forward')
                      : renderTurningLeaf(spread.left, 'left', 'backward')}
                  </div>
                  <div className="flip-face back">
                    {turning.direction === 'forward'
                      ? renderTurningLeaf(activeSpread.left, 'left', 'backward')
                      : renderTurningLeaf(activeSpread.right, 'right', 'forward')}
                  </div>
                </div>
              </>
            )}
            {!turning && (
              <div className="book-gutter" aria-hidden="true" />
            )}
          </div>
          {!bookClosed && (
            <button
              type="button"
              className="close-book-tab"
              onClick={closeBook}
              disabled={bookClosing}
              aria-label="Cerrar el libro"
              title="Cerrar el libro"
            >
              <span>CIERRE</span>
            </button>
          )}
          {bookClosed && (
            <div className={`closed-book${bookOpening && openFlow === 'zoom' ? ' is-opening' : ''}${bookClosing ? ' is-returning' : ''}${openPhase ? ' is-sliding' : ''}${openPhase === 'swing' ? ' is-swinging' : ''}`}>
              <span className="closed-book-pages" aria-hidden="true" />
              <span className="closed-book-cover">
                <span className="closed-book-back" aria-hidden="true">
                  <article className="book-leaf left-page">{renderPage(spreads[0].left)}</article>
                </span>
                <span className="closed-book-front">
                  <span className="closed-book-edition">Portafolio personal</span>
                  <span className="closed-book-title">Ángel Martín</span>
                  <span className="closed-book-subtitle">{PROFILE.role}</span>
                  <span className="closed-book-compass" aria-hidden="true">
                    <svg viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="82" />
                      <circle cx="100" cy="100" r="73" />
                      <path className="compass-points" d="m100 23 11 66 66 11-66 11-11 66-11-66-66-11 66-11z" />
                      <path className="compass-cross" d="m100 41 8 51 51 8-51 8-8 51-8-51-51-8 51-8z" />
                      <path className="compass-inner" d="m100 74 7 19 19 7-19 7-7 19-7-19-19-7 19-7z" />
                      <circle className="compass-center" cx="100" cy="100" r="5" />
                      <path className="compass-ticks" d="M100 8v18m0 148v18M8 100h18m148 0h18M35 35l13 13m104 104 13 13m0-130-13 13M48 152l-13 13" />
                    </svg>
                  </span>
                  <span className="closed-book-corner top-left" aria-hidden="true">
                    <svg viewBox="0 0 72 72"><path d="M5 38C15 37 16 28 16 17c11 0 20-2 21-12 2 11 8 16 20 16-1 12 3 19 10 22-11 2-17 8-17 20-12-1-18 2-21 8-3-10-9-15-21-15 1-9-1-14-3-18Z"/><path d="M12 38c10-3 15-10 15-19m10 3c-2 12-10 20-21 22m34-19c-3 9-9 15-18 18m13 16c-2-10-8-15-17-16"/></svg>
                  </span>
                  <span className="closed-book-corner top-right" aria-hidden="true">
                    <svg viewBox="0 0 72 72"><path d="M5 38C15 37 16 28 16 17c11 0 20-2 21-12 2 11 8 16 20 16-1 12 3 19 10 22-11 2-17 8-17 20-12-1-18 2-21 8-3-10-9-15-21-15 1-9-1-14-3-18Z"/><path d="M12 38c10-3 15-10 15-19m10 3c-2 12-10 20-21 22m34-19c-3 9-9 15-18 18m13 16c-2-10-8-15-17-16"/></svg>
                  </span>
                  <span className="closed-book-corner bottom-left" aria-hidden="true">
                    <svg viewBox="0 0 72 72"><path d="M5 38C15 37 16 28 16 17c11 0 20-2 21-12 2 11 8 16 20 16-1 12 3 19 10 22-11 2-17 8-17 20-12-1-18 2-21 8-3-10-9-15-21-15 1-9-1-14-3-18Z"/><path d="M12 38c10-3 15-10 15-19m10 3c-2 12-10 20-21 22m34-19c-3 9-9 15-18 18m13 16c-2-10-8-15-17-16"/></svg>
                  </span>
                  <span className="closed-book-corner bottom-right" aria-hidden="true">
                    <svg viewBox="0 0 72 72"><path d="M5 38C15 37 16 28 16 17c11 0 20-2 21-12 2 11 8 16 20 16-1 12 3 19 10 22-11 2-17 8-17 20-12-1-18 2-21 8-3-10-9-15-21-15 1-9-1-14-3-18Z"/><path d="M12 38c10-3 15-10 15-19m10 3c-2 12-10 20-21 22m34-19c-3 9-9 15-18 18m13 16c-2-10-8-15-17-16"/></svg>
                  </span>
                  <span className="closed-book-spine-stitches" aria-hidden="true" />
                  <span className="closed-book-strap" aria-hidden="true" />
                  <span className="closed-book-wear" aria-hidden="true" />
                  <button
                    type="button"
                    className="closed-book-lock"
                    onClick={() => {
                      if (bookOpening) return
                      const isMobile = window.matchMedia('(max-width: 760px)').matches
                      setBookRevealing(false)
                      setOpenFlow(isMobile ? 'zoom' : 'slide')
                      setOpenPhase(isMobile ? null : 'slide')
                      setBookOpening(true)
                    }}
                    aria-label="Desbloquear y abrir el portafolio"
                    title="Desbloquear y abrir"
                    disabled={bookOpening}
                  >
                    <span className="padlock-shackle" aria-hidden="true" />
                    <span className="padlock-body" aria-hidden="true">
                      <span className="padlock-keyhole" />
                    </span>
                  </button>
                </span>
              </span>
              <span className="closed-book-hint">Pulsa la cerradura para abrir</span>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} {PROFILE.name} · Hecho con React y Vite
        </p>
      </footer>
    </div>
  )
}

export default App
