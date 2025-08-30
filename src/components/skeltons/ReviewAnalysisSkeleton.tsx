import React from 'react'

const ReviewAnalysisSkeleton = () => {
    return (
        <div className="plasmo-space-y-4">
            <div className="plasmo-flex plasmo-items-center">
                <div className="plasmo-w-4 plasmo-h-4 plasmo-bg-gray-200 plasmo-rounded plasmo-mr-2"></div>
                <div className="plasmo-w-32 plasmo-h-4 plasmo-bg-gray-200 plasmo-rounded"></div>
            </div>

            <div className="plasmo-bg-gray-50 plasmo-rounded-lg plasmo-p-5">
                <div className="plasmo-space-y-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="plasmo-space-y-3">
                            <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                                <div className="plasmo-w-16 plasmo-h-3 plasmo-bg-gray-200 plasmo-rounded"></div>
                                <div className="plasmo-w-8 plasmo-h-3 plasmo-bg-gray-200 plasmo-rounded"></div>
                            </div>
                            <div className="plasmo-w-full plasmo-h-2 plasmo-bg-gray-200 plasmo-rounded-full"></div>
                        </div>
                    ))}

                    <div className="plasmo-grid plasmo-grid-cols-3 plasmo-gap-4 plasmo-pt-4 plasmo-border-t plasmo-border-gray-200">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="plasmo-text-center">
                                <div className="plasmo-w-12 plasmo-h-6 plasmo-bg-gray-200 plasmo-rounded plasmo-mx-auto plasmo-mb-1"></div>
                                <div className="plasmo-w-10 plasmo-h-3 plasmo-bg-gray-200 plasmo-rounded plasmo-mx-auto"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewAnalysisSkeleton