import Header from '@/components/common/header'
import OrderBook from '@/components/event/OrderBook'
import EventChart from '@/components/event/EventChart'
import MarketSummary from '@/components/event/MarketSummary'
import Rules from '@/components/event/Rules'
import Comments from '@/components/event/Comments'
import Holders from '@/components/event/Holders'
import Activity from '@/components/event/Activity'
import Related from '@/components/event/Related'
import Trade from '@/components/event/Trade'
import { useState } from 'react'

const tabs = [
  { id: 'comments', name: 'Comments' },
  { id: 'holders', name: 'Top Holders' },
  { id: 'activity', name: 'Activity' },
  { id: 'related', name: 'Related' }
]

export default function EventDetailPage() {
  const [currentTab, setCurrentTab] = useState('comments')

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-screen-xl mx-auto flex gap-6 px-4 py-6">
        <div className="w-2/3 bg-white rounded-xl shadow p-6 overflow-y-auto max-h-[calc(100vh-100px)]">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                <img src="/assets/img/what-will-elon-say-during-baier.webp" alt="event" className="object-cover w-full h-full" />
              </div>
              <h1 className="text-2xl font-semibold">Trump ends Ukraine war in first 90 days?</h1>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <div className="bg-gray-200 p-1 rounded">Closed</div>
                <p>$20,238,991 Vol.</p>
                <p className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"/><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"/></svg>
                  Apr 20, 2025
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-200 rounded">
                  <svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M224 160v736l51.008-38.016L512 680l236.992 178.016L800 896V160z m64 64h448v544l-204.992-154.016L512 600l-19.008 14.016L288 768z"/></svg>
                </button>
                <button className="p-2 hover:bg-gray-200 rounded">...</button>
              </div>
            </div>
          </div>

          <EventChart />
          <OrderBook />
          <MarketSummary />
          <Rules />

          <div className="mt-6 bg-white rounded shadow">
            <div className="border-b border-gray-200 px-4">
              <div className="flex gap-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentTab(tab.id)}
                    className={`py-4 text-sm font-medium border-b-2 ${
                      currentTab === tab.id
                        ? 'text-black border-blue-600'
                        : 'text-gray-500 border-transparent hover:text-black'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4">
              {currentTab === 'comments' && <Comments />}
              {currentTab === 'holders' && <Holders />}
              {currentTab === 'activity' && <Activity />}
              {currentTab === 'related' && <Related />}
            </div>
          </div>
        </div>

        <div className="w-1/3 sticky top-6 max-h-[calc(100vh-100px)] overflow-y-auto">
          <Trade />
        </div>
      </div>
    </div>
  )
}