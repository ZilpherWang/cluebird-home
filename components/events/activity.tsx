'use client'
import { useState, useMemo } from 'react'

const activities = [
  {
    id: 1,
    user: 'maxim101',
    avatar: 'https://via.placeholder.com/40',
    type: 'Yes',
    amount: '123',
    price: '22.0',
    value: '$27',
    time: '3m ago',
  },
  {
    id: 2,
    user: 'sandraX',
    avatar: 'https://via.placeholder.com/40',
    type: 'No',
    amount: '50',
    price: '15.3',
    value: '$765',
    time: '10m ago',
  },
]

export default function ActivityTab() {
  const [minAmount, setMinAmount] = useState(0)

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const val = parseFloat(activity.value.replace(/[^0-9.-]+/g, ''))
      return val >= minAmount
    })
  }, [minAmount])

  return (
    <div className="space-y-4">
      <div className="border-b p-4">
        <select
          value={minAmount}
          onChange={(e) => setMinAmount(Number(e.target.value))}
          className="border border-gray-200 rounded-md px-3 py-2 text-sm"
        >
          <option value="0">Min amount</option>
          <option value="10">$10</option>
          <option value="100">$100</option>
          <option value="1000">$1,000</option>
          <option value="10000">$10,000</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-4 border-b pb-4 px-4"
          >
            <img
              src={activity.avatar}
              alt={activity.user}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-1">
              <span className="font-medium">{activity.user}</span>
              <span className="text-gray-500">bought</span>
              <span
                className={`px-2 py-1 rounded text-sm font-semibold ${
                  activity.type === 'Yes'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {activity.amount} {activity.type}
              </span>
              <span className="text-gray-500">at {activity.price}¢</span>
              <span className="text-gray-500">({activity.value})</span>
            </div>
            <span className="text-xs text-gray-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
