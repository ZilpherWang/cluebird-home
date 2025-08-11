'use client'

import { useEffect, useRef, useState } from 'react'

// 预测市场数据接口
interface PredictionData {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume?: number
}

// 简化版 TradingView 图表组件
export default function TradingViewChart() {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const widgetRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPrice, setCurrentPrice] = useState(45.8)
  const [priceChange, setPriceChange] = useState(+16.2)
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [chartTheme, setChartTheme] = useState<'light' | 'dark'>('light')

  // 时间周期选项
  const timeframes = [
    { label: '1m', value: '1' },
    { label: '5m', value: '5' },
    { label: '15m', value: '15' },
    { label: '1H', value: '60' },
    { label: '4H', value: '240' },
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
  ]

  // 模拟预测市场数据
  const generateMockData = (): PredictionData[] => {
    const data: PredictionData[] = []
    const now = Date.now()
    const oneHour = 60 * 60 * 1000
    
    for (let i = 72; i >= 0; i--) { // 3天数据
      const time = now - (i * oneHour)
      const trend = Math.sin(i * 0.1) * 10 // 添加趋势波动
      const noise = (Math.random() - 0.5) * 8 // 随机噪声
      const basePrice = 35 + trend + noise
      const volatility = Math.random() * 4 - 2
      
      const open = Math.max(1, Math.min(99, basePrice))
      const close = Math.max(1, Math.min(99, open + volatility))
      const high = Math.max(open, close) + Math.random() * 3
      const low = Math.min(open, close) - Math.random() * 3
      
      data.push({
        time: Math.floor(time / 1000),
        open: Number(open.toFixed(1)),
        high: Number(Math.max(1, Math.min(99, high)).toFixed(1)),
        low: Number(Math.max(1, Math.min(99, low)).toFixed(1)),
        close: Number(close.toFixed(1)),
        volume: Math.floor(Math.random() * 50000) + 10000
      })
    }
    
    return data.sort((a, b) => a.time - b.time)
  }

  // 加载 TradingView Widget
  useEffect(() => {
    if (!chartContainerRef.current) return

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.async = true
    
    // 生成唯一容器 ID
    const containerId = `tradingview_${Date.now()}`
    chartContainerRef.current.id = containerId
    
    const config = {
      autosize: true,
      symbol: "PREDICTION:TRUMP_UKRAINE_90D",
      interval: selectedTimeframe,
      timezone: "Etc/UTC",
      theme: chartTheme,
      style: "1", // 蜡烛图
      locale: "en",
      toolbar_bg: chartTheme === 'light' ? '#f8fafc' : '#1e293b',
      enable_publishing: false,
      backgroundColor: chartTheme === 'light' ? '#ffffff' : '#0f172a',
      gridColor: chartTheme === 'light' ? '#f1f5f9' : '#334155',
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      container_id: containerId,
      // Gate.io 风格配置
      overrides: {
        "paneProperties.background": chartTheme === 'light' ? "#ffffff" : "#0f172a",
        "paneProperties.vertGridProperties.color": chartTheme === 'light' ? "#f1f5f9" : "#334155",
        "paneProperties.horzGridProperties.color": chartTheme === 'light' ? "#f1f5f9" : "#334155",
        "symbolWatermarkProperties.transparency": 90,
        "scalesProperties.textColor": chartTheme === 'light' ? "#64748b" : "#94a3b8",
        "mainSeriesProperties.candleStyle.upColor": "#22c55e",
        "mainSeriesProperties.candleStyle.downColor": "#ef4444",
        "mainSeriesProperties.candleStyle.borderUpColor": "#22c55e",
        "mainSeriesProperties.candleStyle.borderDownColor": "#ef4444",
        "mainSeriesProperties.candleStyle.wickUpColor": "#22c55e",
        "mainSeriesProperties.candleStyle.wickDownColor": "#ef4444",
        "volumePaneSize": "medium"
      },
      studies: [
        "Volume@tv-basicstudies",
        "MASimple@tv-basicstudies"
      ],
      show_popup_button: true,
      popup_width: "1000",
      popup_height: "650"
    }

    script.innerHTML = JSON.stringify(config)
    chartContainerRef.current.appendChild(script)

    // 模拟加载完成
    const timer = setTimeout(() => {
      setIsLoading(false)
      const mockData = generateMockData()
      setCurrentPrice(mockData[mockData.length - 1]?.close || 45.8)
    }, 2000)

    return () => {
      if (chartContainerRef.current && script.parentNode) {
        script.parentNode.removeChild(script)
      }
      clearTimeout(timer)
    }
  }, [selectedTimeframe, chartTheme])

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      {/* 图表头部信息 */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">YES</span>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">
                {currentPrice.toFixed(1)}% chance
              </div>
              <div className="text-sm text-gray-600">Probability over time</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${
              priceChange > 0 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>n              <span className="text-base">{priceChange > 0 ? '📈' : '📉'}</span>
              <span>{priceChange > 0 ? '+' : ''}{priceChange}%</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium text-gray-800">Volume:</span> $20.2M
              </div>
              <div>
                <span className="font-medium text-gray-800">Liquidity:</span> $847K
              </div>
            </div>
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setChartTheme(chartTheme === 'light' ? 'dark' : 'light')}
            className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-lg"
            title="切换主题"
          >
            {chartTheme === 'light' ? '🌙' : '☀️'}
          </button>
          
          <button className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </button>
          
          <button className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 时间周期选择 */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
        <div className="flex items-center gap-1 overflow-x-auto">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.value}
              onClick={() => setSelectedTimeframe(timeframe.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedTimeframe === timeframe.value
                  ? 'bg-blue-600 text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {timeframe.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Powered by</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-blue-600 rounded"></div>
            <span className="font-semibold text-blue-600">TradingView</span>
          </div>
        </div>
      </div>

      {/* 图表容器 */}
      <div className="relative bg-white">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95 z-20">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animation-delay-150"></div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900 mb-1">Loading Chart...</div>
                <div className="text-xs text-gray-500">Fetching market data</div>
              </div>
            </div>
          </div>
        )}
        
        <div 
          ref={chartContainerRef}
          className="w-full h-[400px] trading-chart-container"
          style={{ minHeight: '400px' }}
        />
      </div>

      {/* 底部统计信息 */}
      <div className="grid grid-cols-4 gap-px bg-gray-200">
        <div className="bg-white p-4 text-center">
          <div className="text-xs text-gray-500 mb-2">24h High</div>
          <div className="font-bold text-green-600 text-lg">52.3%</div>
        </div>
        <div className="bg-white p-4 text-center">
          <div className="text-xs text-gray-500 mb-2">24h Low</div>
          <div className="font-bold text-red-600 text-lg">28.9%</div>
        </div>
        <div className="bg-white p-4 text-center">
          <div className="text-xs text-gray-500 mb-2">Open Interest</div>
          <div className="font-bold text-gray-900 text-lg">$2.1M</div>
        </div>
        <div className="bg-white p-4 text-center">
          <div className="text-xs text-gray-500 mb-2">24h Volume</div>
          <div className="font-bold text-blue-600 text-lg">$847K</div>
        </div>
      </div>
    </div>
  )
}

// 扩展 Window 接口以包含 TradingView
declare global {
  interface Window {
    TradingView: any
  }
}