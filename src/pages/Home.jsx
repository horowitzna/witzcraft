import { TileGrid } from '../components/Tiles.jsx'

export default function Home() {
  return (
    <>
      <section className="hero">
        <img className="hero__bg" src="/images/hero-collage.jpg" alt="" />
        <div className="hero__band">
          <h1 className="hero__title">
            I'm Nate Horowitz, 2nd year Mechanical Engineering Student at
            Northeastern University.
          </h1>
        </div>
      </section>

      <section className="patterned">
        <TileGrid />
      </section>
    </>
  )
}
