import { useState } from 'react'

function Navbar({ onAddPizzaToggle }) {
  const [showAdd, setShowAdd] = useState(false)

  const handleToggle = () => {
    const next = !showAdd
    setShowAdd(next)
    onAddPizzaToggle?.(next)
  }

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl">🍕</span>
          <span className="font-bold text-xl">Vaša Pizzeria</span>
        </a>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-700">
          <a href="#menu" className="hover:text-red-600">Menu</a>
          <a href="#order" className="hover:text-red-600">Objednávka</a>
          <a href="#contact" className="hover:text-red-600">Kontakt</a>
        </nav>
        <button onClick={handleToggle} className="text-xs px-3 py-1 rounded border border-gray-300 hover:bg-gray-50">Pridať pizzu</button>
      </div>
    </header>
  )
}

export default Navbar
