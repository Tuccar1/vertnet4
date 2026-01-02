export default function About() {
  return (
    <section id="apropos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              À Propos de Vernetgeneve
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Excellence et Professionnalisme
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Vernetgeneve est une entreprise de nettoyage de premier plan basée à Genève, 
                spécialisée dans la fourniture de services de nettoyage de haute qualité 
                pour les entreprises et les particuliers.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Avec des années d'expérience dans l'industrie, nous nous engageons à 
                maintenir les plus hauts standards de qualité, d'efficacité et de 
                satisfaction client.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Notre équipe de professionnels qualifiés utilise des équipements de 
                pointe et des produits écologiques pour garantir des résultats 
                exceptionnels à chaque intervention.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-3xl mr-4">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Équipe Certifiée</h4>
                    <p className="text-gray-600">Personnel formé et certifié</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-3xl mr-4">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Produits Écologiques</h4>
                    <p className="text-gray-600">Respectueux de l'environnement</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-3xl mr-4">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Disponibilité 24/7</h4>
                    <p className="text-gray-600">Service flexible et réactif</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-3xl mr-4">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Satisfaction Garantie</h4>
                    <p className="text-gray-600">100% satisfaction ou remboursement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

