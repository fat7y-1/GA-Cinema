const TMDB_BASE = "https://api.themoviedb.org/3"
const POSTER_BASE = "https://image.tmdb.org/t/p/w500"
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"

const LANGUAGE_NAMES = {
  en: "English",
  fr: "French",
  es: "Spanish",
  de: "German",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  hi: "Hindi",
  ar: "Arabic",
  ru: "Russian",
  pt: "Portuguese",
  tr: "Turkish",
  nl: "Dutch",
  sv: "Swedish",
}

const languageName = (code) => LANGUAGE_NAMES[code] || (code ? code.toUpperCase() : "English")

const tmdbFetch = async (path) => {
  const apiKey = process.env.TMDB_API_KEY
  if (!apiKey) {
    const err = new Error(
      "TMDB search isn't configured yet — add TMDB_API_KEY to your .env (see .env.example)."
    )
    err.status = 501
    throw err
  }
  const separator = path.includes("?") ? "&" : "?"
  const res = await fetch(`${TMDB_BASE}${path}${separator}api_key=${apiKey}`)
  if (!res.ok) {
    const err = new Error("TMDB request failed.")
    err.status = res.status === 401 ? 502 : res.status
    throw err
  }
  return res.json()
}

const search = async (req, res) => {
  try {
    const query = (req.query.q || "").trim()
    if (!query) {
      return res.json({ results: [] })
    }

    const data = await tmdbFetch(`/search/movie?query=${encodeURIComponent(query)}&include_adult=false`)

    const results = data.results
      .filter((m) => m.poster_path)
      .slice(0, 12)
      .map((m) => ({
        tmdbId: m.id,
        title: m.title,
        year: m.release_date ? m.release_date.slice(0, 4) : "—",
        posterUrl: `${POSTER_BASE}${m.poster_path}`,
      }))

    res.json({ results })
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
  }
}

const getMovie = async (req, res) => {
  try {
    const data = await tmdbFetch(`/movie/${req.params.id}?append_to_response=videos`)

    const trailer = (data.videos?.results || []).find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    )

    const trailVideo = trailer
      ? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" title="${data.title} trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
      : ""

    res.json({
      movie: {
        name: data.title,
        description: data.overview,
        language: languageName(data.original_language),
        picture: data.poster_path ? `${POSTER_BASE}${data.poster_path}` : "",
        backdrop: data.backdrop_path ? `${BACKDROP_BASE}${data.backdrop_path}` : "",
        trailVideo,
      },
    })
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message })
  }
}

module.exports = { search, getMovie }
