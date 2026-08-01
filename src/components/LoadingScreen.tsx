export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-night-950 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-14 h-14 border-4 border-night-700 border-t-neon rounded-full animate-spin mx-auto" />
        <p className="text-slate-400 text-sm font-mono">Cargando...</p>
      </div>
    </div>
  )
}
