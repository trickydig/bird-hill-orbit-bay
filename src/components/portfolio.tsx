import { useEffect, useId, useMemo, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import {
  about,
  education,
  experience,
  interests,
  intro,
  nav,
  profile,
  profileBlurb,
  projects,
  references,
  strengths,
  type Shot,
} from "@/data/content";

type Lightbox = { project: number; shot: number };

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("work");
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);
  const [copied, setCopied] = useState(false);
  const [sentNote, setSentNote] = useState("");
  const [formError, setFormError] = useState("");
  const formId = useId();

  useEffect(() => {
    const nodes = nav
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.15, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") shiftLightbox(1);
      if (event.key === "ArrowLeft") shiftLightbox(-1);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  const flatShots = useMemo(
    () =>
      projects.flatMap((project, projectIndex) =>
        project.shots.map((shot, shotIndex) => ({ projectIndex, shotIndex, shot, project })),
      ),
    [],
  );

  function shiftLightbox(direction: number) {
    setLightbox((current) => {
      if (!current) return current;
      const index = flatShots.findIndex(
        (item) => item.projectIndex === current.project && item.shotIndex === current.shot,
      );
      const next = flatShots[(index + direction + flatShots.length) % flatShots.length];
      return { project: next.projectIndex, shot: next.shotIndex };
    });
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      setSentNote(`Copy failed. Email ${profile.email} directly.`);
    }
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2 || !email.includes("@") || message.length < 8) {
      setFormError("Add your name, a real email, and a short message.");
      setSentNote("");
      return;
    }
    setFormError("");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    setSentNote("Your email app should open with this message. If it does not, use the address above.");
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  const currentShot: { shot: Shot; title: string } | null = lightbox
    ? {
        shot: projects[lightbox.project].shots[lightbox.shot],
        title: projects[lightbox.project].title,
      }
    : null;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-lilac focus:px-4 focus:py-2 focus:text-night"
      >
        Skip to work
      </a>

      <header className="no-print sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="font-display text-lg tracking-tight text-night">
            Owen Holbrook
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Sections">
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`text-sm ${active === item.id ? "text-violet" : "text-muted"}`}
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden h-11 items-center bg-violet px-4 text-sm text-paper md:inline-flex"
            >
              Get in touch
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center border border-line md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav id="mobile-nav" className="border-t border-line px-5 py-3 md:hidden" aria-label="Sections">
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="flex h-12 items-center text-lg"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}
      </header>

      <main id="top">
        <section className="bg-night text-paper">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-12 md:py-24">
            <div className="md:col-span-7">
              <p className="text-sm tracking-widest text-lilac uppercase">
                Portfolio · {profile.place}
              </p>
              <h1 className="display mt-4 text-6xl text-paper md:text-8xl">
                {profile.first}
                <br />
                {profile.last}
              </h1>
              <p className="mt-6 max-w-xl text-lg text-lilac">{intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#work" className="inline-flex h-12 items-center bg-lilac px-5 text-night">
                  See the work
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex h-12 items-center gap-2 border border-lilac px-5 text-paper"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Email Owen
                </a>
              </div>
              <dl className="mt-10 grid gap-6 border-t border-night-2 pt-6 sm:grid-cols-3">
                <div>
                  <dt className="text-xs tracking-wide text-lilac uppercase">Studying</dt>
                  <dd className="mt-1 text-sm">{profile.role}</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-wide text-lilac uppercase">Focus</dt>
                  <dd className="mt-1 text-sm">{profile.focus}</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-wide text-lilac uppercase">College</dt>
                  <dd className="mt-1 text-sm">Derby College</dd>
                </div>
              </dl>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-md md:col-span-5">
              <img
                src="/work/ouroboros.jpg"
                alt=""
                width={566}
                height={592}
                className="snake absolute inset-0 h-full w-full object-contain"
              />
              <img
                src="/work/mark-dm.jpg"
                alt="Personal badge: Owen Holbrook, D.M., with a pixel guitar and drum kit"
                width={888}
                height={918}
                className="absolute top-1/2 left-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              />
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-16 mx-auto max-w-6xl px-5 py-20">
          <div className="max-w-2xl">
            <p className="text-sm tracking-widest text-violet uppercase">Selected work</p>
            <h2 className="display mt-3 text-5xl text-night">Three things worth opening.</h2>
            <p className="mt-4 text-muted">
              An album-cover study, chinaware graphics from William Edwards, and my own marks.
              Click any image to see it large.
            </p>
          </div>

          <div className="mt-12 space-y-20">
            {projects.map((project, projectIndex) => (
              <article key={project.id} className="grid gap-8 border-t border-line pt-8 md:grid-cols-12">
                <div className="md:col-span-4">
                  <p className="font-display text-sm text-violet">{project.index}</p>
                  <h3 className="display mt-2 text-4xl text-night">{project.title}</h3>
                  <p className="mt-3 text-sm text-muted">
                    {project.kind} · {project.when}
                  </p>
                  <p className="mt-4">{project.summary}</p>
                  <p className="mt-3 text-sm text-muted">{project.note}</p>
                </div>
                <div
                  className={`grid gap-3 md:col-span-8 ${
                    project.shots.length > 1 ? "sm:grid-cols-2" : ""
                  }`}
                >
                  {project.shots.map((shot, shotIndex) => (
                    <button
                      key={shot.src}
                      type="button"
                      className={`group overflow-hidden bg-night text-left ${
                        project.shots.length === 3 && shotIndex === 0 ? "sm:col-span-2" : ""
                      }`}
                      onClick={() => setLightbox({ project: projectIndex, shot: shotIndex })}
                    >
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        className="h-full w-full object-contain"
                      />
                      <span className="flex items-center justify-between gap-3 px-3 py-3 text-sm text-lilac">
                        {shot.caption}
                        <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                      </span>
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="scroll-mt-16 border-t border-line bg-paper">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-sm tracking-widest text-violet uppercase">About</p>
              <h2 className="display mt-3 text-5xl text-night">Why this, and not something else.</h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-xl text-night">{about}</p>
              <p className="mt-4 text-muted">{profileBlurb}</p>
              <div className="mt-10 grid gap-8 sm:grid-cols-3">
                {strengths.map((item) => (
                  <div key={item.title}>
                    <h3 className="font-display text-2xl text-night">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="scroll-mt-16 bg-night text-paper">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="text-sm tracking-widest text-lilac uppercase">Experience and education</p>
            <h2 className="display mt-3 text-5xl">What is actually on the CV.</h2>
            <div className="mt-12 grid gap-14 md:grid-cols-2">
              <ol className="space-y-8">
                {experience.map((item) => (
                  <li key={item.title} className="border-t border-night-2 pt-5">
                    <p className="text-sm text-lilac">{item.when}</p>
                    <h3 className="mt-1 text-xl">{item.title}</h3>
                    <p className="text-sm text-lilac">{item.org}</p>
                    <p className="mt-2 text-sm text-paper">{item.body}</p>
                  </li>
                ))}
              </ol>
              <ol className="space-y-8">
                {education.map((item) => (
                  <li key={item.title} className="border-t border-night-2 pt-5">
                    <p className="text-sm text-lilac">{item.when}</p>
                    <h3 className="mt-1 text-xl">{item.title}</h3>
                    <p className="text-sm text-lilac">{item.org}</p>
                    <p className="mt-2 text-sm">{item.body}</p>
                  </li>
                ))}
                <li className="border-t border-night-2 pt-5">
                  <h3 className="text-xl">Other interests</h3>
                  <div className="mt-3 space-y-4">
                    {interests.map((item) => (
                      <p key={item.title} className="text-sm">
                        <span className="text-lilac">
                          {item.title} · {item.when}.{" "}
                        </span>
                        {item.body}
                      </p>
                    ))}
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section id="cv" className="scroll-mt-16 mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm tracking-widest text-violet uppercase">CV</p>
              <h2 className="display mt-3 text-5xl text-night">The short version.</h2>
            </div>
            <button
              type="button"
              className="no-print inline-flex h-12 items-center border border-ink px-5"
              onClick={() => window.print()}
            >
              Print this CV
            </button>
          </div>
          <p className="mt-4 max-w-2xl text-muted">
            Written out from my CV so it is easier to read. That draft was not finished. Please use
            the email on this site — an older copy listed a different one. My home address is left
            off on purpose.
          </p>

          <div className="mt-10 border border-line bg-paper p-6 md:p-10">
            <h3 className="font-display text-4xl text-night">{profile.name}</h3>
            <p className="mt-2 text-sm text-muted">
              {profile.phoneDisplay} · {profile.email} · {profile.place}
            </p>
            <p className="mt-6 max-w-3xl">{profileBlurb}</p>

            <h4 className="mt-10 font-display text-2xl text-night">Work</h4>
            <ul className="mt-3 space-y-4">
              {experience.map((item) => (
                <li key={item.title}>
                  <p className="text-sm text-muted">{item.when}</p>
                  <p>
                    {item.title} — {item.org}
                  </p>
                </li>
              ))}
            </ul>

            <h4 className="mt-8 font-display text-2xl text-night">Education</h4>
            <ul className="mt-3 space-y-4">
              {education.map((item) => (
                <li key={item.title}>
                  <p className="text-sm text-muted">{item.when}</p>
                  <p>
                    {item.title} — {item.org}
                  </p>
                  <p className="text-sm text-muted">{item.body}</p>
                </li>
              ))}
            </ul>

            <h4 className="mt-8 font-display text-2xl text-night">References</h4>
            <ul className="mt-3 space-y-2">
              {references.map((person) => (
                <li key={person.name}>
                  {person.name} — <span className="text-muted">{person.role}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-muted">Contact details available on request.</p>
          </div>
        </section>

        <section id="contact" className="scroll-mt-16 border-t border-line bg-violet text-paper">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2">
            <div>
              <p className="text-sm tracking-widest text-lilac uppercase">Contact</p>
              <h2 className="display mt-3 text-5xl">Looking for graphic design work.</h2>
              <p className="mt-4 max-w-md text-lilac">
                Digital multimedia student, based in Derby. Happy to show the work in person or talk
                through a brief.
              </p>
              <div className="mt-8 space-y-3">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-lg">
                  <Mail className="size-5" aria-hidden="true" />
                  {profile.email}
                </a>
                <a href={profile.phoneHref} className="flex items-center gap-3 text-lg">
                  <Phone className="size-5" aria-hidden="true" />
                  {profile.phoneDisplay}
                </a>
                <button
                  type="button"
                  className="inline-flex h-11 items-center gap-2 border border-lilac px-4 text-sm"
                  onClick={copyEmail}
                >
                  {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                  {copied ? "Copied" : "Copy email"}
                </button>
              </div>
            </div>

            <form className="no-print space-y-4" onSubmit={submitContact} noValidate>
              <div>
                <label htmlFor={`${formId}-name`} className="text-sm text-lilac">
                  Name
                </label>
                <input
                  id={`${formId}-name`}
                  name="name"
                  autoComplete="name"
                  className="mt-1 h-12 w-full border border-lilac bg-night px-3 text-paper"
                />
              </div>
              <div>
                <label htmlFor={`${formId}-email`} className="text-sm text-lilac">
                  Your email
                </label>
                <input
                  id={`${formId}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="mt-1 h-12 w-full border border-lilac bg-night px-3 text-paper"
                />
              </div>
              <div>
                <label htmlFor={`${formId}-message`} className="text-sm text-lilac">
                  Message
                </label>
                <textarea
                  id={`${formId}-message`}
                  name="message"
                  rows={5}
                  className="mt-1 w-full border border-lilac bg-night px-3 py-3 text-paper"
                />
              </div>
              {formError ? (
                <p className="text-sm text-lilac" role="alert">
                  {formError}
                </p>
              ) : null}
              {sentNote ? <p className="text-sm text-lilac">{sentNote}</p> : null}
              <button type="submit" className="inline-flex h-12 items-center bg-lilac px-5 text-night">
                Write the email
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-night px-5 py-8 text-sm text-lilac">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <p>Owen Holbrook · Digital multimedia · Derby</p>
          <a href="#top">Back to top</a>
        </div>
      </footer>

      {currentShot ? (
        <div
          className="no-print fixed inset-0 z-50 flex flex-col bg-night p-4 text-paper md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={currentShot.title}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-lilac">{currentShot.shot.caption}</p>
            <button
              type="button"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-lilac"
              onClick={() => setLightbox(null)}
            >
              <X aria-hidden="true" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <button
            type="button"
            className="flex min-h-0 flex-1 items-center justify-center py-4"
            aria-label="Close image"
            onClick={() => setLightbox(null)}
          >
            <img
              src={currentShot.shot.src}
              alt={currentShot.shot.alt}
              className="max-h-full max-w-full object-contain"
            />
          </button>
          <div className="flex justify-between gap-3">
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 border border-lilac px-3"
              onClick={() => shiftLightbox(-1)}
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
              Previous
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 border border-lilac px-3"
              onClick={() => shiftLightbox(1)}
            >
              Next
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
