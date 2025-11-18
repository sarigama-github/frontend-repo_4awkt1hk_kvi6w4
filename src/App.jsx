import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import AddPizza from './components/AddPizza'
import Order from './components/Order'

function App() {
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
      <Navbar onAddPizzaToggle={setShowAdd} />
      <Hero />
      <AddPizza open={showAdd} />
      <Menu />
      <Order />

      <footer id="contact" className="mt-12 border-t border-black/5 bg-white/70">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">Kontakt</h4>
            <p>Telefón: +421 900 123 456</p>
            <p>Email: info@pizzeria.sk</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Otváracie hodiny</h4>
            <p>Pon - Pia: 11:00 - 22:00</p>
            <p>Sob - Ned: 12:00 - 23:00</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Adresa</h4>
            <p>Hlavná 123</p>
            <p>Bratislava</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
