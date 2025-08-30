import React from 'react'

interface SentimentBarsProps {
  sentimentKey: string
  sentimentValue: number
}

const SentimentBars = ({ sentimentKey, sentimentValue }: SentimentBarsProps) => {
  const barColor = sentimentKey === "positive" ? "plasmo-bg-gray-900" : sentimentKey === "negative" ? "plasmo-bg-gray-400" : "plasmo-bg-gray-300"

  return (
    <>
      <div className="plasmo-flex plasmo-items-center plasmo-justify-between plasmo-text-sm">
        <span className="plasmo-text-gray-600">
          {sentimentKey.charAt(0).toUpperCase() + sentimentKey.slice(1)}
        </span>
        <span className="plasmo-font-medium plasmo-text-gray-900">
          {sentimentValue}%
        </span>
      </div>
      <div className="plasmo-w-full plasmo-bg-gray-200 plasmo-rounded-full plasmo-h-2">
        <div
          className={`plasmo-h-2 plasmo-rounded-full plasmo-transition-all plasmo-duration-500 ${barColor}`}
          style={{ width: `${sentimentValue}%` }}
        ></div>
      </div>
    </>
  )
}

export default SentimentBars