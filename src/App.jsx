import { useState } from 'react'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <header>
        <h1>Ángel Martín</h1>
        <p>Estudiante de Ingeniería Informática</p>
        
        <button id="toggle-dark" onClick={toggleDarkMode}>
          {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
      </header>

      <main>
        <section id="sobre-mi">
          <h2>Sobre mí</h2>
          <p>Soy Ángel Martín, estudiante de Ingeniería Informática con orientación hacia el desarrollo y creación de agentes IA y la construcción de software.</p>
          <img src="/images/homepage.jpg" width="200"/>
        </section>

        <section id="habilidades">
          <h2>Habilidades Técnicas</h2>
          <div className="skills-container">
            <span className="skill-tag">Python /</span>
            <span className="skill-tag">Java</span>
            <span className="skill-tag">Spring Boot / Frameworks</span>
            <span className="skill-tag">Git / GitHub</span>
            <span className="skill-tag">Bases de Datos (SQL)</span>
          </div>
        </section>

        <section id="educacion">
          <h2>Educación</h2>
          <article>
            <h3>Ingeniería Informática</h3>
            <p><em>Enseñanza Media</em> — Completa</p>
            <p><em>Instituto Duoc Uc</em> — En curso</p>
          </article>
        </section>

        <section id="proyectos">
          <h2>Proyectos</h2>
          <article>
            <h3>Proyecto 1: VRK Store</h3>
            <p>Backend de una tienda online de ropa, proyecto trabajado con Docker y Java.</p>
            <a href="https://github.com/cassianmns/VRK-STORE" target="_blank" rel="noreferrer">Ver código en GitHub</a>
          </article>
        </section>

        <section id="contacto">
          <h2>Contacto</h2>
          <p>Puedes contactarme a través de:</p>
          <ul>
            <li>Email: <a href="mailto:angelkraus7@gmail.com">angelkraus7@gmail.com</a></li>
            <li>LinkedIn: <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">Mi Perfil</a></li>
            {/* Ruta ajustada apuntando a la carpeta public/ */}
            <a href="/CV.pdf" download className="btn-cv">Descargar mi CV (PDF)</a>
          </ul>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Ángel Martín - Todos los derechos reservados</p>
      </footer>
    </div>
  )
}

export default App