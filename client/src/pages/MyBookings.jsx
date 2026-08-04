import { useState } from "react"
import { Link } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { api } from "../api/client"
import { useAuth } from "../context/AuthContext"
import Badge from "../components/Badge"
import { ConfirmModal } from "../components/Modal"
import { Skeleton } from "../components/Skeleton"

export default function MyBookings() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [cancelTarget, setCancelTarget] = useState(null)
  const [cancelling, setCancelling] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => api.get("/bookings"),
  })

  const bookings = data?.bookings ?? []

  const handleCancel = async () => {
    setCancelling(true)
    try {
      await api.delete(`/bookings/${cancelTarget._id}`)
      toast.success("Booking cancelled.")
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
    } catch (err) {
      toast.error(err.message)
    } finally {
      setCancelling(false)
      setCancelTarget(null)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
      <header className="mb-8 border-b-2 border-gold/60 pb-5">
        <h1 className="text-3xl text-white">
          {user?.isAdmin ? "Customer Bookings" : "My Movie Tickets"}
        </h1>
      </header>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      )}

      {!isLoading && bookings.length === 0 && (
        <div className="card p-16 text-center">
          <h3 className="text-xl text-white">No bookings found.</h3>
          <p className="mt-1 text-white/40">Ready for a movie night?</p>
          <Link to="/" className="btn-gold mt-6 inline-flex">
            Browse Movies
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {bookings.map((item) => (
          <div
            key={item._id}
            className="card flex flex-col items-start gap-5 p-5 transition hover:border-l-4 hover:border-l-gold sm:flex-row sm:items-center"
          >
            <img
              src={item.picture}
              alt={item.name}
              className="h-28 w-20 rounded-md object-cover"
            />

            <div className="flex-1">
              <div className="mb-2">
                {!item.isDone ? (
                  <Badge variant="pending">Action Required: Pick Seats</Badge>
                ) : (
                  <Badge variant="confirmed">Confirmed</Badge>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gold">{item.name}</h3>
              <p className="text-sm text-white/50">Tickets: {item.userTicket}</p>
              <p className="text-sm text-white/50">
                Booked on: {new Date(item.createdAt).toLocaleDateString()}
              </p>
              {user?.isAdmin && item.user && (
                <p className="text-sm text-sky-400">
                  User: {item.user.first} ({item.user.email})
                </p>
              )}
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-40">
              {!item.isDone ? (
                <>
                  <Link to={`/bookings/${item._id}/seats`} className="btn-gold !py-2 text-xs">
                    Select Seats
                  </Link>
                  <button
                    className="btn-outline !py-2 text-xs !border-danger text-danger hover:!bg-danger hover:!text-white"
                    onClick={() => setCancelTarget(item)}
                  >
                    Cancel Order
                  </button>
                </>
              ) : (
                <>
                  <Link to={`/bookings/${item._id}/seats/view`} className="btn-outline !py-2 text-xs">
                    {user?.isAdmin ? "Customer Seats" : "View My Seats"}
                  </Link>
                  <button
                    className="btn-outline !py-2 text-xs !border-danger text-danger hover:!bg-danger hover:!text-white"
                    onClick={() => setCancelTarget(item)}
                  >
                    Cancel Booking
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        open={!!cancelTarget}
        title="Cancel booking?"
        message={`This will cancel your booking for "${cancelTarget?.name}". This can't be undone.`}
        confirmLabel={cancelling ? "Cancelling…" : "Yes, Cancel"}
        danger
        onConfirm={handleCancel}
        onCancel={() => setCancelTarget(null)}
      />
    </div>
  )
}
