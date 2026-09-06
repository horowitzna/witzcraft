// The body of this page is intentionally empty. Fill the ABOUT slot in
// content/YOUR-TEXT.md with your own writing and it goes in here — one entry
// per paragraph, same as the project write-ups in src/data/projects.js.
const paragraphs = []

export default function About() {
  return (
    <section className="patterned patterned--tall">
      <div className="card card--prose">
        <h1 className="prose__title">About Me</h1>

        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}
