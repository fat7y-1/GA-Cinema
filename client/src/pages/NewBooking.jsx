import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { api } from "../api/client"
import FormField from "../components/FormField"
import AuthShell from "../components/AuthShell"

export default function NewBooking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tickets, setTickets] = useState(1)
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => api.get(`/movies/${id}`),
  })

  const movie = data?.movie

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      const { booking } = await api.post(`/bookings/${id}`, { userTicket: tickets })
      toast.success("Booking created — now pick your seats!")
      navigate(`/bookings/${booking._id}/seats`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading || !movie) return null

  return (
    <AuthShell title="Confirm Booking">
      <p className="mb-6 text-center text-sm text-white/60">
        Movie: <strong className="text-white">{movie.name}</strong>
        <br />
        Available Seats: <span className="text-success">{movie.Tickets}</span>
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && (
          <p className="rounded-md border border-crimson/30 bg-crimson/10 px-4 py-3 text-sm text-crimson">
            {error}
          </p>
        )}

        <FormField
          label="How many tickets?"
          type="number"
          min={1}
          max={movie.Tickets}
          value={tickets}
          onChange={(e) => setTickets(Number(e.target.value))}
          required
        />

        <button className="btn-gold" disabled={submitting}>
          {submitting ? "Booking…" : "Confirm & Choose Seats"}
        </button>
        <Link to={`/movies/${id}`} className="text-center text-sm text-white/40 hover:text-crimson">
          Cancel and go back
        </Link>
      </form>
    </AuthShell>
  )
}
