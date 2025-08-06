/* Converted from Vue to Next.js with TailwindCSS */
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategoryList } from '@/utils/api/category'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [categories, setCategories] = useState([])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await getCategoryList()
        if (res && res.data) {
          const parsed = res.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            path: item.path || `/${item.code || item.name.toLowerCase()}`,
            isActive: item.isActive || false,
          }))
          if (!parsed.some((item: any) => item.isActive) && parsed.length > 0) {
            parsed[0].isActive = true
          }
          setCategories(parsed)
        }
      } catch (err) {
        console.error('fetch category failed', err)
        setCategories([
          { id: 1, name: 'LIVE', path: '/', isActive: true },
          { id: 2, name: 'All', path: '/all', isActive: false },
          { id: 3, name: 'New', path: '/new', isActive: false },
          { id: 4, name: 'Popular', path: '/popular', isActive: false },
          { id: 5, name: 'Trending', path: '/trending', isActive: false },
          { id: 6, name: 'Upcoming', path: '/upcoming', isActive: false },
        ])
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="flex items-center gap-6 px-6 py-3">
        {/* Logo */}
        <svg className="h-8 cursor-pointer" width="168" height="38" viewBox="0 0 168 38" fill="none">
          {/* SVG paths here */}
        </svg>

        {/* Search */}
        <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg flex-1 max-w-xl mx-4">
          <svg viewBox="0 0 20 20" className="w-6 h-6 text-gray-500">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Search markets"
            className="ml-2 w-full text-sm bg-transparent focus:outline-none"
          />
        </div>

        {/* Navigation */}
        <div className="flex gap-6 mr-auto">
          {[
            { name: 'Markets', path: '/' },
            { name: 'Dashboards', path: '/dashboards' },
            { name: 'Sports', path: '/sports' },
            { name: 'Activity', path: '/activity' },
            { name: 'Ranks', path: '/ranks' },
          ].map(link => (
            <Link key={link.name} href={link.path} className="flex flex-col items-center text-gray-600 text-xs">
              <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
              </svg>
              <span>{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Auth Buttons & Menu */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-blue-600 text-sm">
            Log In
          </Link>
          <Link href="/signup" className="px-4 py-1.5 text-white bg-blue-600 rounded-lg text-sm">
            Sign Up
          </Link>

          <div className="relative">
            <button onClick={toggleMenu} className="p-2 hover:text-black text-gray-600">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-60 bg-white rounded-lg shadow-lg z-50">
                <div className="border-b p-2">
                  <Link href="/signup" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Sign Up</Link>
                  <Link href="/login" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Log In</Link>
                </div>
                <div className="border-b p-2">
                  {['/elections', '/sports', '/rewards', '/learn'].map(path => (
                    <Link key={path} href={path} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                      {path.replace('/', '')}
                    </Link>
                  ))}
                </div>
                <div className="p-2">
                  <Link href="/documentation" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                    Documentation
                  </Link>
                  <Link href="/terms" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                    Terms of Use
                  </Link>
                  <div className="flex items-center justify-between px-4 py-2">
                    <span className="text-sm text-gray-800">Dark mode</span>
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} className="sr-only" />
                      <span className="w-10 h-5 bg-gray-300 rounded-full flex items-center px-1">
                        <span
                          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                            isDarkMode ? 'translate-x-5' : ''
                          }`}
                        ></span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t px-6">
        <ul className="flex gap-6 overflow-x-auto h-10 items-center">
          {categories.map(cat => (
            <li key={cat.id} className={cat.isActive ? 'text-red-500' : 'text-gray-600'}>
              <Link href={cat.path}>{cat.name}</Link>
            </li>
          ))}
          {categories.length === 0 && (
            <li className="text-red-500">
              <Link href="/">LIVE</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}