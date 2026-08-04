import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import { api } from "../../api/client"
import MovieForm from "../../components/MovieForm"
import TmdbSearch from "../../components/TmdbSearch"

export default function AdminAddMovie() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [prefill, setPrefill] = useState(null)
  const [formKey, setFormKey] = useState(0)

  const handlePick = (movie) => {
    setPrefill(movie)
    setFormKey((k) => k + 1)
  }

  const handleSubmit = async (form) => {
    await api.post("/admin/movies", form)
    toast.success("Movie added.")
    queryClient.invalidateQueries({ queryKey: ["movies"] })
    navigate("/admin")
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <TmdbSearch onPick={handlePick} />

      <div className="card border-t-4 border-t-gold p-8">
        <h1 className="mb-6 text-center text-2xl uppercase tracking-wide text-gold">
          🎬 Add New Movie
        </h1>
        <MovieForm key={formKey} initialValues={prefill} submitLabel="Create Movie" onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
