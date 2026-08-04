import { useState } from "react"
import FormField from "./FormField"

const empty = {
  name: "",
  picture: "",
  backdrop: "",
  trailVideo: "",
  description: "",
  language: "",
  Tickets: 72,
}

export default function MovieForm({ initialValues, submitLabel, onSubmit }) {
  const [form, setForm] = useState({ ...empty, ...initialValues })
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: name === "Tickets" ? Number(value) : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      await onSubmit(form)
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <p className="rounded-md border border-crimson/30 bg-crimson/10 px-4 py-3 text-sm text-crimson">
          {error}
        </p>
      )}

      <FormField label="Movie Title" name="name" placeholder="Title of movie" value={form.name} onChange={handleChange} required />

      <div className="flex gap-4">
        <div className="flex-1">
          <FormField label="Poster Image URL" name="picture" placeholder="Image URL (portrait, e.g. 2:3)" value={form.picture} onChange={handleChange} required />
          <span className="mt-1 block text-xs text-white/30">Used on movie cards &amp; the details page.</span>
        </div>
        {form.picture && (
          <img
            src={form.picture}
            alt="Poster preview"
            className="h-24 w-16 shrink-0 rounded-md border border-white/10 object-cover"
            onError={(e) => (e.currentTarget.style.visibility = "hidden")}
            onLoad={(e) => (e.currentTarget.style.visibility = "visible")}
          />
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <FormField
            label="Backdrop Image URL (optional)"
            name="backdrop"
            placeholder="Wide landscape image for the homepage hero"
            value={form.backdrop}
            onChange={handleChange}
          />
          <span className="mt-1 block text-xs text-white/30">
            A wide (16:9-ish) image for the homepage hero banner. If left blank, the poster is used instead
            (blurred in the background) — a real backdrop looks much better.
          </span>
        </div>
        {form.backdrop && (
          <img
            src={form.backdrop}
            alt="Backdrop preview"
            className="h-24 w-40 shrink-0 rounded-md border border-white/10 object-cover"
            onError={(e) => (e.currentTarget.style.visibility = "hidden")}
            onLoad={(e) => (e.currentTarget.style.visibility = "visible")}
          />
        )}
      </div>

      <div>
        <FormField
          as="textarea"
          rows={4}
          label="Trailer Embed Code"
          name="trailVideo"
          placeholder="Paste the full YouTube embed <iframe> code"
          value={form.trailVideo}
          onChange={handleChange}
        />
        <span className="mt-1 block text-xs text-white/30">
          Paste the full "Embed" code from YouTube for best results.
        </span>
      </div>
      <FormField
        as="textarea"
        rows={5}
        label="Description"
        name="description"
        placeholder="Enter movie plot…"
        value={form.description}
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-2 gap-5">
        <FormField label="Language" name="language" placeholder="English" value={form.language} onChange={handleChange} required />
        <FormField
          label="Total Tickets"
          type="number"
          name="Tickets"
          min={1}
          max={72}
          value={form.Tickets}
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn-gold mt-2" disabled={submitting}>
        {submitting ? "Saving…" : submitLabel}
      </button>
    </form>
  )
}
