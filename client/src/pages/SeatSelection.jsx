import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { api } from "../api/client"
import SeatMap from "../components/SeatMap"

export default function SeatSelection() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const { data, isLoading, isError } = useQuery({
    queryKey: ["seat-selection", id],
    queryFn: () => api.get(`/seats/${id}`),
  })

  if (isLoading) return null
  if (isError || !data?.booking) {
    return <p className="mx-auto max-w-lg px-5 py-24 text-center text-white/50">Booking not found.</p>
  }

  const booking = data.booking
  const limit = booking.userTicket
  const taken = booking.movieId.seats

  const toggle = (i) => {
    setSelected((prev) => {
      if (prev.includes(i)) return prev.filter((s) => s !== i)
      if (prev.length >= limit) {
        toast.error(`You can only select ${limit} seat(s).`)
        return prev
      }
      return [...prev, i]
    })
  }

  const confirm = async () => {
    if (selected.length < limit) {
      toast.error(`Please select ${limit} seat(s).`)
      return
    }
    setSubmitting(true)
    try {
      await api.post(`/seats/${id}`, { seats: selected })
      toast.success("Seats saved!")
      navigate("/my-bookings")
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <div className="card p-8">
        <h1 className="text-center text-3xl text-white">Choose Your Seats</h1>
        <p className="mb-8 text-center text-white/40">{booking.movieId.name}</p>

        <SeatMap taken={taken} selected={selected} onToggle={toggle} interactive />

        <p className="mt-8 text-center text-white/50">
          Selected <span className="font-bold text-gold">{selected.length}</span> / {limit}
        </p>

        <div className="mt-6 flex justify-center">
          <button className="btn-gold" onClick={confirm} disabled={submitting}>
            {submitting ? "Saving…" : "Confirm Selection"}
          </button>
        </div>
      </div>
    </div>
  )
}
