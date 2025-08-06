'use client'

import { useState } from 'react'

export default function MarketSummary() {
  const [summary, setSummary] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    if (isGenerating) return
    setIsGenerating(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSummary(
        `President Donald Trump has expressed optimism about ending the Ukraine-Russia war, claiming his administration is "successfully negotiating an end to the War with Russia" and detailing a "lengthy and highly productive" phone call with Russian President Vladimir Putin. Despite this, prediction markets remain skeptical, with a 34% probability of Trump ending the war within his first 90 days in office. Trump's criticism of Ukrainian President Volodymyr Zelenskyy and his assertions about U.S. spending on the conflict have added to the uncertainty. Recent diplomatic efforts, including potential peace talks and a planned meeting between Trump and Zelenskyy, have eased some geopolitical tensions, but analysts caution that a rapid resolution is uncertain due to historical precedent and ongoing military escalations[2][3][5].`
      )
    } catch (error) {
      console.error('Failed to generate summary:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="my-6 bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Market Summary</h3>
        <button
          onClick={generateSummary}
          disabled={isGenerating}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
            isGenerating
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
          }`}
        >
          <span className="text-xl">✨</span>
          Generate
        </button>
      </div>

      {!summary && !isGenerating && (
        <div className="text-center py-8 text-gray-600">
          Click generate to create a market summary using AI.
        </div>
      )}

      {isGenerating && (
        <div className="text-center py-8 text-gray-600">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-500 border-gray-300"></div>
          Generating summary...
        </div>
      )}

      {summary && !isGenerating && (
        <div className="leading-relaxed">
          <p>{summary}</p>
          <div className="mt-4 flex items-center gap-2 border-t border-gray-200 pt-4 text-gray-500 text-xs">
            <span>POWERED BY</span>
            <img
              src="/perplexity-logo.png"
              alt="perplexity"
              className="h-4"
              width={64}
              height={16}
            />
          </div>
        </div>
      )}
    </div>
  )
}
