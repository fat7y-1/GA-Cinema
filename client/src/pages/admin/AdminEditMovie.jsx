import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { api } from "../../api/client"
import MovieForm from "../../components/MovieForm"
import TmdbSearch from "../../components/TmdbSearch"
import { Skeleton } from "../../components/Skeleton"

export default function AdminEditMovie() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [override, setOverride] = useState(null)
  const [formKey, setFormKey] = useState(0)

  const { data, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => api.get(`/movies/${id}`),
  })

  const handlePick = (movie) => {
    // Keep the current ticket stock — TMDB has no notion of it.
    setOverride({ ...movie, Tickets: data.movie.Tickets })
    setFormKey((k) => k + 1)
  }

  const handleSubmit = async (form) => {
    await api.put(`/admin/movies/${id}`, form)
    toast.success("Movie updated.")
    queryClient.invalidateQueries({ queryKey: ["movies"] })
    queryClient.invalidateQueries({ queryKey: ["movie", id] })
    navigate("/admin")
  }

  if (isLoading) {
    return (
      <div className="card mx-auto max-w-xl p-8">
        <Skeleton className="h-8 w-1/2 mx-auto mb-6" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  if (!data?.movie) return null

  const values = override || data.movie

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <TmdbSearch onPick={handlePick} />

      <div className="card border-t-4 border-t-gold p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl uppercase tracking-wide text-gold">Update Movie</h1>
          <img src={values.picture} alt="" className="h-16 w-11 rounded border-2 border-white/10 object-cover" />
        </div>
        <MovieForm key={formKey} initialValues={values} submitLabel="Save Changes" onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
