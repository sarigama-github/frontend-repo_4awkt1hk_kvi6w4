function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-100 via-white to-white" />
      <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Pravá talianska pizza v srdci mesta
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Ručne vyťahané cesto, paradajkový základ San Marzano a pec na drevo. Objednajte si online alebo sa zastavte.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#menu" className="inline-flex items-center px-5 py-3 rounded-md bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition-colors">
              Pozrieť menu
            </a>
            <a href="#order" className="inline-flex items-center px-5 py-3 rounded-md border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50">
              Objednať teraz
            </a>
          </div>
        </div>
        <div className="md:justify-self-end">
          <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxQaXp6YXxlbnwwfDB8fHwxNzYzNDg0ODE5fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Pizza" className="w-full max-w-md rounded-xl shadow-lg"/>
        </div>
      </div>
    </section>
  )
}

export default Hero
