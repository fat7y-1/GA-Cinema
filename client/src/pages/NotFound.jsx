import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-5 text-center">
      <h1 className="font-display text-8xl text-gold">404</h1>
      <p className="mt-4 text-white/60">This scene didn't make the final cut.</p>
      <Link to="/" className="btn-gold mt-8">
        Back to Home
      </Link>
    </div>
  )
}
