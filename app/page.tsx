import Header from '@/components/common/header'
import IndexSection from '@/components/home/index'
import Foot from '@/components/common/foot'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <IndexSection />
      </main>
      <Foot />
    </div>
  )
}
