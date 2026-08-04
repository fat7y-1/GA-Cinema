import { Link, NavLink, Outlet } from "react-router-dom"

const links = [
  { to: "/admin", label: "Movie Inventory", icon: "🎬", end: true },
  { to: "/admin/new", label: "Add New Movie", icon: "➕" },
  { to: "/my-bookings", label: "Customer Bookings", icon: "🎟️" },
]

export default function AdminLayout() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row">
      <aside className="lg:w-64 lg:shrink-0">
        <div className="card sticky top-24 p-5">
          <h2 className="mb-1 font-display text-2xl tracking-widest text-gold">ADMIN PANEL</h2>
          <p className="mb-5 text-xs text-white/40">Manage your cinema</p>

          <nav className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-gold/15 text-gold"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <span>{l.icon}</span>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/"
            className="mt-5 block text-center text-xs font-semibold text-white/40 hover:text-white"
          >
            ← Return to Public Site
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  )
}
