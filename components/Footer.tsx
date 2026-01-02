export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Vernetgeneve</h3>
            <p className="text-sm">
              Excellence en nettoyage professionnel à Genève et en Suisse.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-white transition">Nettoyage Commercial</a></li>
              <li><a href="#services" className="hover:text-white transition">Nettoyage Résidentiel</a></li>
              <li><a href="#services" className="hover:text-white transition">Nettoyage Médical</a></li>
              <li><a href="#services" className="hover:text-white transition">Nettoyage Industriel</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Entreprise</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#apropos" className="hover:text-white transition">À Propos</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Carrières</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Suivez-Nous</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition">Facebook</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
              <a href="#" className="hover:text-white transition">Instagram</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Vernetgeneve. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

