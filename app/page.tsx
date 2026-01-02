import Hero from '@/components/Hero'
import FeatureCard from '@/components/FeatureCard'

export default function Home() {
  const features = [
    {
      emoji: '🚀',
      title: 'Hızlı',
      description: 'Modern teknolojilerle geliştirilmiş, yüksek performanslı web sitesi'
    },
    {
      emoji: '✨',
      title: 'Modern',
      description: 'Güncel tasarım trendleriyle oluşturulmuş, kullanıcı dostu arayüz'
    },
    {
      emoji: '💡',
      title: 'Yenilikçi',
      description: 'En son web teknolojileri kullanılarak geliştirilmiş çözümler'
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <Hero />
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              emoji={feature.emoji}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
