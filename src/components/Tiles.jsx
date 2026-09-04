import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects, linkedIn } from '../data/projects.js'

function TileMedia({ src, alt }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="tile__missing">
        <span>Image missing</span>
        <code>public{src}</code>
      </div>
    )
  }

  return (
    <img
      className="tile__img"
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export function Tile({ to, href, cover, title, span }) {
  const style = { '--span': span ?? 4 }
  const body = (
    <>
      <TileMedia src={cover} alt={title} />
      <span className="tile__label">{title}</span>
    </>
  )

  if (href) {
    return (
      <a className="tile" style={style} href={href} target="_blank" rel="noreferrer">
        {body}
      </a>
    )
  }

  return (
    <Link className="tile" style={style} to={to}>
      {body}
    </Link>
  )
}

export function TileGrid() {
  return (
    <div className="card">
      <div className="grid">
        {projects.map((p) => (
          <Tile
            key={p.slug}
            to={`/portfolio/${p.slug}`}
            cover={p.cover}
            title={p.title}
            span={p.span}
          />
        ))}

        <a
          className="tile tile--plain"
          style={{ '--span': linkedIn.span }}
          href={linkedIn.href}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
        >
          <svg className="tile__linkedin" viewBox="0 0 64 64" role="img" aria-hidden="true">
            <rect width="64" height="64" rx="4" fill="#0A66C2" />
            <path
              fill="#fff"
              d="M20.4 25.6h-6.9V50h6.9V25.6Zm.5-7.1a4 4 0 1 0-8 0 4 4 0 0 0 8 0ZM50.5 50V36.6c0-6.6-3.5-9.7-8.2-9.7a7.1 7.1 0 0 0-6.4 3.5v-4.8h-6.9c.1 2 0 24.4 0 24.4h6.9V36.4a4.7 4.7 0 0 1 .2-1.7 3.8 3.8 0 0 1 3.6-2.5c2.5 0 3.5 1.9 3.5 4.7V50h7.3Z"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}
