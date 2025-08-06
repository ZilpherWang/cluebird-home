// app/components/Footer.tsx (或 layout/footer.tsx)
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full h-10 bg-white border-t border-gray-200 fixed bottom-0 left-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex justify-between items-center px-4">
        {/* 左侧链接 */}
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <Link href="#" className="hover:text-gray-800">Adventure One GBS Inc.</Link>
          <span>© 2026</span>
          <Link href="#" className="hover:text-gray-800">Privacy</Link>
          <Link href="#" className="hover:text-gray-800">Terms of Use</Link>
          <Link href="#" className="hover:text-gray-800">Learn</Link>
          <Link href="#" className="hover:text-gray-800">Careers</Link>
          <Link href="#" className="hover:text-gray-800">Press</Link>
        </div>

        {/* 右侧社交图标区域（替换为你自己的图标） */}
        <div className="flex items-center gap-4 text-gray-600 text-base">
          <a href="#" className="hover:text-gray-800">💬</a>
          <a href="#" className="hover:text-gray-800">❌</a>
          <a href="#" className="hover:text-gray-800">🖼️</a>
          <a href="#" className="hover:text-gray-800">🔗</a>
          <a href="#" className="hover:text-gray-800">▶️</a>
        </div>
      </div>
    </footer>
  )
}
