import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function MovieCard({ movie, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
    >
      <Link
        to={`/movies/${movie._id}`}
        className="group card block overflow-hidden transition duration-300 hover:-translate-y-2 hover:border-gold/40"
      >
        <div className="relative aspect-[2/3] overflow-hidden bg-surface-2">
          <img
            src={movie.picture}
            alt={movie.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />
          <span className="absolute right-3 top-3 rounded bg-black/60 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-gold backdrop-blur">
            {movie.language}
          </span>
          <span className="absolute inset-x-3 bottom-3 translate-y-2 rounded-md bg-gold px-3 py-2 text-center text-xs font-bold uppercase tracking-wider text-black opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View Details
          </span>
        </div>
        <div className="p-4">
          <h3 className="truncate text-lg font-semibold text-white group-hover:text-gold">
            {movie.name}
          </h3>
          <p className="mt-1 text-xs text-white/40">
            {movie.Tickets > 0 ? `${movie.Tickets} tickets left` : "Sold out"}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
