import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { api } from "../api/client"
import SeatMap from "../components/SeatMap"
import { seatLabel } from "../utils/seat"

export default function ViewSeats() {
  const { id } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["seat-view", id],
    queryFn: () => api.get(`/seats/${id}/view`),
  })

  if (isLoading) return null
  if (isError || !data?.booking) {
    return <p className="mx-auto max-w-lg px-5 py-24 text-center text-white/50">Booking not found.</p>
  }

  const booking = data.booking
  const mine = booking.selectedSeats
  const taken = booking.movieId.seats.filter((s) => !mine.includes(s))

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <div className="card p-8">
        <h1 className="text-center text-3xl text-gold">{booking.name}</h1>
        <p className="mb-8 text-center text-white/40">Your Reserved Seating</p>

        <SeatMap taken={taken} mine={mine} />

        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/50">
            Your Ticket Numbers
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {mine.map((s) => (
              <span
                key={s}
                className="rounded-full bg-success px-3 py-1 text-sm font-bold text-black"
              >
                Seat {seatLabel(s)}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/my-bookings" className="text-sm font-bold text-gold hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
