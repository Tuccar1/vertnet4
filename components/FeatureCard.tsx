interface FeatureCardProps {
  emoji: string
  title: string
  description: string
}

export default function FeatureCard({ emoji, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-4">{emoji}</div>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

