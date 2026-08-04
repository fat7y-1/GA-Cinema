import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { api } from "../api/client"
import TrailerEmbed from "../components/TrailerEmbed"
import { Skeleton } from "../components/Skeleton"

export default function MovieDetails() {
  const { id } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => api.get(`/movies/${id}`),
  })

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Skeleton className="aspect-video w-full" />
      </div>
    )
  }

  if (isError || !data?.movie) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-3xl text-white">Movie not found</h1>
        <Link to="/" className="btn-gold mt-6 inline-flex">
          ← Back to Movies
        </Link>
      </div>
    )
  }

  const movie = data.movie

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <Link to="/" className="mb-6 inline-block text-sm text-white/50 hover:text-white">
        ← Back to Movies
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card flex flex-col overflow-hidden lg:flex-row"
      >
        <div className="lg:w-2/3">
          <TrailerEmbed embed={movie.trailVideo} />
        </div>

        <div className="flex flex-col p-8 lg:w-1/3">
          <h1 className="text-4xl text-white">{movie.name}</h1>

          <div className="my-6 border-y border-white/10 py-5">
            <span className="label">Language</span>
            <span className="text-white/80">{movie.language}</span>
          </div>

          <div className="mb-6">
            <span className="label">Synopsis</span>
            <p className="leading-relaxed text-white/60">{movie.description}</p>
          </div>

          <p
            className={`mb-6 text-lg font-bold ${
              movie.Tickets > 0 ? "text-success" : "text-crimson"
            }`}
          >
            {movie.Tickets > 0 ? `${movie.Tickets} tickets left` : "Sold out"}
          </p>

          {movie.Tickets > 0 ? (
            <Link to={`/movies/${movie._id}/book`} className="btn-gold mt-auto">
              Book Tickets Now
            </Link>
          ) : (
            <button className="btn-gold mt-auto" disabled>
              Sold Out
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
