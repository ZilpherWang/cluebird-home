'use client'

import React, { useState } from 'react'

export default function RulesSection() {
  const [isRulesExpanded, setIsRulesExpanded] = useState(false)

  return (
    <div className="rules-section my-6 bg-white rounded-lg border border-gray-200 p-4">
      <div className="rules-header">
        <h3 className="m-0 text-lg font-semibold">Rules</h3>
      </div>
      <div className="rules-content mt-4">
        <p>This market will resolve to &quot;Yes&quot; if both of the following two conditions are met:</p>

        {isRulesExpanded ? (
          <>
            <ol className="list-decimal pl-6 my-4 space-y-2 leading-relaxed">
              <li>Donald J. Trump wins the 2024 US Presidential election.</li>
              <li>
                An armistice, ceasefire, or negotiated settlement is announced by both Ukraine and Russia
                regarding the ongoing war in Ukraine at any point between the Associated Press calling the
                election for Donald Trump, and April 19, 2025, 11:59 PM ET.
              </li>
            </ol>
            <div className="resolver-info flex items-center justify-between bg-gray-100 rounded-md p-3 my-4">
              <div className="resolver-label flex items-center gap-2">
                <img
                  src="/assets/uma-logo.png"
                  alt="UMA"
                  className="resolver-logo h-6"
                  loading="lazy"
                />
                <span>Resolver</span>
              </div>
              <div className="resolver-address text-gray-600">0x6A9D222616...</div>
            </div>
            <button
              onClick={() => setIsRulesExpanded(false)}
              className="toggle-rules flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer py-2 border-none bg-transparent"
              type="button"
              aria-expanded={isRulesExpanded}
              aria-label="Show less rules"
            >
              Show less <span className="arrow text-xs">^</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsRulesExpanded(true)}
            className="toggle-rules flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer py-2 border-none bg-transparent"
            type="button"
            aria-expanded={isRulesExpanded}
            aria-label="Show more rules"
          >
            Show more <span className="arrow text-xs">v</span>
          </button>
        )}
      </div>
    </div>
  )
}
