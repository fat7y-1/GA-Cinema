import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useAuth } from "../context/AuthContext"
import FormField from "../components/FormField"
import AuthShell from "../components/AuthShell"

const initial = { first: "", last: "", email: "", password: "", confirmPassword: "" }

export default function SignUp() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(initial)
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      await signUp(form)
      toast.success("Account created! Please sign in.")
      navigate("/sign-in")
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell title="Join GA Cinema" subtitle="Be part of the family and catch the latest premieres" wide>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {error && (
          <p className="col-span-full rounded-md border border-crimson/30 bg-crimson/10 px-4 py-3 text-sm text-crimson">
            {error}
          </p>
        )}

        <FormField label="First Name" name="first" placeholder="John" value={form.first} onChange={handleChange} required />
        <FormField label="Last Name" name="last" placeholder="Doe" value={form.last} onChange={handleChange} required />
        <FormField
          className="sm:col-span-2"
          label="Email Address"
          type="email"
          name="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />
        <FormField
          className="sm:col-span-2"
          label="Password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
        />
        <FormField
          className="sm:col-span-2"
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button className="btn-gold sm:col-span-2 mt-2" disabled={submitting}>
          {submitting ? "Creating account…" : "Create Account"}
        </button>

        <p className="sm:col-span-2 text-center text-sm text-white/50">
          Already a member?{" "}
          <Link to="/sign-in" className="text-gold hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}
