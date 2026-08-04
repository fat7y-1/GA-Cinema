import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { api } from "../api/client"
import FormField from "../components/FormField"
import AuthShell from "../components/AuthShell"

const initial = { oldPassword: "", newPassword: "", confirmPassword: "" }

export default function Settings() {
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
      await api.put("/auth/password", form)
      toast.success("Password updated.")
      navigate("/")
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthShell title="Security Settings" subtitle="Change your password to keep your account safe">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && (
          <p className="rounded-md border border-crimson/30 bg-crimson/10 px-4 py-3 text-sm text-crimson">
            {error}
          </p>
        )}

        <FormField
          label="Current Password"
          type="password"
          name="oldPassword"
          placeholder="Enter current password"
          value={form.oldPassword}
          onChange={handleChange}
          required
        />
        <FormField
          label="New Password"
          type="password"
          name="newPassword"
          placeholder="New password"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <FormField
          label="Confirm New Password"
          type="password"
          name="confirmPassword"
          placeholder="Repeat new password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button className="btn-gold mt-2" disabled={submitting}>
          {submitting ? "Updating…" : "Update Password"}
        </button>
      </form>
    </AuthShell>
  )
}
