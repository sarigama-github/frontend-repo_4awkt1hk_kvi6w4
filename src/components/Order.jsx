import { useState } from 'react'

function Order() {
  const [cart, setCart] = useState([])
  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '' })
  const [status, setStatus] = useState('')

  const addItem = (name, price) => {
    setCart(prev => {
      const exist = prev.find(i => i.name === name)
      if (exist) return prev.map(i => i.name === name ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { name, price, quantity: 1 }]
    })
  }

  const removeItem = (name) => {
    setCart(prev => prev.filter(i => i.name !== name))
  }

  const changeQty = (name, delta) => {
    setCart(prev => prev.map(i => i.name === name ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i))
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (cart.length === 0) return
    setStatus('Odosielam objednávku...')

    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const items = cart.map(i => ({ pizza_id: 'manual', name: i.name, price: i.price, quantity: i.quantity }))
      const res = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.name,
          phone: form.phone,
          address: form.address,
          note: form.note || null,
          items,
          total
        })
      })
      if (!res.ok) throw new Error('Chyba pri odosielaní')
      setStatus('✅ Objednávka prijatá! Budeme volať na potvrdenie.')
      setCart([])
      setForm({ name: '', phone: '', address: '', note: '' })
    } catch (e) {
      setStatus('❌ Nepodarilo sa odoslať')
    }
  }

  return (
    <section id="order" className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6">Objednávka</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-black/5 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Košík</h3>
          {cart.length === 0 ? (
            <p className="text-sm text-gray-600">Zatiaľ žiadne položky.</p>
          ) : (
            <ul className="space-y-3">
              {cart.map(i => (
                <li key={i.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{i.name}</p>
                    <p className="text-sm text-gray-600">{i.quantity} × {i.price.toFixed(2)} €</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => changeQty(i.name, -1)} className="px-2 py-1 border rounded">-</button>
                    <button onClick={() => changeQty(i.name, +1)} className="px-2 py-1 border rounded">+</button>
                    <button onClick={() => removeItem(i.name)} className="px-3 py-1 border rounded text-red-600">Odstrániť</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex items-center justify-between font-semibold">
            <span>Spolu</span>
            <span>{total.toFixed(2)} €</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-black/5 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Dodacie údaje</h3>
          <div className="grid gap-4">
            <input placeholder="Meno a priezvisko" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full border rounded px-3 py-2" />
            <input placeholder="Telefón" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required className="w-full border rounded px-3 py-2" />
            <input placeholder="Adresa" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required className="w-full border rounded px-3 py-2" />
            <input placeholder="Poznámka (voliteľné)" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} className="w-full border rounded px-3 py-2" />
            <button disabled={cart.length===0} className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50">Odoslať objednávku</button>
            <span className="text-sm text-gray-600">{status}</span>
          </div>
        </form>
      </div>

      <div className="mt-8 text-sm text-gray-600">
        <p>Tip: Kliknite na názvy pízz v menu, aby ste ich pridali do košíka.</p>
      </div>
    </section>
  )
}

export default Order
