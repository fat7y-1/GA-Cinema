import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { api } from "../api/client"
import HeroBanner from "../components/HeroBanner"
import MovieCard from "../components/MovieCard"
import { MovieGridSkeleton } from "../components/Skeleton"

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: () => api.get("/movies"),
  })

  const movies = data?.movies ?? []

  return (
    <div>
      {!isLoading && movies.length > 0 && <HeroBanner movies={movies} />}

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-end justify-between"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">In Theaters</span>
            <h2 className="mt-1 text-3xl text-white sm:text-4xl">Now Showing</h2>
          </div>
        </motion.div>

        {isLoading && <MovieGridSkeleton />}

        {isError && (
          <p className="rounded-xl border border-crimson/30 bg-crimson/10 p-6 text-center text-white/70">
            Couldn't load movies right now. Please try again shortly.
          </p>
        )}

        {!isLoading && !isError && movies.length === 0 && (
          <p className="rounded-xl border border-white/10 bg-surface p-12 text-center text-white/50">
            No movies are playing yet. Check back soon.
          </p>
        )}

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map((movie, i) => (
            <MovieCard key={movie._id} movie={movie} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
