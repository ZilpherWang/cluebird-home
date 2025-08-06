'use client'

import React, { useState } from 'react'

export default function VTDealer() {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState(0)

  const quickAddAmount = (value: number | 'max') => {
    if (value === 'max') {
      // 这里可以根据实际业务逻辑设置最大值
      setAmount(1000)
    } else {
      setAmount(prev => prev + value)
    }
  }

  return (
    <div className="vt-dealer w-1/3 bg-white rounded-xl shadow-md sticky top-6 max-h-[calc(100vh-118px)] overflow-y-auto scrollbar-none">
      <style>{`
        /* 隐藏滚动条 */
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="dealer-header p-4 border-b border-gray-200">
        <div className="tab-group flex gap-2 mb-3">
          <button
            className={`tab-button px-4 py-2 rounded-lg font-medium cursor-pointer ${
              activeTab === 'buy' ? 'bg-gray-200 text-black' : 'bg-transparent'
            }`}
            onClick={() => setActiveTab('buy')}
            type="button"
          >
            Buy
          </button>
          <button
            className={`tab-button px-4 py-2 rounded-lg font-medium cursor-pointer ${
              activeTab === 'sell' ? 'bg-gray-200 text-black' : 'bg-transparent'
            }`}
            onClick={() => setActiveTab('sell')}
            type="button"
          >
            Sell
          </button>
        </div>
        <div className="market-label text-sm text-gray-500">Market</div>
      </div>

      <div className="dealer-content p-4">
        <div className="price-display mb-6">
          <div className="price-row flex justify-between items-center mb-2">
            <span className="price-label text-sm text-gray-500">Yes</span>
            <span className="price-value font-medium">93.9¢</span>
          </div>
          <div className="price-row flex justify-between items-center">
            <span className="price-label text-sm text-gray-500">No</span>
            <span className="price-value font-medium">6.7¢</span>
          </div>
        </div>

        <div className="amount-input border border-gray-200 rounded-lg p-3 mb-4">
          <div className="amount-label text-xs text-gray-500 mb-1">Amount</div>
          <div className="amount-value text-2xl font-medium">${amount}</div>
        </div>

        <div className="quick-amounts grid grid-cols-4 gap-2 mb-6">
          <button
            className="amount-button px-2 py-2 border border-gray-200 rounded-lg text-sm cursor-pointer hover:bg-gray-100"
            onClick={() => quickAddAmount(1)}
            type="button"
          >
            +$1
          </button>
          <button
            className="amount-button px-2 py-2 border border-gray-200 rounded-lg text-sm cursor-pointer hover:bg-gray-100"
            onClick={() => quickAddAmount(20)}
            type="button"
          >
            +$20
          </button>
          <button
            className="amount-button px-2 py-2 border border-gray-200 rounded-lg text-sm cursor-pointer hover:bg-gray-100"
            onClick={() => quickAddAmount(100)}
            type="button"
          >
            +$100
          </button>
          <button
            className="amount-button px-2 py-2 border border-gray-200 rounded-lg text-sm cursor-pointer hover:bg-gray-100"
            onClick={() => quickAddAmount('max')}
            type="button"
          >
            Max
          </button>
        </div>

        <button
          className="trade-button w-full py-3 bg-blue-700 text-white rounded-lg font-medium cursor-not-allowed opacity-70"
          disabled
          type="button"
        >
          Login to Trade
        </button>

        <div className="terms-notice mt-4 text-center text-xs text-gray-500">
          By trading, you agree to the{' '}
          <a href="#" className="text-blue-700 hover:underline">
            Terms of Use
          </a>
        </div>
      </div>
    </div>
  )
}
