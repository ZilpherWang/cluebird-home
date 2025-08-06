'use client'

import { useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts'

export default function PredictionStatus() {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { color: '#ffffff' },
        textColor: '#000',
      },
      grid: {
        vertLines: { color: '#eee' },
        horzLines: { color: '#eee' },
      },
      rightPriceScale: {
        borderColor: '#ccc',
      },
      timeScale: {
        borderColor: '#ccc',
      },
    })

    const lineSeries = chart.addLineSeries()
    lineSeries.setData([
      { time: '2024-07-29', value: 0.3 },
      { time: '2024-07-30', value: 0.4 },
      { time: '2024-07-31', value: 0.45 },
      { time: '2024-08-01', value: 0.49 },
      { time: '2024-08-02', value: 0.51 },
    ])

    const resizeObserver = new ResizeObserver(() => {
      chart.resize(chartContainerRef.current!.clientWidth, 300)
    })

    resizeObserver.observe(chartContainerRef.current)

    return () => {
      chart.remove()
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-4 flex items-center gap-4">
        <div className="font-bold text-gray-800">YES</div>
        <div className="text-lg font-bold text-black">45% chance</div>
        <div className="text-green-600">+16%</div>
      </div>
      <div className="w-full h-[300px]" ref={chartContainerRef}></div>
    </div>
  )
}
