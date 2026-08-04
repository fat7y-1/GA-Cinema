import { motion } from "framer-motion"

const BACKDROP =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"

export default function AuthShell({ title, subtitle, children, wide }) {
  return (
    <div
      className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-cover bg-center px-4 py-16"
      style={{
        backgroundImage: `linear-gradient(rgba(11,11,15,0.92), rgba(11,11,15,0.92)), url(${BACKDROP})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`card w-full ${wide ? "max-w-xl" : "max-w-md"} border-t-4 border-t-gold p-8 sm:p-10`}
      >
        <h1 className="text-center text-3xl text-gold">{title}</h1>
        {subtitle && <p className="mt-2 text-center text-sm text-white/50">{subtitle}</p>}
        <div className="mt-8">{children}</div>
      </motion.div>
    </div>
  )
}
