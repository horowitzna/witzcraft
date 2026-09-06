// ---------------------------------------------------------------------------
// This is the ONLY file you need to edit to add / change / reorder projects.
// Images live in  public/images/  and are referenced as "/images/<filename>".
// ---------------------------------------------------------------------------

export const projects = [
  {
    slug: 'carbon-fiber-crank-arms',
    title: 'Carbon Fiber Crank Arms',
    cover: '/images/crank-arms.png',
    // How many of the 12 grid columns this tile takes on the home page.
    span: 7,
    blurb:
      'Composite crank arms for an adaptive hand-cycle, built around a 3D printed core with a wet-laid carbon fiber wrap.',
    body: [
      'Designed and manufactured a set of carbon fiber crank arms for the NAC Innovation Lab, replacing a heavier aluminum part on an adaptive hand-cycle.',
      'The arms use a printed internal core to carry the geometry and threaded interfaces, wrapped in unidirectional and woven carbon fiber. The layup was vacuum bagged to control resin content and consolidate the laminate.',
      'Key challenges were getting reliable threaded inserts into a composite part and choosing a print strategy that survived the clamping loads at the spindle and pedal ends.',
    ],
    gallery: [
      { src: '/images/prelim-sketches.png', caption: 'Preliminary sketches and sizing options' },
      { src: '/images/crank-drawing.png', caption: 'CAD profile of the crank arm' },
      { src: '/images/print-strategy.png', caption: 'Print strategy and fastener notes' },
      { src: '/images/crank-core.png', caption: 'Printed internal core' },
      { src: '/images/crank-molds.png', caption: 'Printed molds and inserts' },
      { src: '/images/carbon-layup.jpg', caption: 'Wet layup setup' },
      { src: '/images/vacuum-bag.png', caption: 'Vacuum bagging' },
      { src: '/images/crank-photo-1.jpeg', caption: 'Finished part' },
      { src: '/images/crank-photo-4.jpeg', caption: 'Installed on the bike' },
    ],
  },
  {
    slug: 'fsae-rear-suspension-rocker',
    title: 'FSAE Car Rear Suspension Rocker',
    // TODO: drop your rocker FEA render into public/images/rocker.png
    cover: '/images/rocker.png',
    span: 5,
    blurb:
      'Topology-optimized rear suspension rocker for Northeastern Electric Racing, driven by FEA under peak cornering and bump loads.',
    body: [
      'Rear suspension rocker for the Northeastern Electric Racing FSAE car, developed as a topology study in SolidWorks.',
      'Load cases were taken from peak cornering, braking and bump conditions. The optimizer removed material from the low-stress interior while preserving the three hardpoints — shock mount, pushrod pin and chassis pivot.',
      'The result cut mass significantly against the baseline plate design while keeping peak von Mises stress inside the allowable for the material.',
    ],
    gallery: [],
  },
  {
    slug: 'misc-nac-projects',
    title: 'Misc. NAC Projects',
    cover: '/images/nac-cad.png',
    span: 4,
    blurb:
      'Assorted design and fabrication work from the NAC Innovation Lab — surfacing, fixtures and printed tooling.',
    body: [
      'A collection of smaller design and fabrication jobs from the NAC Innovation Lab.',
      'These range from surfaced CAD models and printed tooling to one-off fixtures and organizers. Most were quick-turn parts that went from sketch to printed hardware in a few days.',
    ],
    gallery: [
      { src: '/images/nac-cad.png', caption: 'Surfaced CAD model' },
      { src: '/images/nac-tray-cad.png', caption: 'Organizer tray' },
      { src: '/images/nac-misc-1.png', caption: 'NAC project' },
      { src: '/images/nac-misc-2.png', caption: 'NAC project' },
      { src: '/images/nac-misc-3.png', caption: 'NAC project' },
      { src: '/images/nac-misc-4.png', caption: 'NAC project' },
    ],
  },
  {
    slug: 'school-group-work',
    title: 'School Group Work',
    // TODO: drop your insulin-dispenser photo into public/images/school-group-work.jpg
    cover: '/images/school-group-work.jpg',
    span: 4,
    blurb:
      'Cornerstone of Engineering team projects, including an automated insulin dispenser and an XY gantry mechanism.',
    body: [
      'Team projects from Cornerstone of Engineering at Northeastern.',
      'The largest was an automated insulin dispensing prototype — a mechanism that measured and dispensed a set dose, with an Arduino-driven display confirming each delivery.',
      'Other work included concept generation and mechanism selection for an XY gantry, where the team traded rack-and-pinion against belt and leadscrew drives.',
    ],
    gallery: [
      { src: '/images/xy-brainstorm.png', caption: 'XY mechanism brainstorming' },
      { src: '/images/xy-concepts.png', caption: 'Concept sketches' },
      { src: '/images/school-misc-1.png', caption: 'Project work' },
      { src: '/images/school-misc-2.png', caption: 'Project work' },
      { src: '/images/school-misc-3.png', caption: 'Project work' },
      { src: '/images/school-misc-4.png', caption: 'Project work' },
    ],
  },
]

// External tile shown alongside the projects on the home page.
export const linkedIn = {
  href: 'https://www.linkedin.com/in/nate-horowitz-99ba1436a/',
  span: 4,
}

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}
