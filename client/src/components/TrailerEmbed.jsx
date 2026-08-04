export default function TrailerEmbed({ embed }) {
  if (!embed) {
    return (
      <div className="flex aspect-video w-full items-center justify-center bg-black text-white/30">
        No trailer available
      </div>
    )
  }

  return (
    <div
      className="[&>iframe]:aspect-video [&>iframe]:h-full [&>iframe]:w-full aspect-video w-full bg-black"
      dangerouslySetInnerHTML={{ __html: embed }}
    />
  )
}
