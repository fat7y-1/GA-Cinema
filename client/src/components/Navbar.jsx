import { Link, NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative py-1 text-sm font-medium tracking-wide text-white/80 transition hover:text-gold ${
          isActive ? "text-gold" : ""
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate("/")
  }

  return (
    <header className="glass sticky top-0 z-50 border-b border-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="font-display text-2xl tracking-widest text-gold">
          GA <span className="text-white">CINEMA</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <NavItem to="/">Now Showing</NavItem>
          {user && <NavItem to="/my-bookings">{user.isAdmin ? "Bookings" : "My Tickets"}</NavItem>}
          {user?.isAdmin && <NavItem to="/admin">Admin</NavItem>}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {!user ? (
            <>
              <Link to="/sign-in" className="text-sm font-medium text-white/80 hover:text-gold">
                Sign In
              </Link>
              <Link to="/sign-up" className="btn-outline !py-2 !px-4 text-xs">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/settings" className="text-sm text-white/60 hover:text-white">
                {user.first}
              </Link>
              <button onClick={handleSignOut} className="text-sm text-crimson/90 hover:text-crimson">
                Sign Out
              </button>
            </>
          )}
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 px-5 pb-5 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            <NavItem to="/" onClick={() => setOpen(false)}>
              Now Showing
            </NavItem>
            {user && (
              <NavItem to="/my-bookings" onClick={() => setOpen(false)}>
                {user.isAdmin ? "Bookings" : "My Tickets"}
              </NavItem>
            )}
            {user?.isAdmin && (
              <NavItem to="/admin" onClick={() => setOpen(false)}>
                Admin
              </NavItem>
            )}
            {!user ? (
              <div className="flex gap-3 pt-2">
                <Link to="/sign-in" className="btn-outline flex-1 !py-2 text-xs">
                  Sign In
                </Link>
                <Link to="/sign-up" className="btn-gold flex-1 !py-2 text-xs">
                  Sign Up
                </Link>
              </div>
            ) : (
              <button onClick={handleSignOut} className="btn-outline mt-2 !py-2 text-xs text-crimson">
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
