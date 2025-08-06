'use client'

import Image from 'next/image'

const yesHolders = [
  {
    id: 1,
    name: 'coquimalo',
    avatar: 'https://via.placeholder.com/40',
    shares: '440,118',
  },
]

const noHolders = [
  {
    id: 1,
    name: 'hopedieslast',
    avatar: 'https://via.placeholder.com/40',
    shares: '277,106',
  },
]

export default function HoldersTab() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* YES holders */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="text-lg font-semibold mb-3">Yes holders</h4>
          <div className="space-y-3">
            {yesHolders.map((holder) => (
              <div
                key={holder.id}
                className="flex items-center space-x-3 border-b pb-2"
              >
                <Image
                  src={holder.avatar}
                  alt={holder.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="flex-1 text-gray-800 font-medium">{holder.name}</span>
                <span className="text-gray-600 font-mono">{holder.shares}</span>
              </div>
            ))}
          </div>
        </div>

        {/* NO holders */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="text-lg font-semibold mb-3">No holders</h4>
          <div className="space-y-3">
            {noHolders.map((holder) => (
              <div
                key={holder.id}
                className="flex items-center space-x-3 border-b pb-2"
              >
                <Image
                  src={holder.avatar}
                  alt={holder.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="flex-1 text-gray-800 font-medium">{holder.name}</span>
                <span className="text-gray-600 font-mono">{holder.shares}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
