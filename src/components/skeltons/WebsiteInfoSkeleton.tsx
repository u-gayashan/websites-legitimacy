import React from 'react'

const WebsiteInfoSkeleton = () => {
    return (
        <div className="plasmo-space-y-3">
            {/* <div className="plasmo-flex plasmo-items-center">
                <div className="plasmo-w-4 plasmo-h-4 plasmo-bg-gray-200 plasmo-rounded plasmo-mr-2"></div>
                <div className="plasmo-w-24 plasmo-h-4 plasmo-bg-gray-200 plasmo-rounded"></div>
            </div> */}
            <div className="plasmo-bg-gray-50 plasmo-rounded-lg plasmo-p-4">
                <div className="plasmo-space-y-2">
                    <div className="plasmo-w-full plasmo-h-3 plasmo-bg-gray-200 plasmo-rounded"></div>
                    <div className="plasmo-w-full plasmo-h-3 plasmo-bg-gray-200 plasmo-rounded"></div>
                    <div className="plasmo-w-3/4 plasmo-h-3 plasmo-bg-gray-200 plasmo-rounded"></div>
                </div>
                <div className="plasmo-flex plasmo-flex-wrap plasmo-gap-2 plasmo-mt-3">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="plasmo-w-16 plasmo-h-6 plasmo-rounded-full plasmo-bg-gray-200"></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WebsiteInfoSkeleton