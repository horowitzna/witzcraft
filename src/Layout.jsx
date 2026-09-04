import { useEffect } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/portfolio', label: 'Portfolio' },
]

function Nav({ variant }) {
  return (
    <nav className={`nav nav--${variant}`}>
      {links.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.end} className="nav__link">
          {l.label}
        </NavLink>
      ))}
      <Link to="/contact" className="nav__cta">
        Contact
      </Link>
    </nav>
  )
}

export default function Layout() {
  const { pathname } = useLocation()

  // Land at the top of the page on every navigation (no smooth animation).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="shell">
      <header className="bar bar--header">
        <div className="bar__inner">
          <Link to="/" className="brand brand--light">
            Witzcraft
          </Link>
          <Nav variant="header" />
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="bar bar--footer">
        <div className="bar__inner">
          <Link to="/" className="brand brand--bold">
            WitzCraft
          </Link>
          <Nav variant="footer" />
        </div>
      </footer>
    </div>
  )
}
