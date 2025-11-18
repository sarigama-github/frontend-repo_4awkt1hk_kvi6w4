import { useEffect, useState } from 'react'

function Menu() {
  const [pizzas, setPizzas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/pizzas`)
        const data = await res.json()
        setPizzas(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section id="menu" className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6">Menu</h2>
      {loading ? (
        <p>Načítavam ponuku…</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizzas.map(p => (
            <div key={p.id} className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
              {p.image && <img src={p.image} alt={p.name} className="h-40 w-full object-cover" />}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <span className="font-bold text-red-600">{p.price.toFixed(2)} €</span>
                </div>
                {p.description && <p className="text-sm text-gray-600 mt-1">{p.description}</p>}
                <div className="mt-2 flex gap-2 text-xs">
                  {p.vegetarian && <span className="px-2 py-1 bg-green-100 text-green-700 rounded">veg</span>}
                  {p.spicy && <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">pikant</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Menu
