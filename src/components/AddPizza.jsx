import { useState } from 'react'

function AddPizza({ open = false }) {
  const [form, setForm] = useState({ name: '', description: '', price: '', size: '33 cm', vegetarian: false, spicy: false, image: '' })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Ukladám...')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/pizzas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          description: form.description || null,
          price: parseFloat(form.price || '0'),
          size: form.size,
          vegetarian: !!form.vegetarian,
          spicy: !!form.spicy,
          image: form.image || null
        })
      })
      if (!res.ok) throw new Error('Chyba pri ukladaní')
      setStatus('✅ Pridané! Obnovte menu na zobrazenie.')
      setForm({ name: '', description: '', price: '', size: '33 cm', vegetarian: false, spicy: false, image: '' })
    } catch (e) {
      setStatus('❌ Nepodarilo sa uložiť')
    }
  }

  if (!open) return null

  return (
    <section className="max-w-6xl mx-auto px-4 pb-8">
      <div className="bg-white border border-black/5 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Pridať pizzu</h3>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Názov</label>
            <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full border rounded px-3 py-2"/>
          </div>
          <div>
            <label className="block text-sm font-medium">Cena (€)</label>
            <input name="price" value={form.price} onChange={handleChange} required type="number" step="0.01" className="mt-1 w-full border rounded px-3 py-2"/>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Popis</label>
            <input name="description" value={form.description} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2"/>
          </div>
          <div>
            <label className="block text-sm font-medium">Veľkosť</label>
            <input name="size" value={form.size} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2"/>
          </div>
          <div>
            <label className="block text-sm font-medium">Obrázok URL</label>
            <input name="image" value={form.image} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2"/>
          </div>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="vegetarian" checked={form.vegetarian} onChange={handleChange}/>
              <span>Vegetariánska</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="spicy" checked={form.spicy} onChange={handleChange}/>
              <span>Pikantná</span>
            </label>
          </div>
          <div className="md:col-span-2 flex items-center gap-3">
            <button className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700">Uložiť</button>
            <span className="text-sm text-gray-600">{status}</span>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddPizza
