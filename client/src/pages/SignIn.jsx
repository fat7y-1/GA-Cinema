import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useAuth } from "../context/AuthContext"
import FormField from "../components/FormField"
import AuthShell from "../components/AuthShell"

export default function SignIn() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      await signIn(form.email, form.password)
      toast.success("Welcome back!")
      navigate(location.state?.from?.pathname || "/")
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell title="Welcome Back" subtitle="Sign in to book your next premiere">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && (
          <p className="rounded-md border border-crimson/30 bg-crimson/10 px-4 py-3 text-sm text-crimson">
            {error}
          </p>
        )}

        <FormField
          label="Email Address"
          type="email"
          name="email"
          placeholder="email@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className="btn-gold mt-2" disabled={submitting}>
          {submitting ? "Signing in…" : "Enter"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-white/50">
        Don't have an account?{" "}
        <Link to="/sign-up" className="text-gold hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthShell>
  )
}
