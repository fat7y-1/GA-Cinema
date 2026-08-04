import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import Layout from "./components/Layout"
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute"

import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Settings from "./pages/Settings"
import NewBooking from "./pages/NewBooking"
import SeatSelection from "./pages/SeatSelection"
import ViewSeats from "./pages/ViewSeats"
import MyBookings from "./pages/MyBookings"
import NotFound from "./pages/NotFound"

import AdminLayout from "./pages/admin/AdminLayout"
import AdminMovies from "./pages/admin/AdminMovies"
import AdminAddMovie from "./pages/admin/AdminAddMovie"
import AdminEditMovie from "./pages/admin/AdminEditMovie"

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#16161D",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.08)",
          },
          success: { iconTheme: { primary: "#F5C518", secondary: "#000" } },
          error: { iconTheme: { primary: "#ff4d4d", secondary: "#000" } },
        }}
      />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/settings" element={<Settings />} />
            <Route path="/movies/:id/book" element={<NewBooking />} />
            <Route path="/bookings/:id/seats" element={<SeatSelection />} />
            <Route path="/bookings/:id/seats/view" element={<ViewSeats />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminMovies />} />
              <Route path="new" element={<AdminAddMovie />} />
              <Route path="movies/:id/edit" element={<AdminEditMovie />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
