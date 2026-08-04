import { useState } from "react"
import { Link } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { api } from "../../api/client"
import { ConfirmModal } from "../../components/Modal"
import { Skeleton } from "../../components/Skeleton"

export default function AdminMovies() {
  const queryClient = useQueryClient()
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: () => api.get("/movies"),
  })

  const movies = data?.movies ?? []

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await api.delete(`/admin/movies/${deleteTarget._id}`)
      toast.success("Movie deleted.")
      queryClient.invalidateQueries({ queryKey: ["movies"] })
    } catch (err) {
      toast.error(err.message)
    } finally {
      setDeleting(false)
      setDeleteTarget(null)
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between border-b-2 border-white/10 pb-5">
        <h1 className="text-2xl text-white">Movie Inventory</h1>
        <Link to="/admin/new" className="btn-gold !py-2 text-sm">
          + Add New Movie
        </Link>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      )}

      {!isLoading && movies.length === 0 && (
        <div className="card p-24 text-center">
          <h2 className="text-xl text-white">No movies available</h2>
          <p className="mt-1 text-white/40">Your cinema is currently empty.</p>
        </div>
      )}

      {!isLoading && movies.length > 0 && (
        <div className="card overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr className="bg-surface-2 text-left text-xs uppercase tracking-wide text-gold">
                <th className="p-4">Poster</th>
                <th className="p-4">Title &amp; Language</th>
                <th className="p-4">Tickets</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id} className="border-t border-white/5 hover:bg-white/[0.03]">
                  <td className="p-4">
                    <img src={movie.picture} alt="" className="h-20 w-14 rounded object-cover" />
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-white">{movie.name}</div>
                    <div className="text-sm text-white/40">{movie.language}</div>
                  </td>
                  <td className="p-4">
                    <span className="rounded bg-white/5 px-2 py-1 text-sm font-bold text-success">
                      {movie.Tickets} left
                    </span>
                  </td>
                  <td className="w-40 p-4">
                    <div className="flex flex-col gap-2">
                      <Link to={`/admin/movies/${movie._id}/edit`} className="btn-gold !py-2 text-xs">
                        Edit
                      </Link>
                      <button
                        className="btn-outline !border-danger !py-2 text-xs text-danger hover:!bg-danger hover:!text-white"
                        onClick={() => setDeleteTarget(movie)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete movie?"
        message={`"${deleteTarget?.name}" will be permanently removed.`}
        confirmLabel={deleting ? "Deleting…" : "Delete"}
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
