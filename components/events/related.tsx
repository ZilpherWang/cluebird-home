'use client'

import React from 'react'

interface Market {
  id: number
  title: string
  image: string
  volume: string
  yesPrice: string
  noPrice: string
}

const relatedMarkets: Market[] = [
  {
    id: 1,
    title: 'Trump agrees to send U.S. peacekeeping force to Ukraine?',
    image: 'https://via.placeholder.com/60',
    volume: '$775,274',
    yesPrice: '8',
    noPrice: '92',
  },
]

export default function RelatedMarkets() {
  return (
    <div className="tab-content">
      <div className="related-markets space-y-4">
        {relatedMarkets.map((market) => (
          <div
            key={market.id}
            className="related-item flex items-center justify-between border-b border-gray-200 pb-3 last:border-b-0"
          >
            <div className="market-info flex items-center gap-4">
              <img
                src={market.image}
                alt={market.title}
                className="market-image w-16 h-16 object-cover rounded"
              />
              <div className="market-details">
                <h4 className="text-lg font-semibold text-gray-900">{market.title}</h4>
                <span className="market-volume text-sm text-gray-500">{market.volume} Vol.</span>
              </div>
            </div>
            <div className="market-prices flex gap-6 text-gray-700 font-medium">
              <span className="yes-price text-green-600">Yes {market.yesPrice}¢</span>
              <span className="no-price text-red-600">No {market.noPrice}¢</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
