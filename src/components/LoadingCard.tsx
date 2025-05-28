export default function LoadingCard() {
  return (
    <div className="bg-[rgb(var(--background-darker-rgb))] rounded-xl p-4 sm:p-6 border border-zinc-800 animate-pulse">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-zinc-800"></div>
        <div className="flex-1 space-y-2 sm:space-y-3">
          <div className="h-3 sm:h-4 bg-zinc-800 rounded w-3/4"></div>
          <div className="h-2.5 sm:h-3 bg-zinc-800 rounded w-full"></div>
          <div className="h-2.5 sm:h-3 bg-zinc-800 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  )
} 