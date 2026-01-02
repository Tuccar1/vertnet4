interface Service {
  icon: string
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: '🏢',
    title: 'Nettoyage Commercial',
    description: 'Services de nettoyage professionnel pour bureaux, magasins et espaces commerciaux. Nous maintenons vos locaux impeccables pour créer une image professionnelle.'
  },
  {
    icon: '🏠',
    title: 'Nettoyage Résidentiel',
    description: 'Services de nettoyage à domicile personnalisés. Notre équipe expérimentée garantit un environnement propre et sain pour votre famille.'
  },
  {
    icon: '🏥',
    title: 'Nettoyage Médical',
    description: 'Nettoyage spécialisé pour établissements de santé avec protocoles stricts de désinfection et d\'hygiène pour garantir la sécurité sanitaire.'
  },
  {
    icon: '🏭',
    title: 'Nettoyage Industriel',
    description: 'Solutions de nettoyage pour installations industrielles, entrepôts et usines avec équipements professionnels et techniques avancées.'
  },
  {
    icon: '🪟',
    title: 'Nettoyage de Vitres',
    description: 'Service professionnel de nettoyage de vitres pour bâtiments résidentiels et commerciaux. Résultats impeccables garantis.'
  },
  {
    icon: '🧹',
    title: 'Nettoyage Après Travaux',
    description: 'Nettoyage approfondi après rénovation ou construction. Nous rendons vos espaces prêts à être utilisés rapidement et efficacement.'
  }
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des solutions de nettoyage complètes adaptées à tous vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

