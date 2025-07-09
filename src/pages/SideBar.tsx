import { useEffect, useState } from "react"

import { Star, TrendingUp, Shield, Users, Eye, ChevronRight, Settings, LogOut, Globe, Calendar, Server, Award } from "lucide-react"
import {
    ScrollArea,
    ScrollAreaViewport,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaCorner
} from "@radix-ui/react-scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

import Skeleton from 'react-loading-skeleton';
import SideBarHeader from "~components/sidebar/SideBarHeader"

interface SideBarProps {
    isOpen?: boolean
    userInfo: { name: string; email: string, picture: string } | null
}

export const SideBar = ({ isOpen, userInfo }: SideBarProps) => {
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const [hoveredStar, setHoveredStar] = useState(0)
    const [isVisible, setIsVisible] = useState(true);
    const [isVisible2, setIsVisible2] = useState(true);
    console.log(userInfo);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 10000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible2(false);
        }, 12000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    const handleSubmitReview = () => {
        if (rating > 0 && review.trim()) {
            console.log("Submitting review:", { rating, review })
            // Handle review submission here
            setReview("")
            setRating(0)
        }
    }

    const websiteData = {
        url: "https://example.com",
        domain: "example.com",
        domainAge: "15 years, 3 months",
        nameServers: ["ns1.example.com", "ns2.example.com"],
        authority: "High",
        sslStatus: "Valid",
        lastUpdated: "2 hours ago"
    }

    const insights = [
        { icon: Shield, label: "Security", value: "A+", color: "text-slate-600" },
        { icon: Users, label: "Trust Score", value: "94%", color: "text-slate-600" },
        { icon: Eye, label: "Visibility", value: "High", color: "text-slate-600" },
        { icon: TrendingUp, label: "Growth", value: "+12%", color: "text-slate-600" },
    ]
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
                plasmo-fixed plasmo-top-0 plasmo-right-0 plasmo-h-screen plasmo-w-[450px] 
                plasmo-bg-white plasmo-shadow-2xl plasmo-z-50
                plasmo-transform plasmo-transition-transform plasmo-duration-300 plasmo-ease-in-out
                ${isOpen ? "plasmo-translate-x-0" : "plasmo-translate-x-full"}
                plasmo-border-l plasmo-border-gray-200
            `}
        >
            <div className="plasmo-flex plasmo-flex-col plasmo-h-full plasmo-overflow-hidden">
                {/* Header */}
                {/* <SideBarHeader isOpen={isOpen} userInfo={userInfo} />    */}

                <div className="plasmo-px-6 plasmo-py-5 plasmo-border-b plasmo-border-gray-100">
                    <div className="plasmo-flex plasmo-justify-between plasmo-items-center">
                        <div className="plasmo-flex plasmo-items-center plasmo-space-x-3">
                            {/* Logo */}
                            <div className="plasmo-w-8 plasmo-h-8 plasmo-bg-gradient-to-br plasmo-from-blue-500 plasmo-to-purple-600 plasmo-rounded-lg plasmo-flex plasmo-items-center plasmo-justify-center">
                                <Shield className="plasmo-w-5 plasmo-h-5 plasmo-text-white" />
                            </div>
                            <div>
                                <h1 className="plasmo-text-lg plasmo-font-semibold plasmo-text-black">Trust Guard</h1>
                                {/* <p className="plasmo-text-sm plasmo-text-gray-500">Website Analysis</p> */}
                            </div>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="plasmo-flex plasmo-items-center plasmo-space-x-2 plasmo-cursor-pointer hover:plasmo-bg-gray-50 plasmo-rounded-lg plasmo-p-2 plasmo-transition-colors">
                                    {userInfo && (
                                        <>
                                            <div className="plasmo-text-right">
                                                <p className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-900">{userInfo.name}</p>
                                                <p className="plasmo-text-xs plasmo-text-gray-500">{userInfo.email}</p>
                                            </div>
                                            <Avatar className="plasmo-w-10 plasmo-h-10 plasmo-border-gray-200">
                                                <AvatarImage
                                                    className="plasmo-rounded-full"
                                                    src={userInfo.picture}
                                                    alt="User Avatar"
                                                />
                                                <AvatarFallback className="plasmo-bg-gray-100 plasmo-text-gray-500 plasmo-font-medium">
                                                    {userInfo.name?.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </>
                                    )}
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="plasmo-w-48 plasmo-bg-white plasmo-shadow-lg">
                                <DropdownMenuItem className="plasmo-cursor-pointer plasmo-text-black plasmo-flex plasmo-items-center plasmo-p-2 hover:plasmo-text-gray-400">
                                    <Settings className="plasmo-w-4 plasmo-h-4 plasmo-mr-2" />
                                    <p>Settings</p>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="plasmo-flex plasmo-cursor-pointer plasmo-text-red-600 plasmo-items-center plasmo-p-2 hover:plasmo-bg-red-50">
                                    <LogOut className="plasmo-w-4 plasmo-h-4 plasmo-mr-2" />
                                    <p>Logout</p>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                {/* Website Analysis Card */}

                <div className="plasmo-px-6 plasmo-py-4 plasmo-border-b plasmo-border-gray-100 plasmo-bg-gray-50">
                    {isVisible ? (
                        <div className="plasmo-bg-white plasmo-rounded-lg plasmo-shadow-sm plasmo-p-4">
                            <div className="plasmo-space-y-3">
                                <div className="plasmo-flex plasmo-items-center plasmo-space-x-2">
                                    <div className="plasmo-w-5 plasmo-h-5 plasmo-bg-gray-200 plasmo-rounded"></div>
                                    <div className="plasmo-w-32 plasmo-h-4 plasmo-bg-gray-200 plasmo-rounded"></div>
                                </div>
                                <div className="plasmo-w-full plasmo-h-3 plasmo-bg-gray-200 plasmo-rounded"></div>
                                <div className="plasmo-grid plasmo-grid-cols-2 plasmo-gap-3">
                                    <div className="plasmo-space-y-2">
                                        <div className="plasmo-w-16 plasmo-h-3 plasmo-bg-gray-200 plasmo-rounded"></div>
                                        <div className="plasmo-w-20 plasmo-h-3 plasmo-bg-gray-200 plasmo-rounded"></div>
                                    </div>
                                    <div className="plasmo-space-y-2">
                                        <div className="plasmo-w-14 plasmo-h-3 plasmo-bg-gray-200 plasmo-rounded"></div>
                                        <div className="plasmo-w-12 plasmo-h-3 plasmo-bg-gray-200 plasmo-rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="plasmo-bg-white plasmo-rounded-md plasmo-shadow-lg plasmo-p-4">
                            <div className="plasmo-space-y-3">
                                <div className="plasmo-flex plasmo-items-center plasmo-space-x-2">
                                    <Globe className="plasmo-w-5 plasmo-h-5 plasmo-text-blue-500" />
                                    <h3 className="plasmo-font-medium plasmo-text-gray-900">Website Analysis</h3>
                                </div>

                                <div className="plasmo-space-y-2">
                                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                                        <span className="plasmo-text-sm plasmo-text-gray-600">Domain:</span>
                                        <span className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-900">{websiteData.domain}</span>
                                    </div>

                                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                                        <span className="plasmo-text-sm plasmo-text-gray-600 plasmo-flex plasmo-items-center">
                                            <Calendar className="plasmo-w-3 plasmo-h-3 plasmo-mr-1" />
                                            Age:
                                        </span>
                                        <span className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-900">{websiteData.domainAge}</span>
                                    </div>

                                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                                        <span className="plasmo-text-sm plasmo-text-gray-600 plasmo-flex plasmo-items-center">
                                            <Server className="plasmo-w-3 plasmo-h-3 plasmo-mr-1" />
                                            Authority:
                                        </span>
                                        <span className="plasmo-text-sm plasmo-font-medium plasmo-text-green-600 plasmo-flex plasmo-items-center">
                                            <Award className="plasmo-w-3 plasmo-h-3 plasmo-mr-1" />
                                            {websiteData.authority}
                                        </span>
                                    </div>

                                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                                        <span className="plasmo-text-sm plasmo-text-gray-600">SSL Status:</span>
                                        <span className="plasmo-text-sm plasmo-font-medium plasmo-text-green-600">{websiteData.sslStatus}</span>
                                    </div>
                                </div>

                                <div className="plasmo-pt-2 plasmo-border-t plasmo-border-gray-100">
                                    <p className="plasmo-text-xs plasmo-text-gray-500">
                                        Last updated: {websiteData.lastUpdated}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                {/* Scrollable Content */}
                <div className="plasmo-flex-1 plasmo-overflow-hidden">
                    <ScrollArea className="plasmo-h-full plasmo-w-full">
                        <ScrollAreaViewport className="plasmo-h-full plasmo-w-full plasmo-rounded">
                            <div className="plasmo-px-6 plasmo-py-5 plasmo-space-y-6">

                                {isVisible2 ? (
                                    <>
                                        {/* Quick Stats Grid Skeleton */}
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

                                        {/* Review Analysis Skeleton */}
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

                                        {/* Website Info Skeleton */}
                                        <div className="plasmo-space-y-3">
                                            <div className="plasmo-flex plasmo-items-center">
                                                <div className="plasmo-w-4 plasmo-h-4 plasmo-bg-gray-200 plasmo-rounded plasmo-mr-2"></div>
                                                <div className="plasmo-w-24 plasmo-h-4 plasmo-bg-gray-200 plasmo-rounded"></div>
                                            </div>
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

                                        {/* Rating Section Skeleton */}
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
                                    </>
                                ) : (
                                    // Render actual content here...
                                    <>
                                        {/* Quick Stats Grid */}
                                        <div className="plasmo-grid plasmo-grid-cols-2 plasmo-gap-3">
                                            {insights.map((insight, index) => (
                                                <div
                                                    key={index}
                                                    className="plasmo-bg-gray-50 plasmo-rounded-lg plasmo-p-4 hover:plasmo-bg-gray-100 plasmo-transition-colors plasmo-cursor-pointer"
                                                >
                                                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between plasmo-mb-2">
                                                        <insight.icon className="plasmo-w-4 plasmo-h-4 plasmo-text-gray-400" />
                                                        <ChevronRight className="plasmo-w-3 plasmo-h-3 plasmo-text-gray-300" />
                                                    </div>
                                                    <div className="plasmo-text-lg plasmo-font-semibold plasmo-text-gray-900 plasmo-mb-1">
                                                        {insight.value}
                                                    </div>
                                                    <div className="plasmo-text-xs plasmo-text-gray-500">{insight.label}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Review Analysis */}
                                        <div className="plasmo-space-y-4">
                                            <h2 className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-900 plasmo-flex plasmo-items-center">
                                                <TrendingUp className="plasmo-w-4 plasmo-h-4 plasmo-mr-2 plasmo-text-gray-400" />
                                                Review Analysis
                                            </h2>

                                            <div className="plasmo-bg-gray-50 plasmo-rounded-lg plasmo-p-5">
                                                <div className="plasmo-space-y-4">
                                                    {/* Sentiment Bars */}
                                                    <div className="plasmo-space-y-3">
                                                        {["positive", "negative", "neutral"].map((sentiment) => (
                                                            <div key={sentiment}>
                                                                <div className="plasmo-flex plasmo-items-center plasmo-justify-between plasmo-text-sm">
                                                                    <span className="plasmo-text-gray-600">
                                                                        {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                                                                    </span>
                                                                    <span className="plasmo-font-medium plasmo-text-gray-900">
                                                                        {reviewData[sentiment]}%
                                                                    </span>
                                                                </div>
                                                                <div className="plasmo-w-full plasmo-bg-gray-200 plasmo-rounded-full plasmo-h-2">
                                                                    <div
                                                                        className={`plasmo-h-2 plasmo-rounded-full plasmo-transition-all plasmo-duration-500 ${sentiment === "positive"
                                                                            ? "plasmo-bg-gray-900"
                                                                            : sentiment === "negative"
                                                                                ? "plasmo-bg-gray-400"
                                                                                : "plasmo-bg-gray-300"
                                                                            }`}
                                                                        style={{ width: `${reviewData[sentiment]}%` }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Summary Numbers */}
                                                    <div className="plasmo-grid plasmo-grid-cols-3 plasmo-gap-4 plasmo-pt-4 plasmo-border-t plasmo-border-gray-200">
                                                        <div className="plasmo-text-center">
                                                            <div className="plasmo-text-xl plasmo-font-semibold plasmo-text-gray-900">
                                                                {summaryData.totalReviews.toLocaleString()}
                                                            </div>
                                                            <div className="plasmo-text-xs plasmo-text-gray-500 plasmo-mt-1">Reviews</div>
                                                        </div>

                                                        <div className="plasmo-text-center">
                                                            <div className="plasmo-text-xl plasmo-font-semibold plasmo-text-gray-900">
                                                                {summaryData.averageRating}
                                                            </div>
                                                            <div className="plasmo-text-xs plasmo-text-gray-500 plasmo-mt-1">Rating</div>
                                                        </div>

                                                        <div className="plasmo-text-center">
                                                            <div className="plasmo-text-xl plasmo-font-semibold plasmo-text-gray-900">
                                                                {summaryData.trustScore}/10
                                                            </div>
                                                            <div className="plasmo-text-xs plasmo-text-gray-500 plasmo-mt-1">Trust</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Website Info */}
                                        <div className="plasmo-space-y-3">
                                            <h2 className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-900 plasmo-flex plasmo-items-center">
                                                <Shield className="plasmo-w-4 plasmo-h-4 plasmo-mr-2 plasmo-text-gray-400" />
                                                Website Info
                                            </h2>
                                            <div className="plasmo-bg-gray-50 plasmo-rounded-lg plasmo-p-4">
                                                <p className="plasmo-text-sm plasmo-text-gray-600 plasmo-leading-relaxed plasmo-mb-3">
                                                    This website demonstrates strong security practices and maintains excellent user trust.
                                                    Our analysis shows consistent performance and positive user feedback.
                                                </p>
                                                <div className="plasmo-flex plasmo-flex-wrap plasmo-gap-2">
                                                    {["Secure", "Reliable", "Trusted"].map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="plasmo-px-2 plasmo-py-1 plasmo-bg-white plasmo-text-gray-700 plasmo-text-xs plasmo-rounded plasmo-border"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Rating Section */}
                                        <div className="plasmo-space-y-4">
                                            <h2 className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-900 plasmo-flex plasmo-items-center">
                                                <Star className="plasmo-w-4 plasmo-h-4 plasmo-mr-2 plasmo-text-gray-400" />
                                                Rate This Website
                                            </h2>

                                            <div className="plasmo-bg-gray-50 plasmo-rounded-lg plasmo-p-4 plasmo-space-y-4">
                                                {/* Star Rating */}
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
                                                    disabled={rating === 0 || !review.trim()}
                                                    className={`plasmo-w-full plasmo-py-2.5 plasmo-px-4 plasmo-rounded-lg plasmo-text-sm plasmo-font-medium plasmo-transition-all plasmo-duration-200 ${rating > 0 && review.trim()
                                                        ? "plasmo-bg-gray-900 plasmo-text-white hover:plasmo-bg-gray-800"
                                                        : "plasmo-bg-gray-200 plasmo-text-gray-500 plasmo-cursor-not-allowed"
                                                        }`}
                                                >
                                                    Submit Review
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </ScrollAreaViewport>
                        <ScrollAreaScrollbar
                            className="plasmo-flex plasmo-select-none plasmo-touch-none plasmo-p-0.5 plasmo-bg-gray-100 plasmo-transition-colors"
                            orientation="vertical"
                        >
                            <ScrollAreaThumb className="plasmo-flex-1 plasmo-bg-gray-400 plasmo-rounded-[10px] plasmo-relative" />
                        </ScrollAreaScrollbar>

                        <ScrollAreaCorner className="plasmo-bg-gray-200" />
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}
