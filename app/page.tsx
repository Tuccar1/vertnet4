import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import WhyChooseUs from '@/components/WhyChooseUs'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col relative" suppressHydrationWarning>
      <Navigation />
      <main className="flex-1 flex flex-col">
        <Hero />
        <About />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  )
}
