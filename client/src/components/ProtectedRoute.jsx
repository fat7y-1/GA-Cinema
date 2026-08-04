import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return null
  if (!user) return <Navigate to="/sign-in" state={{ from: location }} replace />
  return <Outlet />
}

export function AdminRoute() {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user?.isAdmin) return <Navigate to="/" replace />
  return <Outlet />
}
