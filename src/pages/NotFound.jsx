import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="patterned patterned--tall">
      <div className="card card--prose">
        <h1 className="prose__title">Page not found</h1>
        <p>That page doesn't exist.</p>
        <Link to="/" className="backlink">
          &larr; Back home
        </Link>
      </div>
    </section>
  )
}
