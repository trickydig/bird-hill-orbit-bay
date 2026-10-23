export const profile = {
  name: "Owen Holbrook",
  first: "Owen",
  last: "Holbrook",
  role: "Digital multimedia",
  focus: "Graphic design and image editing",
  place: "Derby, England",
  school: "Joseph Wright Centre, Derby College",
  email: "Oholbrook21@gmail.com",
  phoneDisplay: "07544 601894",
  phoneHref: "tel:+447544601894",
} as const;

export const intro =
  "I am Owen Holbrook, a digital multimedia student at Derby College. This portfolio shows the work I can do now, where I still want to improve, and the part of the craft I enjoy most.";

export const about =
  "I got into photo and image editing in 2023, while I was doing my GCSEs. I enjoyed it enough to take digital multimedia at college, so I could keep improving that skill and learn new ones around it. Image editing is still the work I care about most, and graphic design is the job I want.";

export const profileBlurb =
  "I am talkative and generous at work, and you can rely on me as part of a team. I try to help people who are struggling. I stay committed to a task once it is given to me, and I can be enthusiastic and understanding.";

export type Shot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type Project = {
  id: string;
  index: string;
  title: string;
  kind: string;
  when: string;
  summary: string;
  note: string;
  shots: Shot[];
};

export const projects: Project[] = [
  {
    id: "albums",
    index: "01",
    title: "Past, present, future",
    kind: "Image editing",
    when: "College, first and second year",
    summary:
      "The piece I am most proud of. I love music, so I researched album covers and then edited them in different styles. The top row is the original cover. The other frames are my past, present and future treatments.",
    note: "This is study work. I did not design the original commercial covers. The point of the board is the restyling.",
    shots: [
      {
        src: "/work/albums.jpg",
        alt: "Nine-panel board comparing original album covers with Owen Holbrook’s past, present and future restyles",
        caption: "Album cover study. Top row: original covers. Other frames: restyles.",
        width: 2000,
        height: 1293,
      },
    ],
  },
  {
    id: "edwards",
    index: "02",
    title: "William Edwards chinaware",
    kind: "Product graphics",
    when: "August 2024",
    summary:
      "Work experience in digital and graphic design at William Edwards. I took the outlines of plates, cups and saucers, then edited and formatted the patterns so they lined up with the design the client asked for, including effects that would still read in print. Some of the work was for hospitality clients, including Gordon Ramsay’s restaurants.",
    note: "Earlier work, so parts of it are less refined than I would make them now. It is where graphic design started to feel like the job I wanted.",
    shots: [
      {
        src: "/work/china-lattice.jpg",
        alt: "William Edwards gold lattice plates, saucer and cup, pattern laid out for print",
        caption: "Gold lattice set. Plates AND102 and AND104, saucer AND211, cup AND110.",
        width: 1767,
        height: 1209,
      },
      {
        src: "/work/china-snipe.jpg",
        alt: "William Edwards copper pinstripe snipe plates, teapot, saucer and teacup",
        caption: "Snipe set. Plate AND478, plate AND472, teapot AND522, saucer AND516, teacup AND515.",
        width: 1800,
        height: 996,
      },
      {
        src: "/work/china-dot.jpg",
        alt: "William Edwards copper dot plates, saucer and cup on a dark ground",
        caption: "Copper dot colourway of the plate, saucer and cup set.",
        width: 1800,
        height: 1049,
      },
    ],
  },
  {
    id: "marks",
    index: "03",
    title: "Personal marks",
    kind: "Identity",
    when: "Portfolio",
    summary:
      "Two marks I use for myself. One is a music badge: guitar, kit, and my initials for digital multimedia. The other is a drawn mask. The snake ring on the cover is the third, a line drawing I use as a frame.",
    note: "These are my own graphics, separate from the client chinaware and the album study.",
    shots: [
      {
        src: "/work/mark-dm.jpg",
        alt: "Circular badge reading Owen Holbrook D.M. with a pixel guitar, drum kit and a ring of musical notation",
        caption: "Owen Holbrook D.M. Music badge.",
        width: 888,
        height: 918,
      },
      {
        src: "/work/mark-mask.jpg",
        alt: "Gold line drawing of a mask on a black circle",
        caption: "Mask mark, gold line on black.",
        width: 900,
        height: 900,
      },
    ],
  },
];

export const experience = [
  {
    when: "April 2025 — Present",
    title: "Flyer rounds",
    org: "C&C Magazines",
    body: "About once a month my manager gives me boxes of flyers for a set area. I spend one or two days posting them through doors on my own, so events and news actually reach people.",
  },
  {
    when: "August 2024",
    title: "Digital and graphic design",
    org: "William Edwards",
    body: "I designed chinaware on a computer from briefs restaurants sent in. The team and I built the artwork digitally, and it was then made into the physical item and sent back to the company.",
  },
] as const;

export const education = [
  {
    when: "September 2025 — Present",
    title: "Digital multimedia",
    org: "Joseph Wright Centre, Derby College",
    body: "I am taking the digital multimedia course here. On my CV this sits under A-levels.",
  },
  {
    when: "September 2020 — July 2025",
    title: "GCSEs",
    org: "Westpark Secondary School",
    body: "Strong passes across my subjects. My highest grade was a 7 in English Literature, and I also achieved merits in my BTEC classes.",
  },
] as const;

export const strengths = [
  {
    title: "Independence",
    body: "I can get on with a task without being steered the whole time. I did that at William Edwards, and again handing out flyers for C&C Magazines, where I had to finish each round properly. Distractions do not pull me off the job.",
  },
  {
    title: "Communication",
    body: "At William Edwards I had to use software I did not know. I asked the manager in the department for advice, which helped me do the work properly. I would rather ask than guess.",
  },
  {
    title: "Teamwork",
    body: "If I am stuck, or if something is easy for me, I say so. At William Edwards I worked in a close-knit team. I enjoyed that, and it made the place a positive one to be in.",
  },
] as const;

export const interests = [
  {
    title: "Walking",
    when: "November 2024 — Present",
    body: "I walk around my village, day or night, when I need a quiet moment. It helps me deal with stress and keeps my head clearer.",
  },
  {
    title: "Games",
    when: "May 2015 — Present",
    body: "I have used the internet and games since I was young. That is where a lot of my IT knowledge comes from, and it is useful for the kind of work I want to do.",
  },
] as const;

export const references = [
  { name: "Ben Coupe", role: "Head of Year, Westpark School" },
  { name: "Aidan Goodrum", role: "Assistant Head of Year, Westpark School" },
] as const;

export const nav = [
  { href: "#work", id: "work", label: "Work" },
  { href: "#about", id: "about", label: "About" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#cv", id: "cv", label: "CV" },
  { href: "#contact", id: "contact", label: "Contact" },
] as const;
