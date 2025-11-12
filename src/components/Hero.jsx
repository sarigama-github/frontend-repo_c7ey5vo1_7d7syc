import { useState, useEffect } from 'react'

export default function Hero() {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const backend = import.meta.env.VITE_BACKEND_URL || ''

  async function search() {
    setLoading(true)
    try {
      const url = new URL('/api/products', backend)
      if (query) url.searchParams.set('search', query)
      url.searchParams.set('limit', '12')
      const res = await fetch(url.toString())
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    search()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-6">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-emerald-700 text-sm font-medium">
            🐼 Panda Vapes
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
            Clean, smooth disposable vapes
          </h1>
          <p className="mt-4 max-w-2xl text-gray-600">
            Discover top flavors and brands. Fast shipping. Great prices.
          </p>

          <div className="mt-8 w-full max-w-2xl flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search flavors, brands, puffs..."
              className="flex-1 rounded-xl border border-gray-200 bg-white/80 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={search}
              className="rounded-xl bg-emerald-600 text-white px-5 py-3 font-semibold hover:bg-emerald-700 active:scale-[.99]"
            >
              Search
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && (
            <div className="col-span-full text-center text-gray-500">Loading products...</div>
          )}
          {!loading && items.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No products yet. Add some via the API.</div>
          )}
          {items.map((p) => (
            <div key={p._id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full grid place-items-center text-gray-400">No Image</div>
                )}
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{p.title}</h3>
                  <p className="text-sm text-gray-500">{p.brand} • {p.flavor}</p>
                  <p className="text-xs text-gray-400">{p.nicotine_strength}{p.puff_count ? ` • ${p.puff_count} puffs` : ''}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">${p.price?.toFixed?.(2) ?? p.price}</div>
                  <div className="text-xs text-emerald-600">{p.in_stock ? 'In stock' : 'Out of stock'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
