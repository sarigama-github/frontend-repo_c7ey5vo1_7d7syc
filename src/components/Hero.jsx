import { useEffect, useState } from 'react'

export default function Hero() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const backend = import.meta.env.VITE_BACKEND_URL || ''

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const url = new URL('/api/products', backend)
        url.searchParams.set('limit', '8')
        const res = await fetch(url.toString())
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [backend])

  return (
    <section className="w-full">
      {/* Featured Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-tr from-gray-900 via-slate-800 to-emerald-700 blur-3xl opacity-20" />
          <div className="absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 blur-3xl opacity-20" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-black text-white px-4 py-1 text-sm font-medium">
                🐼 Panda Vapes
              </span>
              <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
                ELFBAR Moonlight 40K
              </h1>
              <p className="mt-4 text-gray-600 max-w-xl">
                Ultra-clean design. Silky draw. Giant puffs. A modern classic with a cool, moonlit finish.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#shop" className="rounded-xl bg-emerald-600 text-white px-5 py-3 font-semibold hover:bg-emerald-700 active:scale-[.99]">
                  Shop now
                </a>
                <a href="#details" className="rounded-xl bg-white text-gray-900 px-5 py-3 font-semibold border border-gray-200 hover:border-gray-300">
                  Learn more
                </a>
              </div>
            </div>

            {/* Graphic */}
            <div className="relative">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-lg rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-700 p-1 shadow-2xl">
                <div className="h-full w-full rounded-[1.35rem] bg-slate-950/40 backdrop-blur-sm grid place-items-center overflow-hidden">
                  {/* Abstract product silhouette */}
                  <div className="relative h-64 w-40 rounded-3xl bg-gradient-to-b from-slate-50 to-slate-200 shadow-xl">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-3 w-16 rounded-b-xl bg-slate-300" />
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-white/40" />
                  </div>

                  {/* Moon + stars */}
                  <svg viewBox="0 0 200 120" className="absolute inset-x-0 -top-3 mx-auto h-24 w-40 opacity-90">
                    <defs>
                      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#86efac" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="160" cy="40" r="26" fill="#e2f7f2" />
                    <circle cx="160" cy="40" r="60" fill="url(#glow)" />
                    {Array.from({ length: 18 }).map((_, i) => (
                      <circle key={i} cx={(i * 11) % 190} cy={(i * 7) % 110} r={(i % 3) + 1} fill="#a7f3d0" opacity="0.8" />
                    ))}
                  </svg>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-6 left-10 rotate-[-2deg] rounded-full bg-emerald-500/10 px-4 py-1 text-emerald-800 text-xs font-semibold ring-1 ring-emerald-500/30">
                40,000 puffs • Type-C • Smooth draw
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Arrivals */}
      <div id="shop" className="mx-auto max-w-7xl px-6 pb-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">New arrivals</h2>
          <a href="#" className="text-emerald-700 hover:text-emerald-800 font-medium">View all</a>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {loading && (
            <div className="col-span-full text-center text-gray-500">Loading products...</div>
          )}
          {!loading && items.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No products yet. Add some via the API.</div>
          )}
          {items.map((p) => (
            <div key={p._id} className="group rounded-2xl border border-gray-100 bg-white p-3 shadow-sm hover:shadow-md transition">
              <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                ) : (
                  <div className="h-full w-full grid place-items-center text-gray-300 text-sm">No Image</div>
                )}
              </div>
              <div className="mt-3">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{p.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-1">{p.brand} • {p.flavor}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm text-gray-500">{p.nicotine_strength}</div>
                  <div className="text-base font-bold text-gray-900">${p.price?.toFixed?.(2) ?? p.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
