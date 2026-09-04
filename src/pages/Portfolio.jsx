import { TileGrid } from '../components/Tiles.jsx'

export default function Portfolio() {
  return (
    <>
      <section className="hero hero--short">
        <img className="hero__bg" src="/images/hero-collage.jpg" alt="" />
        <div className="hero__band">
          <h1 className="hero__title hero__title--spaced">My Portfolio</h1>
        </div>
      </section>

      <section className="patterned">
        <TileGrid />
      </section>
    </>
  )
}
