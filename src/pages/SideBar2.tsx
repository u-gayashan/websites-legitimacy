import { useState, useEffect } from "react"
import { Star, TrendingUp, Shield, Users, Eye, ChevronRight, Settings, LogOut, Globe, Calendar, Server, Award } from "lucide-react"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import Skeleton from 'react-loading-skeleton';
// import { Card, CardContent } from "@radix-ui/react-card"
    
interface SideBarProps {
    isOpen?: boolean
    userInfo: { name: string; email: string, picture: string } | null
}

export const SideBar = ({ isOpen, userInfo }: SideBarProps) => {
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const [hoveredStar, setHoveredStar] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    // Simulate loading for 2 seconds
    useEffect(() => {
        if (isOpen) {
            setIsLoading(true)
            const timer = setTimeout(() => {
                setIsLoading(false)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    const handleSubmitReview = () => {
        if (rating > 0 && review.trim()) {
            console.log("Submitting review:", { rating, review })
            setReview("")
            setRating(0)
        }
    }

    const handleLogout = () => {
        console.log("Logout clicked")
        // Handle logout logic here
    }

    const handleSettings = () => {
        console.log("Settings clicked")
        // Handle settings logic here
    }

    // Mock data for website analysis
    const websiteData = {
        url: "https://example.com",
        domain: "example.com",
        domainAge: "15 years, 3 months",
        nameServers: ["ns1.example.com", "ns2.example.com"],
        authority: "High",
        sslStatus: "Valid",
        lastUpdated: "2 hours ago"
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

    const insights = [
        { icon: Shield, label: "Security", value: "A+", color: "text-slate-600" },
        { icon: Users, label: "Trust Score", value: "94%", color: "text-slate-600" },
        { icon: Eye, label: "Visibility", value: "High", color: "text-slate-600" },
        { icon: TrendingUp, label: "Growth", value: "+12%", color: "text-slate-600" },
    ]

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 transition-opacity duration-300" />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed top-0 right-0 h-screen w-96 
                    bg-white border-l border-gray-200
                    shadow-xl z-50
                    transform transition-all duration-300 ease-out
                    ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}

                    {/* Website Analysis Card */}

                    {/* Scrollable Content - Using ScrollArea to hide scrollbar */}
                    <ScrollArea className="flex-1">
                        <div className="px-6 py-5 space-y-6">
                            {true ? (
                                // Loading skeletons
                                <>
                                    {/* Quick Stats Grid Skeleton */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {[...Array(4)].map((_, index) => (
                                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <Skeleton className="w-4 h-4" />
                                                    <Skeleton className="w-3 h-3" />
                                                </div>
                                                <Skeleton className="w-12 h-6 mb-1" />
                                                <Skeleton className="w-16 h-3" />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Review Analysis Skeleton */}
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <Skeleton className="w-4 h-4 mr-2" />
                                            <Skeleton className="w-32 h-4" />
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-5">
                                            <div className="space-y-4">
                                                {[...Array(3)].map((_, index) => (
                                                    <div key={index} className="space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <Skeleton className="w-16 h-3" />
                                                            <Skeleton className="w-8 h-3" />
                                                        </div>
                                                        <Skeleton className="w-full h-2 rounded-full" />
                                                    </div>
                                                ))}

                                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                                                    {[...Array(3)].map((_, index) => (
                                                        <div key={index} className="text-center">
                                                            <Skeleton className="w-12 h-6 mx-auto mb-1" />
                                                            <Skeleton className="w-10 h-3 mx-auto" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Website Info Skeleton */}
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <Skeleton className="w-4 h-4 mr-2" />
                                            <Skeleton className="w-24 h-4" />
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="space-y-2">
                                                <Skeleton className="w-full h-3" />
                                                <Skeleton className="w-full h-3" />
                                                <Skeleton className="w-3/4 h-3" />
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {[...Array(3)].map((_, index) => (
                                                    <Skeleton key={index} className="w-16 h-6 rounded-full" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rating Section Skeleton */}
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <Skeleton className="w-4 h-4 mr-2" />
                                            <Skeleton className="w-32 h-4" />
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                            <div className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, index) => (
                                                    <Skeleton key={index} className="w-8 h-8" />
                                                ))}
                                            </div>
                                            <Skeleton className="w-full h-20 rounded-lg" />
                                            <Skeleton className="w-full h-10 rounded-lg" />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                // Actual content
                                <>
                                    {/* Quick Stats Grid */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {insights.map((insight, index) => (
                                            <div
                                                key={index}
                                                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <insight.icon className="w-4 h-4 text-gray-400" />
                                                    <ChevronRight className="w-3 h-3 text-gray-300" />
                                                </div>
                                                <div className="text-lg font-semibold text-gray-900 mb-1">{insight.value}</div>
                                                <div className="text-xs text-gray-500">{insight.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Today's Activity */}
                                    <div className="space-y-4">
                                        <h2 className="text-sm font-medium text-gray-900 flex items-center">
                                            <TrendingUp className="w-4 h-4 mr-2 text-gray-400" />
                                            Review Analysis
                                        </h2>

                                        <div className="bg-gray-50 rounded-lg p-5">
                                            <div className="space-y-4">
                                                {/* Sentiment Bars */}
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600">Positive</span>
                                                        <span className="font-medium text-gray-900">{reviewData.positive}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                                                            style={{ width: `${reviewData.positive}%` }}
                                                        ></div>
                                                    </div>

                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600">Negative</span>
                                                        <span className="font-medium text-gray-900">{reviewData.negative}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-gray-400 h-2 rounded-full transition-all duration-500"
                                                            style={{ width: `${reviewData.negative}%` }}
                                                        ></div>
                                                    </div>

                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600">Neutral</span>
                                                        <span className="font-medium text-gray-900">{reviewData.neutral}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-gray-300 h-2 rounded-full transition-all duration-500"
                                                            style={{ width: `${reviewData.neutral}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                {/* Summary Numbers */}
                                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                                                    <div className="text-center">
                                                        <div className="text-xl font-semibold text-gray-900">
                                                            {summaryData.totalReviews.toLocaleString()}
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1">Reviews</div>
                                                    </div>

                                                    <div className="text-center">
                                                        <div className="text-xl font-semibold text-gray-900">
                                                            {summaryData.averageRating}
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1">Rating</div>
                                                    </div>

                                                    <div className="text-center">
                                                        <div className="text-xl font-semibold text-gray-900">
                                                            {summaryData.trustScore}/10
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1">Trust</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Website Info */}
                                    <div className="space-y-3">
                                        <h2 className="text-sm font-medium text-gray-900 flex items-center">
                                            <Shield className="w-4 h-4 mr-2 text-gray-400" />
                                            Website Info
                                        </h2>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                                This website demonstrates strong security practices and maintains excellent user trust.
                                                Our analysis shows consistent performance and positive user feedback.
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-2 py-1 bg-white text-gray-700 text-xs rounded border">
                                                    Secure
                                                </span>
                                                <span className="px-2 py-1 bg-white text-gray-700 text-xs rounded border">
                                                    Reliable
                                                </span>
                                                <span className="px-2 py-1 bg-white text-gray-700 text-xs rounded border">
                                                    Trusted
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rating Section */}
                                    <div className="space-y-4">
                                        <h2 className="text-sm font-medium text-gray-900 flex items-center">
                                            <Star className="w-4 h-4 mr-2 text-gray-400" />
                                            Rate This Website
                                        </h2>

                                        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                            {/* Star Rating */}
                                            <div>
                                                <div className="flex items-center space-x-1 mb-2">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            className="text-2xl transition-colors duration-150 hover:scale-110"
                                                            onMouseEnter={() => setHoveredStar(star)}
                                                            onMouseLeave={() => setHoveredStar(0)}
                                                            onClick={() => setRating(star)}
                                                        >
                                                            <span className={
                                                                star <= (hoveredStar || rating)
                                                                    ? "text-gray-900"
                                                                    : "text-gray-300"
                                                            }>
                                                                ★
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                                {rating > 0 && (
                                                    <span className="text-sm text-gray-600">
                                                        {rating} star{rating !== 1 ? "s" : ""}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Review Text */}
                                            <div>
                                                <textarea
                                                    value={review}
                                                    onChange={(e) => setReview(e.target.value)}
                                                    placeholder="Share your experience..."
                                                    className="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-colors bg-white"
                                                    rows={3}
                                                />
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                onClick={handleSubmitReview}
                                                disabled={rating === 0 || !review.trim()}
                                                className={`
                                                    w-full py-2.5 px-4 rounded-lg text-sm font-medium
                                                    transition-all duration-200
                                                    ${rating > 0 && review.trim()
                                                        ? "bg-gray-900 text-white hover:bg-gray-800"
                                                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                    }
                                                `}
                                            >
                                                Submit Review
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </>
    )
}