export default function Hero() {
  return (
    <section id="accueil" className="pt-24 pb-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Excellence en Nettoyage
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Votre partenaire de confiance pour un environnement impeccable
          </p>
          <p className="text-lg mb-10 text-blue-200">
            Vernetgeneve offre des services de nettoyage professionnels de qualité supérieure 
            pour les entreprises et les particuliers à Genève et dans toute la Suisse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg hover:shadow-xl"
            >
              Demander un Devis
            </a>
            <a
              href="#services"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Nos Services
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

