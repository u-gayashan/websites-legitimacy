"use client"

import { useState } from "react"

interface SideBarProps {
    isOpen?: boolean
    userInfo: { name: string; email: string, picture: string } | null
}

export const SideBar = ({ isOpen = true, userInfo }: SideBarProps) => {
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const [hoveredStar, setHoveredStar] = useState(0)

    const handleSubmitReview = () => {
        if (rating > 0 && review.trim()) {
            console.log("Submitting review:", { rating, review })
            // Handle review submission here
            setReview("")
            setRating(0)
        }
    }

    // Mock data for charts
    const reviewData = {
        positive: 75,
        negative: 15,
        neutral: 10,
    }

    const summaryData = {
        totalReviews: 1247,
        averageRating: 4.2,
        trustScore: 8.5,
    }

    return (
        <div
            className={`
        plasmo-fixed plasmo-top-0 plasmo-right-0 plasmo-h-screen plasmo-w-96 
        plasmo-bg-white plasmo-shadow-2xl plasmo-z-50
        plasmo-transform plasmo-transition-transform plasmo-duration-300 plasmo-ease-in-out
        ${isOpen ? "plasmo-translate-x-0" : "plasmo-translate-x-full"}
        plasmo-border-l plasmo-border-gray-200
      `}
        >
            <div className="plasmo-flex plasmo-flex-col plasmo-h-full plasmo-overflow-hidden">
                {/* Header */}
                <div className="plasmo-flex plasmo-justify-between plasmo-items-center plasmo-p-6 plasmo-border-b plasmo-border-gray-100 plasmo-bg-gradient-to-r plasmo-from-blue-50 plasmo-to-indigo-50">
                    <h1 className="plasmo-text-xl plasmo-font-bold plasmo-text-gray-800">Website Insights</h1>
                    <div className="plasmo-w-10 plasmo-h-10 plasmo-rounded-full plasmo-bg-gradient-to-r plasmo-from-blue-500 plasmo-to-indigo-600 plasmo-flex plasmo-items-center plasmo-justify-center plasmo-text-white plasmo-font-semibold">
                        {/* lets show user image which comes as URL here from the userInfo */}
                        {isOpen && (
                            userInfo ? (
                                <img
                                    src={userInfo.email ? `${userInfo.picture}` : ""}
                                    alt="User Avatar"
                                    className="plasmo-w-full plasmo-h-full plasmo-rounded-full"
                                />
                            ) : (
                                <span className="plasmo-text-lg">?</span>
                            )
                        )}
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="plasmo-flex-1 plasmo-overflow-y-auto plasmo-p-6 plasmo-space-y-6">
                    {/* Charts Section */}
                    <div className="plasmo-space-y-4">
                        <h2 className="plasmo-text-lg plasmo-font-semibold plasmo-text-gray-800 plasmo-mb-4">Review Analysis</h2>

                        <div className="plasmo-grid plasmo-grid-cols-2 plasmo-gap-4">
                            {/* Review Distribution Chart */}
                            <div className="plasmo-bg-gray-50 plasmo-rounded-lg plasmo-p-4">
                                <h3 className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-600 plasmo-mb-3">
                                    Sentiment Distribution
                                </h3>
                                <div className="plasmo-space-y-2">
                                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                                        <span className="plasmo-text-xs plasmo-text-gray-500">Positive</span>
                                        <span className="plasmo-text-xs plasmo-font-medium plasmo-text-green-600">
                                            {reviewData.positive}%
                                        </span>
                                    </div>
                                    <div className="plasmo-w-full plasmo-bg-gray-200 plasmo-rounded-full plasmo-h-2">
                                        <div
                                            className="plasmo-bg-green-500 plasmo-h-2 plasmo-rounded-full plasmo-transition-all plasmo-duration-500"
                                            style={{ width: `${reviewData.positive}%` }}
                                        ></div>
                                    </div>

                                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                                        <span className="plasmo-text-xs plasmo-text-gray-500">Negative</span>
                                        <span className="plasmo-text-xs plasmo-font-medium plasmo-text-red-600">
                                            {reviewData.negative}%
                                        </span>
                                    </div>
                                    <div className="plasmo-w-full plasmo-bg-gray-200 plasmo-rounded-full plasmo-h-2">
                                        <div
                                            className="plasmo-bg-red-500 plasmo-h-2 plasmo-rounded-full plasmo-transition-all plasmo-duration-500"
                                            style={{ width: `${reviewData.negative}%` }}
                                        ></div>
                                    </div>

                                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                                        <span className="plasmo-text-xs plasmo-text-gray-500">Neutral</span>
                                        <span className="plasmo-text-xs plasmo-font-medium plasmo-text-yellow-600">
                                            {reviewData.neutral}%
                                        </span>
                                    </div>
                                    <div className="plasmo-w-full plasmo-bg-gray-200 plasmo-rounded-full plasmo-h-2">
                                        <div
                                            className="plasmo-bg-yellow-500 plasmo-h-2 plasmo-rounded-full plasmo-transition-all plasmo-duration-500"
                                            style={{ width: `${reviewData.neutral}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Summary Stats */}
                            <div className="plasmo-bg-gray-50 plasmo-rounded-lg plasmo-p-4">
                                <h3 className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-600 plasmo-mb-3">Summary Stats</h3>
                                <div className="plasmo-space-y-3">
                                    <div className="plasmo-text-center">
                                        <div className="plasmo-text-2xl plasmo-font-bold plasmo-text-blue-600">
                                            {summaryData.totalReviews.toLocaleString()}
                                        </div>
                                        <div className="plasmo-text-xs plasmo-text-gray-500">Total Reviews</div>
                                    </div>

                                    <div className="plasmo-text-center">
                                        <div className="plasmo-text-2xl plasmo-font-bold plasmo-text-green-600">
                                            {summaryData.averageRating}
                                        </div>
                                        <div className="plasmo-text-xs plasmo-text-gray-500">Avg Rating</div>
                                    </div>

                                    <div className="plasmo-text-center">
                                        <div className="plasmo-text-2xl plasmo-font-bold plasmo-text-purple-600">
                                            {summaryData.trustScore}/10
                                        </div>
                                        <div className="plasmo-text-xs plasmo-text-gray-500">Trust Score</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Website Description */}
                    <div className="plasmo-space-y-3">
                        <h2 className="plasmo-text-lg plasmo-font-semibold plasmo-text-gray-800">Website Description</h2>
                        <div className="plasmo-bg-gray-50 plasmo-rounded-lg plasmo-p-4">
                            <p className="plasmo-text-sm plasmo-text-gray-700 plasmo-leading-relaxed">
                                This website appears to be a well-established platform with a strong user base. Based on our analysis,
                                it demonstrates good security practices and maintains a positive reputation among users. The site offers
                                reliable services with consistent uptime and responsive customer support.
                            </p>
                            <div className="plasmo-mt-3 plasmo-flex plasmo-flex-wrap plasmo-gap-2">
                                <span className="plasmo-px-2 plasmo-py-1 plasmo-bg-green-100 plasmo-text-green-800 plasmo-text-xs plasmo-rounded-full">
                                    Secure
                                </span>
                                <span className="plasmo-px-2 plasmo-py-1 plasmo-bg-blue-100 plasmo-text-blue-800 plasmo-text-xs plasmo-rounded-full">
                                    Reliable
                                </span>
                                <span className="plasmo-px-2 plasmo-py-1 plasmo-bg-purple-100 plasmo-text-purple-800 plasmo-text-xs plasmo-rounded-full">
                                    Trusted
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Rating and Review Section */}
                    <div className="plasmo-space-y-4">
                        <h2 className="plasmo-text-lg plasmo-font-semibold plasmo-text-gray-800">Rate This Website</h2>

                        {/* Star Rating */}
                        <div className="plasmo-flex plasmo-items-center plasmo-space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    className="plasmo-text-2xl plasmo-transition-colors plasmo-duration-150"
                                    onMouseEnter={() => setHoveredStar(star)}
                                    onMouseLeave={() => setHoveredStar(0)}
                                    onClick={() => setRating(star)}
                                >
                                    <span className={star <= (hoveredStar || rating) ? "plasmo-text-yellow-400" : "plasmo-text-gray-300"}>
                                        ★
                                    </span>
                                </button>
                            ))}
                            {rating > 0 && (
                                <span className="plasmo-ml-2 plasmo-text-sm plasmo-text-gray-600">
                                    {rating} star{rating !== 1 ? "s" : ""}
                                </span>
                            )}
                        </div>

                        {/* Review Text Area */}
                        <div>
                            <label className="plasmo-block plasmo-text-sm plasmo-font-medium plasmo-text-gray-700 plasmo-mb-2">
                                Your Review
                            </label>
                            <textarea
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Share your experience with this website..."
                                className="plasmo-w-full plasmo-p-3 plasmo-border plasmo-border-gray-300 plasmo-rounded-lg plasmo-text-sm plasmo-resize-none plasmo-focus:ring-2 plasmo-focus:ring-blue-500 plasmo-focus:border-transparent"
                                rows={4}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmitReview}
                            disabled={rating === 0 || !review.trim()}
                            className={`
                plasmo-w-full plasmo-py-3 plasmo-px-4 plasmo-rounded-lg plasmo-font-medium plasmo-text-sm
                plasmo-transition-all plasmo-duration-200
                ${rating > 0 && review.trim()
                                    ? "plasmo-bg-blue-600 plasmo-text-white hover:plasmo-bg-blue-700 plasmo-shadow-md hover:plasmo-shadow-lg"
                                    : "plasmo-bg-gray-300 plasmo-text-gray-500 plasmo-cursor-not-allowed"
                                }
              `}
                        >
                            Submit Review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
