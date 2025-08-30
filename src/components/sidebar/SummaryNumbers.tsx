import React from 'react'

interface SummaryNumbersProps {
    totalReviews: number;
    averageRating: number;
    trustScore: number;
}

const SummaryNumbers = ({ totalReviews, averageRating, trustScore }: SummaryNumbersProps) => {
    return (
        <>
            <div className="plasmo-text-center">
                <div className="plasmo-text-xl plasmo-font-semibold plasmo-text-gray-900">
                    {totalReviews.toLocaleString()}
                </div>
                <div className="plasmo-text-xs plasmo-text-gray-500 plasmo-mt-1">Reviews</div>
            </div>

            <div className="plasmo-text-center">
                <div className="plasmo-text-xl plasmo-font-semibold plasmo-text-gray-900">
                    {averageRating}
                </div>
                <div className="plasmo-text-xs plasmo-text-gray-500 plasmo-mt-1">Rating</div>
            </div>

            <div className="plasmo-text-center">
                <div className="plasmo-text-xl plasmo-font-semibold plasmo-text-gray-900">
                    {trustScore}/10
                </div>
                <div className="plasmo-text-xs plasmo-text-gray-500 plasmo-mt-1">Trust</div>
            </div>
        </>
    )
}

export default SummaryNumbers