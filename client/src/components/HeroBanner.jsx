import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

export default function HeroBanner({ movies }) {
  const featured = movies.slice(0, 5)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (featured.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % featured.length), 6000)
    return () => clearInterval(id)
  }, [featured.length])

  if (featured.length === 0) return null
  const movie = featured[index]
  const hasBackdrop = Boolean(movie.backdrop)
  const bgImage = movie.backdrop || movie.picture

  return (
    <section className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
      {/* Ambient background: a real backdrop is shown crisp; a poster fallback is blurred so its
          portrait crop never reads as an ugly zoomed-in crop. */}
      <AnimatePresence mode="sync">
        <motion.div
          key={movie._id}
          initial={{ opacity: 0, scale: hasBackdrop ? 1.06 : 1.15 }}
          animate={{ opacity: 1, scale: hasBackdrop ? 1 : 1.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`absolute inset-0 bg-cover bg-center ${hasBackdrop ? "" : "blur-2xl"}`}
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/40 to-transparent" />

      <div className="relative mx-auto flex h-full max-w-7xl items-end gap-8 px-5 pb-16 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.img
            key={movie._id + "-poster"}
            src={movie.picture}
            alt={movie.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden aspect-[2/3] w-40 shrink-0 rounded-xl object-cover shadow-2xl ring-1 ring-white/10 sm:block lg:w-52"
          />
        </AnimatePresence>

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={movie._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <span className="mb-3 inline-block rounded border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold">
                Now Showing
              </span>
              <h1 className="font-display text-5xl leading-none text-white drop-shadow-lg sm:text-7xl">
                {movie.name}
              </h1>
              <p className="mt-4 line-clamp-3 max-w-xl text-white/70">{movie.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to={`/movies/${movie._id}`} className="btn-gold">
                  ▶ Watch Trailer
                </Link>
                <Link to={`/movies/${movie._id}`} className="btn-outline">
                  Book Tickets
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {featured.length > 1 && (
            <div className="flex gap-2">
              {featured.map((m, i) => (
                <button
                  key={m._id}
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${m.name}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-10 bg-gold" : "w-4 bg-white/25 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
