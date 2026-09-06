// Nate's own writing, transferred from content/YOUR-TEXT.md.
// One entry per paragraph. Spelling corrections only.
const paragraphs = [
  "I am Nathan (Nate) Horowitz, a 2nd year mechanical engineering student at Northeastern University. I aim to channel my passion for design and thoughtful engineering into becoming a successful engineer. I am on the Northeastern Electric Racing team, an FSAE team, where I do work for vehicle dynamics and powertrain. This past summer I had the opportunity to intern at the National Ability Center's new Innovation Lab, where I engineered and prototyped products to expand the National Ability Center's adaptive sports equipment, mainly bikes.",
  'Outside of engineering, I love to get outside into nature, and do things like mountain bike and cross-country ski. I grew up in Salt Lake City, Utah, but spend most of my time in Boston.',
]

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
