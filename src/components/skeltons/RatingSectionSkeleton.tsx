import React from 'react'

const RatingSectionSkeleton = () => {
    return (
        <div className="plasmo-space-y-4">
            <div className="plasmo-flex plasmo-items-center">
                <div className="plasmo-w-4 plasmo-h-4 plasmo-bg-gray-200 plasmo-rounded plasmo-mr-2"></div>
                <div className="plasmo-w-32 plasmo-h-4 plasmo-bg-gray-200 plasmo-rounded"></div>
            </div>

            <div className="plasmo-bg-gray-50 plasmo-rounded-lg plasmo-p-4 plasmo-space-y-4">
                <div className="plasmo-flex plasmo-items-center plasmo-space-x-1">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="plasmo-w-8 plasmo-h-8 plasmo-bg-gray-200 plasmo-rounded"></div>
                    ))}
                </div>
                <div className="plasmo-w-full plasmo-h-20 plasmo-rounded-lg plasmo-bg-gray-200"></div>
                <div className="plasmo-w-full plasmo-h-10 plasmo-rounded-lg plasmo-bg-gray-200"></div>
            </div>
        </div>
    )
}

export default RatingSectionSkeleton