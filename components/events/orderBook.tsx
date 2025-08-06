'use client'

import { useState } from 'react'

interface Option {
  name: string
  volume: string
  probability: number
  yesPrice: number
  noPrice: number
}

interface Order {
  tradeYes?: string
  tradeNo?: string
  price: string
  shares: string
  total: string
}

export default function OrderBook() {
  // 你可以用 props 或状态替换下面的示例数据
  const options: Option[] = [
    {
      name: 'Israel',
      volume: '40,012',
      probability: 35,
      yesPrice: 36,
      noPrice: 66,
    },
    {
      name: 'Argentina',
      volume: '11,104',
      probability: 20,
      yesPrice: 21.8,
      noPrice: 82.3,
    },
    // {
    //   name: 'Japan',
    //   volume: '11,104',
    //   probability: 20,
    //   yesPrice: 21.8,
    //   noPrice: 82.3,
    // },
  ]

  const [isExpanded, setIsExpanded] = useState(true)
  const [currentTab, setCurrentTab] = useState<'yes' | 'no'>('yes')

  const orders: Order[] = [
    { tradeYes: 'Yes', price: '39¢', shares: '5,092.59', total: '$84,963.06' },
    { tradeYes: 'Yes', price: '38¢', shares: '3,073.69', total: '$82,976.95' },
    { tradeYes: 'Yes', price: '37¢', shares: '3,222.00', total: '$81,808.95' },
    { tradeYes: 'Yes', price: '36¢', shares: '3,809.10', total: '$80,616.81' },
    { tradeYes: 'Yes', price: '35¢', shares: '24,204.87', total: '$80,325.53' },
    { tradeYes: 'Yes', price: '34¢', shares: '15,936.51', total: '$71,853.83' },
    { tradeYes: 'Yes', price: '33¢', shares: '16,924.58', total: '$66,435.42' },
    { tradeYes: 'Yes', price: '32¢', shares: '45,029.44', total: '$60,850.31' },
    { tradeYes: 'Yes', price: '31¢', shares: '108,036.21', total: '$46,440.89' },
  ]

  const noOrders: Order[] = [
    { tradeNo: 'No', price: '61¢', shares: '4,092.59', total: '$74,963.06' },
    { tradeNo: 'No', price: '62¢', shares: '2,073.69', total: '$72,976.95' },
    { tradeNo: 'No', price: '63¢', shares: '2,222.00', total: '$71,808.95' },
    { tradeNo: 'No', price: '64¢', shares: '2,809.10', total: '$70,616.81' },
    { tradeNo: 'No', price: '65¢', shares: '14,204.87', total: '$70,325.53' },
    { tradeNo: 'No', price: '66¢', shares: '5,936.51', total: '$61,853.83' },
    { tradeNo: 'No', price: '67¢', shares: '6,924.58', total: '$56,435.42' },
    { tradeNo: 'No', price: '68¢', shares: '35,029.44', total: '$50,850.31' },
    { tradeNo: 'No', price: '69¢', shares: '98,036.21', total: '$36,440.89' },
  ]

  return (
    <>
      {options && options.length <= 2 ? (
        <div className="mb-6 bg-white rounded-lg border border-red-500">
          <div
            className="flex justify-between items-center p-4 cursor-pointer select-none"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <h3 className="text-lg font-semibold">Order Book</h3>
            <span
              className={`text-2xl transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            >
              {isExpanded ? '︿' : '﹀'}
            </span>
          </div>
          {isExpanded && (
            <div>
              <div className="flex border-b border-gray-200">
                <div
                  className={`flex-1 px-6 py-3 cursor-pointer font-medium text-center border-b-2 ${
                    currentTab === 'yes'
                      ? 'border-gray-800 text-gray-900'
                      : 'border-transparent text-gray-500'
                  }`}
                  onClick={() => setCurrentTab('yes')}
                >
                  TRADE YES
                </div>
                <div
                  className={`flex-1 px-6 py-3 cursor-pointer font-medium text-center border-b-2 ${
                    currentTab === 'no'
                      ? 'border-gray-800 text-gray-900'
                      : 'border-transparent text-gray-500'
                  }`}
                  onClick={() => setCurrentTab('no')}
                >
                  TRADE NO
                </div>
              </div>
              {currentTab === 'yes' && (
                <>
                  <div className="flex px-4 py-3 bg-gray-100 border-t border-b border-gray-200 font-semibold text-gray-700">
                    <div className="flex-1 text-left">TRADE YES</div>
                    <div className="flex-1 text-right">PRICE</div>
                    <div className="flex-1 text-right">SHARES</div>
                    <div className="flex-1 text-right">TOTAL</div>
                  </div>
                  <div>
                    {orders.map((order, i) => (
                      <div
                        key={i}
                        className="flex px-4 py-3 border-b border-gray-200 text-gray-700"
                      >
                        <div className="flex-1 text-left">{order.tradeYes}</div>
                        <div className="flex-1 text-right">{order.price}</div>
                        <div className="flex-1 text-right">{order.shares}</div>
                        <div className="flex-1 text-right">{order.total}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {currentTab === 'no' && (
                <>
                  <div className="flex px-4 py-3 bg-gray-100 border-t border-b border-gray-200 font-semibold text-gray-700">
                    <div className="flex-1 text-left">TRADE NO</div>
                    <div className="flex-1 text-right">PRICE</div>
                    <div className="flex-1 text-right">SHARES</div>
                    <div className="flex-1 text-right">TOTAL</div>
                  </div>
                  <div>
                    {noOrders.map((order, i) => (
                      <div
                        key={i}
                        className="flex px-4 py-3 border-b border-gray-200 text-gray-700"
                      >
                        <div className="flex-1 text-left">{order.tradeNo}</div>
                        <div className="flex-1 text-right">{order.price}</div>
                        <div className="flex-1 text-right">{order.shares}</div>
                        <div className="flex-1 text-right">{order.total}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {options.map((option, i) => (
            <div
              key={i}
              className="p-4 border-b border-gray-200 last:border-b-0 flex items-center justify-between"
            >
              <div className="flex flex-col">
                <div className="font-medium text-gray-800">{option.name}</div>
                <div className="text-gray-500 text-sm">${option.volume} Vol.</div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{option.probability}%</div>
              <div className="flex gap-2">
                <button className="flex-1 rounded-md bg-green-100 text-green-700 py-2 font-semibold hover:bg-green-200 transition">
                  Buy Yes {option.yesPrice}¢
                </button>
                <button className="flex-1 rounded-md bg-red-100 text-red-700 py-2 font-semibold hover:bg-red-200 transition">
                  Buy No {option.noPrice}¢
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
