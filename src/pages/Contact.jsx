import { linkedIn } from '../data/projects.js'

const EMAIL = 'horowitz.na@northeastern.edu'

export default function Contact() {
  return (
    <section className="patterned patterned--tall">
      <div className="card card--prose">
        <h1 className="prose__title">Contact</h1>
        <p className="prose__lead">
          Want to learn more about what I've done or have a prospective opportunity
          for me? Reach out.
        </p>

        <dl className="contact">
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </dd>

          <dt>LinkedIn</dt>
          <dd>
            <a href={linkedIn.href} target="_blank" rel="noreferrer">
              linkedin.com/in/nate-horowitz-99ba1436a
            </a>
          </dd>

          <dt>School</dt>
          <dd>Northeastern University — B.S. Mechanical Engineering</dd>
        </dl>
      </div>
    </section>
  )
}
