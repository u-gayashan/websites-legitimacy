import React from 'react'
import { Star } from "lucide-react"
import StarRating from "~components/sidebar/StarRating";

interface RatingSectionProps {
    rating: number
    setRating: (rating: number) => void
    hoveredStar: number
    setHoveredStar: (star: number) => void
    review: string
    setReview: (review: string) => void
    handleSubmitReview: () => void
    userInfo: {
        email?: string
    }
    isLoading: boolean
}

const RatingSection = ({
    rating,
    setRating,
    hoveredStar,
    setHoveredStar,
    review,
    setReview,
    handleSubmitReview,
    userInfo,
    isLoading }: RatingSectionProps) => {

    return (
        <div className="plasmo-space-y-4">
            <h2 className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-900 plasmo-flex plasmo-items-center">
                <Star className="plasmo-w-4 plasmo-h-4 plasmo-mr-2 plasmo-text-gray-400" />
                Rate This Website
            </h2>

            <div className="plasmo-bg-gray-50 plasmo-rounded-lg plasmo-p-4 plasmo-space-y-4">
                {/* Star Rating */}
                <StarRating
                    rating={rating}
                    setRating={setRating}
                    setHoveredStar={setHoveredStar}
                    hoveredStar={hoveredStar}
                />

                {/* Review Text */}
                <div>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Share your experience..."
                        className="plasmo-w-full plasmo-p-3 plasmo-border plasmo-border-gray-200 plasmo-rounded-lg plasmo-text-sm plasmo-resize-none focus:plasmo-ring-1 focus:plasmo-ring-gray-400 focus:plasmo-border-gray-400 plasmo-transition-colors plasmo-bg-white"
                        rows={3}
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmitReview}
                    // disabled={rating === 0 || !review.trim() || reviewSubmission.isLoading || !userInfo?.email}
                    disabled={rating === 0 || !review.trim() || !userInfo?.email}
                    className="plasmo-w-full plasmo-bg-gray-900 plasmo-text-white hover:plasmo-bg-gray-800 plasmo-inline-flex plasmo-items-center plasmo-justify-center plasmo-gap-2 plasmo-whitespace-nowrap plasmo-rounded-md plasmo-text-sm plasmo-font-medium plasmo-ring-offset-background plasmo-transition-colors focus-visible:plasmo-outline-none focus-visible:plasmo-ring-2 focus-visible:plasmo-ring-ring focus-visible:plasmo-ring-offset-2 disabled:plasmo-pointer-events-none disabled:plasmo-opacity-50 plasmo-bg-primary plasmo-text-primary-foreground hover:plasmo-bg-primary/90 plasmo-h-11 plasmo-px-8"
                // className={`plasmo-w-full plasmo-py-2.5 plasmo-px-4 plasmo-rounded-lg plasmo-text-sm plasmo-font-medium plasmo-transition-all plasmo-duration-200 plasmo-flex plasmo-items-center plasmo-justify-center plasmo-space-x-2 ${rating > 0 && review.trim() && !reviewSubmission.isLoading && userInfo?.email
                //     ? "plasmo-bg-gray-900 plasmo-text-white hover:plasmo-bg-gray-800"
                //     : "plasmo-bg-gray-200 plasmo-text-gray-500 plasmo-cursor-not-allowed"
                //     }`}
                >
                    {isLoading ? (
                        <div className="plasmo-flex plasmo-items-center plasmo-space-x-2">
                            <div className="plasmo-w-4 plasmo-h-4 plasmo-border-2 plasmo-border-primary-foreground plasmo-border-t-transparent plasmo-rounded-full plasmo-animate-spin" />
                            <span>Submittingss...</span>
                        </div>
                    ) : (
                        "Submit Review"
                    )}
                </button>
            </div>
        </div>
    )
}

export default RatingSection