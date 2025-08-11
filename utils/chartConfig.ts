// utils/chartConfig.ts

export interface ChartConfiguration {
  theme: 'light' | 'dark'
  timeframe: string
  studies: string[]
  colors: {
    bullish: string
    bearish: string
    volume: string
    grid: string
    text: string
    background: string
  }
}

export const defaultChartConfig: ChartConfiguration = {
  theme: 'light',
  timeframe: '1D',
  studies: [
    'Volume@tv-basicstudies',
    'MASimple@tv-basicstudies',
    'RSI@tv-basicstudies',
    'MACD@tv-basicstudies'
  ],
  colors: {
    bullish: '#26a69a',
    bearish: '#ef5350',
    volume: '#64b5f6',
    grid: '#e0e3e7',
    text: '#131722',
    background: '#ffffff'
  }
}

export const darkChartConfig: ChartConfiguration = {
  theme: 'dark',
  timeframe: '1D',
  studies: [
    'Volume@tv-basicstudies',
    'MASimple@tv-basicstudies',
    'RSI@tv-basicstudies',
    'MACD@tv-basicstudies'
  ],
  colors: {
    bullish: '#4caf50',
    bearish: '#f44336',
    volume: '#2196f3',
    grid: '#363c4e',
    text: '#d1d4dc',
    background: '#1e222d'
  }
}

// Gate.io 风格的图表配置
export const gateioStyleConfig = {
  // 基础配置
  width: '100%',
  height: 400,
  timezone: 'Etc/UTC',
  locale: 'en',
  
  // 样式配置
  overrides: {
    // 价格轴
    'paneProperties.background': '#ffffff',
    'paneProperties.vertGridProperties.color': '#f0f3fa',
    'paneProperties.horzGridProperties.color': '#f0f3fa',
    'paneProperties.crossHairProperties.color': '#9598a1',
    
    // 蜡烛图样式
    'mainSeriesProperties.candleStyle.upColor': '#3fb68b',
    'mainSeriesProperties.candleStyle.downColor': '#ff5b5a',
    'mainSeriesProperties.candleStyle.drawWick': true,
    'mainSeriesProperties.candleStyle.drawBorder': true,
    'mainSeriesProperties.candleStyle.borderColor': '#378658',
    'mainSeriesProperties.candleStyle.borderUpColor': '#3fb68b',
    'mainSeriesProperties.candleStyle.borderDownColor': '#ff5b5a',
    'mainSeriesProperties.candleStyle.wickUpColor': '#3fb68b',
    'mainSeriesProperties.candleStyle.wickDownColor': '#ff5b5a',
    
    // 成交量样式
    'volumePaneSize': 'medium',
    'scalesProperties.textColor': '#9598a1',
    'scalesProperties.fontSize': 12,
    
    // 移动平均线
    'studies.MA Cross.ma1.color': '#2196F3',
    'studies.MA Cross.ma2.color': '#FF9800',
    'studies.MA Cross.ma1.linewidth': 2,
    'studies.MA Cross.ma2.linewidth': 2,
  },
  
  // 研究指标
  studies_overrides: {
    'volume.volume.color.0': '#ff5b5a',
    'volume.volume.color.1': '#3fb68b',
    'volume.volume.transparency': 50,
    
    'RSI.rsi.color': '#9c27b0',
    'RSI.rsi.linewidth': 2,
    'RSI.upperBand.color': '#e91e63',
    'RSI.lowerBand.color': '#4caf50',
    
    'MACD.macd.color': '#2196f3',
    'MACD.signal.color': '#ff9800',
    'MACD.histogram.color': '#9e9e9e',
  },
  
  // 工具栏配置
  enabled_features: [
    'study_templates',
    'use_localstorage_for_settings',
    'save_chart_properties_to_local_storage',
    'hide_left_toolbar_by_default',
    'control_bar',
    'timeframes_toolbar',
    'edit_buttons_in_legend',
    'context_menus',
    'scales_context_menu'
  ],
  
  disabled_features: [
    'popup_hints',
    'header_in_fullscreen_mode',
    'symbol_info',
    'go_to_date'
  ],
  
  // 自定义CSS
  custom_css_url: '/tradingview-custom.css',
  
  // 时间框架
  time_frames: [
    { text: '1m', resolution: '1', description: '1 分钟' },
    { text: '5m', resolution: '5', description: '5 分钟' },
    { text: '15m', resolution: '15', description: '15 分钟' },
    { text: '1H', resolution: '60', description: '1 小时' },
    { text: '4H', resolution: '240', description: '4 小时' },
    { text: '1D', resolution: '1D', description: '1 日' },
    { text: '1W', resolution: '1W', description: '1 周' }
  ]
}

// 预测市场特定配置
export const predictionMarketConfig = {
  ...gateioStyleConfig,
  
  // 预测市场特有的覆盖样式
  overrides: {
    ...gateioStyleConfig.overrides,
    
    // 概率线样式（0-100%）
    'scalesProperties.scaleSeriesOnly': true,
    'paneProperties.topMargin': 10,
    'paneProperties.bottomMargin': 10,
    
    // 关键概率水平线
    'paneProperties.legendProperties.showLegend': true,
    'paneProperties.legendProperties.showStudyArguments': true,
    'paneProperties.legendProperties.showStudyTitles': true,
    'paneProperties.legendProperties.showStudyValues': true,
    'paneProperties.legendProperties.showSeriesTitle': true,
  },
  
  // 预测市场特定指标
  studies_overrides: {
    ...gateioStyleConfig.studies_overrides,
    
    // 添加概率带
    'Bollinger Bands.basis.color': '#2196f3',
    'Bollinger Bands.upper.color': '#4caf50',
    'Bollinger Bands.lower.color': '#ff5722',
  }
}

// 导出配置函数
export const getChartConfig = (
  theme: 'light' | 'dark' = 'light',
  isPredictionMarket: boolean = true
) => {
  const baseConfig = isPredictionMarket ? predictionMarketConfig : gateioStyleConfig
  
  if (theme === 'dark') {
    return {
      ...baseConfig,
      overrides: {
        ...baseConfig.overrides,
        'paneProperties.background': '#1e222d',
        'paneProperties.vertGridProperties.color': '#363c4e',
        'paneProperties.horzGridProperties.color': '#363c4e',
        'scalesProperties.textColor': '#d1d4dc',
      }
    }
  }
  
  return baseConfig
}