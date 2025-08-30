import React from 'react'

const QuickStatsGridSkeleton = () => {
    return (
        <div className="plasmo-grid plasmo-grid-cols-2 plasmo-gap-3">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="plasmo-bg-gray-50 plasmo-rounded-lg plasmo-p-4">
                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between plasmo-mb-2">
                        <div className="plasmo-w-4 plasmo-h-4 plasmo-bg-gray-200 plasmo-rounded"></div>
                        <div className="plasmo-w-3 plasmo-h-3 plasmo-bg-gray-200 plasmo-rounded"></div>
                    </div>
                    <div className="plasmo-w-12 plasmo-h-6 plasmo-bg-gray-200 plasmo-rounded plasmo-mb-1"></div>
                    <div className="plasmo-w-16 plasmo-h-3 plasmo-bg-gray-200 plasmo-rounded"></div>
                </div>
            ))}
        </div>
    )
}

export default QuickStatsGridSkeleton