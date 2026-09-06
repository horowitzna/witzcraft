import { useParams, Link } from 'react-router-dom'
import { getProject } from '../data/projects.js'
import NotFound from './NotFound.jsx'

export default function Project() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) return <NotFound />

  return (
    <>
      <section className="hero hero--short">
        <img
          className="hero__bg"
          src={project.banner || project.cover}
          style={project.bannerPosition ? { objectPosition: project.bannerPosition } : undefined}
          alt=""
        />
        <div className="hero__band">
          <h1 className="hero__title">{project.title}</h1>
        </div>
      </section>

      <section className="patterned">
        <div className="card card--prose">
          <Link to="/portfolio" className="backlink">
            &larr; Back to portfolio
          </Link>

          {project.blurb && <p className="prose__lead">{project.blurb}</p>}

          {project.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          {project.links?.length > 0 && (
            <ul className="prose__links">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {project.gallery.length > 0 && (
            <div className="gallery">
              {project.gallery.map((item, i) => (
                <figure className="gallery__item" key={item.src}>
                  <img
                    src={item.src}
                    alt={item.caption || `${project.title} — image ${i + 1}`}
                    loading="lazy"
                  />
                  {item.caption && <figcaption>{item.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
