import React from 'react'

interface StarRatingProps {
    rating: number
    setRating: (rating: number) => void
    setHoveredStar: (star: number) => void
    hoveredStar: number
}

const StarRating = ({ rating, setRating, setHoveredStar, hoveredStar }: StarRatingProps) => {
    return (
        <div>
            <div className="plasmo-flex plasmo-items-center plasmo-space-x-1 plasmo-mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        className="plasmo-text-2xl plasmo-transition-colors plasmo-duration-150 hover:plasmo-scale-110"
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => setRating(star)}
                    >
                        <span
                            className={
                                star <= (hoveredStar || rating)
                                    ? "plasmo-text-gray-900"
                                    : "plasmo-text-gray-300"
                            }
                        >
                            ★
                        </span>
                    </button>
                ))}
            </div>
            {rating > 0 && (
                <span className="plasmo-text-sm plasmo-text-gray-600">
                    {rating} star{rating !== 1 ? "s" : ""}
                </span>
            )}
        </div>
    )
}

export default StarRating