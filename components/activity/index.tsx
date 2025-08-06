// components/RecentActivity.tsx
'use client'

import { useState } from 'react'

interface Activity {
  image: string
  title: string
  user: string
  voteType: 'Yes' | 'No'
  price: string
  amount: string
  time: string
}

export default function RecentActivity() {
  const [recentActivities] = useState<Activity[]>([
    {
      image: '/path/to/avatar1.jpg',
      title: 'Will the highest temperature in London be between 49-5...',
      user: 'EyNetso',
      voteType: 'No',
      price: '54',
      amount: '$16.20',
      time: '13s ago'
    },
    {
      image: '/path/to/avatar2.jpg',
      title: "Will 'The Brutalist' win 2 Oscars at the 2025 Academy Aw...",
      user: '0dte',
      voteType: 'Yes',
      price: '14',
      amount: '$2.80',
      time: '13s ago'
    },
    {
      image: '/path/to/avatar3.jpg',
      title: "Will 'The Brutalist' win 2 Oscars at the 2025 Academy Aw...",
      user: 'surf',
      voteType: 'Yes',
      price: '14',
      amount: '$2.80',
      time: '17s ago'
    }
  ])

  return (
    <div className="p-4 bg-white rounded-md shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <span className="text-sm text-blue-600 cursor-pointer hover:underline">See all</span>
      </div>
      <div className="space-y-4">
        {recentActivities.map((activity, index) => (
          <div key={index} className="flex items-center gap-4">
            <img src={activity.image} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-800">{activity.title}</div>
              <div className="text-xs text-gray-600 flex flex-wrap gap-x-1">
                <span className="font-semibold">{activity.user}</span>
                <span>bought</span>
                <span className={`font-semibold ${activity.voteType === 'Yes' ? 'text-green-600' : 'text-red-500'}`}>
                  {activity.voteType}
                </span>
                <span>at {activity.price}¢</span>
                <span className="text-gray-500">({activity.amount})</span>
              </div>
            </div>
            <div className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
