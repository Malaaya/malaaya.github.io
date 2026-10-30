import { useEffect, useState } from 'react'
import './App.css'

const BASE = import.meta.env.BASE_URL

/* ───────────── Contenido (edita aquí) ───────────── */

const PROFILE = {
  name: 'Ángel Martín',
  role: 'Estudiante de Ingeniería Informática',
  location: 'Santiago, Chile',
  tagline:
    'Me interesa el desarrollo y la creación de agentes IA, y construir software que funcione de verdad.',
  about:
    'Soy Ángel Martín, estudiante de Ingeniería Informática con orientación hacia el desarrollo y creación de agentes IA y la construcción de software.',
  photo: `${BASE}images/homepage.jpg`,
  cv: `${BASE}CV.pdf`,
  email: 'angelkraus7@gmail.com',
  github: 'https://github.com/Malaaya',
  linkedin: '', // pega aquí la URL de tu perfil de LinkedIn para que aparezca
}

const SKILLS = [
  { group: 'Lenguajes', items: ['Python', 'Java'] },
  { group: 'Herramientas', items: ['Spring Boot', 'React', 'Docker', 'Git / GitHub'] },
  { group: 'Bases de datos', items: ['SQL'] },
]

const EDUCATION = [
  {
    title: 'Ingeniería Informática',
    place: 'Instituto Duoc UC',
    period: '2025 – Cursando',
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
    period: 'Ene 2023 – Ene 2024',
    text: 'Ventas, compras de almacén, soporte técnico, manejo del sitio web y redes sociales de la tienda, y supervisión de personal.',
  },
]

const PROJECTS = [
  {
    title: 'RancioLaunch',
    text: 'Launcher de Minecraft de escritorio hecho en Python. Incluye login con cuenta Microsoft, selector de versión y de memoria RAM, sincronización automática de mods mediante un manifest y auto-actualización del propio launcher.',
    tags: ['Python', 'CustomTkinter', 'Microsoft Auth', 'PyInstaller'],
    href: 'https://github.com/Malaaya/RancioLaunch',
  },
  {
    title: 'VRK Store',
    text: 'Backend de una tienda online de ropa, trabajado con Docker y Java.',
    tags: ['Java', 'Docker', 'Backend'],
    href: 'https://github.com/cassianmns/VRK-STORE',
  },
]

const NAV = [
  ['sobre-mi', 'Sobre mí'],
  ['habilidades', 'Habilidades'],
  ['educacion', 'Trayectoria'],
  ['proyectos', 'Proyectos'],
  ['contacto', 'Contacto'],
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
  sun: 'M12 4V2m0 20v-2M4 12H2m20 0h-2M5.64 5.64 4.22 4.22m15.56 15.56-1.42-1.42M18.36 5.64l1.42-1.42M4.22 19.78l1.42-1.42M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z',
}

function Icon({ name, size = 18 }) {
  const stroke = ['arrow', 'sun', 'moon'].includes(name)
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

/* ───────────── Componentes ───────────── */

function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
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
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* modo privado: no pasa nada */
    }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  const isDark = theme === 'dark'

  return (
    <>
      <header className="topbar">
        <nav className="nav" aria-label="Principal">
          <a href="#inicio" className="brand">
            <span className="brand-dot" />
            {PROFILE.name.split(' ')[0]}
          </a>
          <ul className="nav-links">
            {NAV.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={isDark ? 'Modo claro' : 'Modo oscuro'}
          >
            <Icon name={isDark ? 'sun' : 'moon'} />
          </button>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-text">
            <p className="eyebrow">Hola, soy</p>
            <h1>{PROFILE.name}</h1>
            <p className="role">{PROFILE.role}</p>
            <p className="lead">{PROFILE.tagline}</p>
            <div className="cta">
              <a className="btn btn-primary" href="#proyectos">
                Ver proyectos
              </a>
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

        <Section id="sobre-mi" title="Sobre mí">
          <p className="about">{PROFILE.about}</p>
        </Section>

        <Section id="habilidades" title="Habilidades técnicas">
          <div className="skills">
            {SKILLS.map(({ group, items }) => (
              <div className="skill-group" key={group}>
                <h3>{group}</h3>
                <ul className="chips">
                  {items.map((s) => (
                    <li className="chip" key={s}>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="educacion" title="Trayectoria">
          <div className="two-col">
            <div>
              <h3 className="col-title">Educación</h3>
              <ol className="timeline">
                {EDUCATION.map((e) => (
                  <TimelineItem key={e.title} {...e} />
                ))}
              </ol>
            </div>
            <div>
              <h3 className="col-title">Experiencia</h3>
              <ol className="timeline">
                {EXPERIENCE.map((e) => (
                  <TimelineItem key={e.title} {...e} />
                ))}
              </ol>
            </div>
          </div>
        </Section>

        <Section id="proyectos" title="Proyectos">
          <div className="projects">
            {PROJECTS.map((p) => (
              <article className="card" key={p.title}>
                <div className="card-top">
                  <h3>{p.title}</h3>
                  <a
                    className="card-link"
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Ver código de ${p.title} en GitHub`}
                  >
                    <Icon name="github" size={20} />
                  </a>
                </div>
                <p>{p.text}</p>
                <ul className="chips chips-sm">
                  {p.tags.map((t) => (
                    <li className="chip" key={t}>
                      {t}
                    </li>
                  ))}
                </ul>
                <a className="text-link" href={p.href} target="_blank" rel="noreferrer">
                  Ver código en GitHub <Icon name="arrow" size={16} />
                </a>
              </article>
            ))}
          </div>
        </Section>

        <Section id="contacto" title="Contacto">
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
      </main>

      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} {PROFILE.name} · Hecho con React y Vite
        </p>
      </footer>
    </>
  )
}

export default App
