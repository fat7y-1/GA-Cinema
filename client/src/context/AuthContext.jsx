import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { api } from "../api/client"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get("/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const signIn = useCallback(async (email, password) => {
    const data = await api.post("/auth/sign-in", { email, password })
    setUser(data.user)
    return data.user
  }, [])

  const signUp = useCallback(async (payload) => {
    const data = await api.post("/auth/sign-up", payload)
    return data.user
  }, [])

  const signOut = useCallback(async () => {
    await api.post("/auth/sign-out")
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
