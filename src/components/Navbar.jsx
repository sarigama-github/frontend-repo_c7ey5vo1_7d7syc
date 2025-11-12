export default function Navbar() {
  return (
    <header className="w-full">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-600 grid place-items-center text-white text-xl">🐼</div>
          <div className="text-xl font-bold tracking-tight">Panda Vapes</div>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-gray-600">
          <a href="#" className="hover:text-gray-900">Home</a>
          <a href="#flavors" className="hover:text-gray-900">Flavors</a>
          <a href="#brands" className="hover:text-gray-900">Brands</a>
          <a href="#contact" className="hover:text-gray-900">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50">Sign in</button>
          <button className="rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm font-semibold hover:bg-emerald-700">Cart (0)</button>
        </div>
      </div>
    </header>
  )
}
