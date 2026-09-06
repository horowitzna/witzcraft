// ---------------------------------------------------------------------------
// This is the ONLY file you need to edit to add / change / reorder projects.
// Images live in  public/images/  and are referenced as "/images/<filename>".
//
// All prose and captions below are Nate's own words, transferred verbatim.
// Captions come from the image filenames in "Portfolio Website Folder".
// Don't let anything else creep in here.
// ---------------------------------------------------------------------------

export const projects = [
  {
    slug: 'carbon-fiber-crank-arms',
    title: 'Carbon Fiber Crank Arms',
    cover: '/images/crank-arms.png',
    // How many of the 12 grid columns this tile takes on the home page.
    span: 7,
    body: [
      "My primary project while interning at the National Ability Center was a structural feasibility study into engineering an adjustable handcycle crank arm that can be used for a wide variety of participants. The only adjustable crank on the market costs 600 dollars, and we were trying to create a much cheaper one with the resources we had. We share the lab with AdaptKraft, a company that makes custom carbon fiber seats for adaptive athletes, which provided insight and resources into carbon fiber composite systems. I independently led the project under the guide of Abe Rogers, the head engineer of the lab. I learned about composites engineering, designing molds, and FDM 3D printing.",
      "For the feasibility study, I built a prototype fixed crank arm after may design discussions. I decided on a design centered around getting perfect geometry conversion for the two attachment points: the bike specific pedal threads, and the square tapered hole that interfaces with the bikes spindle. I 3D printed molds out of Petg, and cast them using a metal infused epoxy (DWH-310). The metal epoxy fixtures were then wrapped in carbon fiber rings during layup and compressed to a fixtured printed ASA core designed to be extra stiff. That whole set up was then layered up with 2x2 carbon fiber plies, before undergoing vacuum consolidation to ensure a more efficient cure. Manufacturing the part was especially tricky. Doing 11 plies around a complex part with the epoxy’s short pot life was intensive, and the demolding and post processing was very labor intensive. It made me think a lot about engineering parts in smart ways to make manufacturing much smoother. In the end, we were able to get a working prototype on a handcycle. While ultimately the project did not make it to production due to the intensive manufacturing process and some structural concerns stemming from that manufacturing process, I learned a ton about hands on manufacturing engineering and composites that I will be able to bring forward for future projects.",
    ],
    gallery: [
      {
        src: '/images/crank-initial-sketch-drafting.png',
        caption: 'Inital sketch drafting for the crank arm',
      },
      {
        src: '/images/crank-3d-printed-molds-for-casting-the-metal-epoxy.jpg',
        caption: '3D printed molds for casting the metal epoxy',
      },
      { src: '/images/crank-the-central-core.jpg', caption: 'The central core' },
      {
        src: '/images/crank-the-crank-undergoing-vacuum-consolidation.jpg',
        caption: 'The crank undergoing vacuum consolidation',
      },
      { src: '/images/crank-it-weighed-only-87-grams.jpg', caption: 'It weighed only 87 grams' },
    ],
  },
  {
    slug: 'fsae-rear-suspension-rocker',
    title: 'FSAE Car Rear Suspension Rocker',
    cover: '/images/rocker-running-fea-on-the-rear-rocker.png',
    span: 5,
    body: [
      "In my first year at Northeastern, I joined Northeastern Electric Racing, our FSAE team. I joined the vehicle dynamics subdivision, and was tasked with designing, validating, and manufacturing the rear rocker for the car’s suspension. I learned Solidworks, and worked closely with my lead, Noah Clifford, to understand the goals of this part of the car. While last year’s rockers were very light, the goal for this year’s was to increase ease of manufacturing. After the basic design was done, I used Solidworks’ built-in simulation to run Finite Element Analysis (FEA), to see where I could cut down on material to make the part lighter. Once the design was done, I was taught by the team’s leads how to machine the part using a Tormach CNC machine. I learned CAM in fusion to understand and program the different actions I needed to machine. I also had to make a soft jaw (also machined on the Tormach) to fix the rocker in place during machining. When the part was finished, I helped put together the suspension together with the team. As a whole, it was a very rewarding experience.",
    ],
    gallery: [
      {
        src: '/images/rocker-solidworks-design-iteration-of-the-rocker.png',
        caption: 'Solidworks Design Iteration of the Rocker',
      },
      {
        src: '/images/rocker-running-fea-on-the-rear-rocker.png',
        caption: 'Running FEA on the Rear Rocker',
      },
      {
        src: '/images/rocker-machining-the-rocker-on-the-tormach-cnc.jpg',
        caption: 'Machining the Rocker on the Tormach CNC',
      },
      {
        src: '/images/rocker-rear-suspension-assembled-on-the-car.jpg',
        caption: 'Rear suspension assembled on the car',
      },
    ],
  },
  {
    slug: 'misc-nac-projects',
    title: 'Misc. NAC Projects',
    cover: '/images/nac-surface-cad-of-the-headrest.png',
    span: 4,
    body: [
      "In addition to engineering the carbon fiber crank arms at the National Ability Center (NAC), I was able to get rewarding hands-on experience with other side projects. I was able to explore generative design when working on a 3D printed headrest and adjustable clamp system that could be used on any of their 20+ Ice Recumbent Tricycles. Using Fusion 360, I was able to input the desired loads we needed, the fixed clamp system geometry, the headrest contouring, and Fusion’s algorithm provided 6 options for topology optimized designs that supported participants heads using the properties of ASA filament. This short, 1-week side project emphasized the need for user-centered design. I was helping set up some bikes for a group of veterans, and noticed our resources lacked these simple supports. Instead of buying 1 headrest directly from the manufacture for $173, the NAC now has the design and can print as many as they need for very cheap. Solving these small problems was a very rewarding take on engineering. Thoughtful design solutions make a meaningful difference and improve simple quality of life for participants.",
      "In addition to the head rest, small projects like rebuilding the foam padding to custom fit certain bikes, and printing out open-sourced brake clamps to prevent the Bowhead offroad handcycles from rolling away are examples of minor things that I did to maximize my time at the NAC while making thoughtful adjustments to their gear using the resources I had.",
      "Lastly, I got great advice and some experience with composites engineering. I was able to help out with the molding of one of Zach’s (AdaptKraft) bucket seats for a participant. It was an interesting perspective on engineering, as he comes from a CPO Orthotist background. He is very knowledgeable and taught/guided me through his vacuum infusion process.",
    ],
    links: [
      {
        label: 'nationalabilitycenter.org',
        href: 'https://nationalabilitycenter.org/nac-innovation-lab-adaptive-recreation-engineering/',
      },
      { label: 'adaptkraft.com', href: 'https://www.adaptkraft.com/' },
    ],
    gallery: [
      {
        src: '/images/nac-surface-cad-of-the-headrest.png',
        caption: 'Surface CAD of the headrest',
      },
      {
        src: '/images/nac-fully-printed-version-2-with-clamps.jpg',
        caption: 'Fully printed version 2 with clamps. Printed with ASA filament',
      },
      {
        src: '/images/nac-custom-foam-for-the-offroad-handcycle-mako.jpg',
        caption: "Custom foam for the offroad handcycle 'Mako.'",
      },
      {
        src: '/images/nac-bowhead-brake-clamps-and-mount-on-the-bike.png',
        caption: 'Bowhead brake clamps and mount on the bike',
      },
    ],
  },
  {
    slug: 'school-group-work',
    title: 'School Group Work',
    cover: '/images/school-the-final-version-of-the-dispenser-with-the-lcd-disp.jpg',
    span: 4,
    body: [
      "For my first-year engineering class (Cornerstones of Engineering), we had two end of semester group projects. For the first project, we were tasked with teacher 4th graders about engineering challenges through an interactive experience or game. We built a project in which they had to fix a bridge and repair a ferry to let citizens through. They had 3 different problems: a coding level to turn the guiding & clearance lights back on, a wiring level where they had to wire the motor that turned the drawbridge on, and a physical design level where they had to repair a ferry with important pieces to teach them about holistic engineering. I primarily worked on physical systems and CADing the design elements. I used Solidworks to design parts of the bridge, and the entire boat and assembly system. I learned a lot about how to develop concept shapes, tolerances, and good CAD practices.",
      "For the second project, we designed a pharmaceutical device capable of responsively delivering a variety of prescriptions to consumers. Based off of a prescribed input (a code a doctor would prescribe to you), using a rack and pinion system, a robotic segment would move to your required medication column, and dispense your correct medication for quick pick up. The goal was for it to be a faster and more consistent alternative to traditional pharmacy prescription pick up. I was the lead of mechanical systems and led the concepting, design and production of the physical systems. I more specifically focused on the motor housing, the rack and pinion pusher system, and the hinge dispensing system, in addition to the structural design. My experience with Solidworks helped to create a parts system and assembly to make sure the individual aspects of the project worked well together.",
    ],
    gallery: [
      {
        src: '/images/school-the-bridge-engineering-demonstration.jpg',
        caption: 'The Bridge engineering demonstration',
      },
      { src: '/images/school-the-model-boat-i-caded.jpg', caption: 'The model boat I CADed' },
      {
        src: '/images/school-the-first-design-iteration-of-the-pill-bottle-releas.jpg',
        caption: 'The first design iteration of the pill bottle release mechanism',
      },
      {
        src: '/images/school-the-hinge-pusher-sub-assembly.jpg',
        caption: 'The hinge-pusher sub assembly',
      },
      {
        src: '/images/school-version-2-of-the-health-unit-dispenser.jpg',
        caption: 'Version 2 of the health unit dispenser',
      },
      {
        src: '/images/school-the-final-version-of-the-dispenser-with-the-lcd-disp.jpg',
        caption: 'The final version of the dispenser with the lcd display',
      },
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
