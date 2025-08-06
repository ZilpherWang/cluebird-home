'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Trader {
  avatar: string;
  name: string;
  address: string;
  positions: string;
  profitLoss: string;
  volume: string;
}

const initialTraders: Trader[] = [
  {
    avatar: '/path/to/trader1.jpg',
    name: 'StarryPath',
    address: '0x55b4...80ea',
    positions: '3',
    profitLoss: '53',
    volume: '210',
  },
  {
    avatar: '/path/to/trader2.jpg',
    name: 'TheB4ron',
    address: '0x33b4...75ea',
    positions: '5',
    profitLoss: '48',
    volume: '180',
  },
  {
    avatar: '/path/to/trader3.jpg',
    name: 'AiBird',
    address: '0x21b4...01ea',
    positions: '4',
    profitLoss: '42',
    volume: '150',
  },
];

export default function TopVolume() {
  const [topTraders] = useState<Trader[]>(initialTraders);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Top Volume This Week</h2>
        <span className="text-sm text-blue-500 cursor-pointer hover:underline">See all</span>
      </div>

      <div className="space-y-4">
        {topTraders.map((trader, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white rounded-lg shadow-sm p-4 border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <Image
                src={trader.avatar}
                alt={trader.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-gray-800">{trader.name}</div>
                <div className="text-sm text-gray-500">{trader.address}</div>
              </div>
            </div>

            <div className="flex gap-8 text-sm text-right">
              <div>
                <div className="text-gray-400">Positions</div>
                <div className="font-semibold text-gray-800">${trader.positions}k</div>
              </div>
              <div>
                <div className="text-gray-400">Profit/loss</div>
                <div className="font-semibold text-green-600">${trader.profitLoss}k</div>
              </div>
              <div>
                <div className="text-gray-400">Volume</div>
                <div className="font-semibold text-blue-600">${trader.volume}m</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
