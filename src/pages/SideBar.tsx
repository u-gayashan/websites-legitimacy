import { useEffect, useState } from "react"

import { TrendingUp, Shield, Users, Eye } from "lucide-react"
import {
    ScrollArea,
    ScrollAreaViewport
} from "@radix-ui/react-scroll-area";

import ReviewAnalysisSkeleton from "~components/skeltons/ReviewAnalysisSkeleton";
import WebsiteInfoSkeleton from "~components/skeltons/WebsiteInfoSkeleton";
import RatingSectionSkeleton from "~components/skeltons/RatingSectionSkeleton";
import QuickStatsGridSkeleton from "~components/skeltons/QuickStatsGridSkeleton";
import WebsiteAnalysisCardSkelton from "~components/skeltons/WebsiteAnalysisCardSkelton";
import WebsiteAnalysisCard from "~components/sidebar/WebsiteAnalysisCard";
import QuickStatsGrid from "~components/sidebar/QuickStatsGrid";
import SentimentBars from "~components/sidebar/SentimentBars";
import SummaryNumbers from "~components/sidebar/SummaryNumbers";
import WebsiteInfo from "~components/sidebar/WebsiteInfo";
import ScrollAreaProperties from "~components/sidebar/ScrollAreaProperties";
import ReviewConfirmationCard from "~components/sidebar/ReviewConfirmationCard";
import RatingSection from "~components/sidebar/RatingSection";
import ProfileMenu from "~components/sidebar/ProfileMenu";

import { useReview } from "~hooks/useReview";
import { useAnalyse } from "~hooks/useAnalyse";

interface SideBarProps {
    isOpen?: boolean
    userInfo: { name: string; email: string, picture: string } | null
}

export const SideBar = ({ isOpen, userInfo }: SideBarProps) => {
    const [hoveredStar, setHoveredStar] = useState(0)
    const [isVisible, setIsVisible] = useState(true);
    const [isVisible2, setIsVisible2] = useState(true);

    const {
        rating,
        setRating,
        review,
        setReview,
        handleSubmitReview,
        reviewSubmission,
        isReviewed,
        reviewSubmittedDateTime,
        checkReviewExistsError
    } = useReview(userInfo, window.location.hostname, isOpen);

    const { sslData, analysis, isLoading } = useAnalyse(isOpen);
    // console.log(sslStatus);
    console.log(sslData);


    const averageRating = analysis?.reviewAnalysis.averageRating;
    const negativePercentage = analysis?.reviewAnalysis.negativePercentage;
    const positivePercentage = analysis?.reviewAnalysis.positivePercentage;
    const neutralPercentage = analysis?.reviewAnalysis.neutralPercentage;
    const totalReviews = analysis?.reviewAnalysis.totalReviews || 0;
    const trustScore = analysis?.reviewAnalysis.trustScore || 0;

    const description = analysis?.websiteInfo?.description || "No description available for this website.";
    const attributes = analysis?.websiteInfo?.attributes || [];

    const reviewData = {
        positive: positivePercentage,
        negative: negativePercentage,
        neutral: neutralPercentage,
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible2(false);
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [])


    const websiteData = {
        url: "https://example.com",
        domainAge: "15 years, 3 months",
        nameServers: ["ns1.example.com", "ns2.example.com"],
        authority: "High",
        sslStatus: "Valid",
        lastUpdated: "2 hours ago"
    }

    const webSiteAnalysisData = attributes

    const handleLogout = async () => {
        try {
            const response = await chrome.runtime.sendMessage({ type: "SIGN_OUT" });
            console.log(response);
            if (response?.success) {
                await chrome.runtime.sendMessage({ type: "BROADCAST_CLOSE_SIDEBAR" });
            } else {
                console.warn("Failed to sign out");
            }
        } catch (error) {
            console.error("Error while signing out:", error);
        }
    };

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

                        <ProfileMenu
                            userInfo={userInfo}
                            onLogout={() => {
                                handleLogout();
                                console.log("User logging out")
                            }}
                        />

                    </div>
                </div>

                {/* Website Analysis Card */}

                <div className="plasmo-px-6 plasmo-py-4 plasmo-border-b plasmo-border-gray-100 plasmo-bg-gray-50">
                    {isVisible ? (
                        <WebsiteAnalysisCardSkelton />
                    ) : (
                        <WebsiteAnalysisCard
                            domainAge={websiteData.domainAge}
                            authority={websiteData.authority}
                            sslStatus={websiteData.sslStatus}
                            lastUpdated={websiteData.lastUpdated}
                        />
                    )}
                </div>


                {/* Scrollable Content */}
                <div className="plasmo-flex-1 plasmo-overflow-hidden">
                    <ScrollArea className="plasmo-h-full plasmo-w-full">
                        <ScrollAreaViewport className="plasmo-h-full plasmo-w-full plasmo-rounded">
                            <div className="plasmo-px-6 plasmo-py-5 plasmo-space-y-6">

                                {isVisible2 ? (
                                    <>
                                        <QuickStatsGridSkeleton />
                                        <ReviewAnalysisSkeleton />
                                        <WebsiteInfoSkeleton />
                                        <RatingSectionSkeleton />
                                    </>
                                ) : (
                                    <>
                                        {/* Quick Stats Grid */}
                                        <QuickStatsGrid sslData={sslData} />
                                        {/* {insights.map((insight, index) => (
                                                <QuickStatsGrid key={index}
                                                    icon={insight.icon}
                                                    value={insight.value}
                                                    label={insight.label}
                                                />
                                            ))} */}

                                        {/* Review Analysis */}
                                        <div className="plasmo-space-y-4">
                                            <h2 className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-900 plasmo-flex plasmo-items-center">
                                                <TrendingUp className="plasmo-w-4 plasmo-h-4 plasmo-mr-2 plasmo-text-gray-400" />
                                                Review Analysis
                                            </h2>

                                            <div className="plasmo-bg-gray-50 plasmo-rounded-lg plasmo-p-5">
                                                {isLoading ? (
                                                    <WebsiteInfoSkeleton />
                                                ) : (
                                                    <div className="plasmo-space-y-4">
                                                        {/* Sentiment Bars */}
                                                        <div className="plasmo-space-y-3">
                                                            {["positive", "negative", "neutral"].map((sentimentKey) => (
                                                                <div key={sentimentKey}>
                                                                    <SentimentBars
                                                                        sentimentKey={sentimentKey}
                                                                        sentimentValue={reviewData[sentimentKey as keyof typeof reviewData]}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Summary Numbers */}
                                                        <div className="plasmo-grid plasmo-grid-cols-3 plasmo-gap-4 plasmo-pt-4 plasmo-border-t plasmo-border-gray-200">
                                                            <SummaryNumbers totalReviews={totalReviews} averageRating={averageRating} trustScore={trustScore} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Website Info */}
                                        {isLoading ? (
                                            <WebsiteInfoSkeleton />
                                        ) : (
                                            <WebsiteInfo webSiteAnalysis={description} tags={webSiteAnalysisData} />
                                        )}

                                        {/* Rating Section */}
                                        {checkReviewExistsError ? (
                                            <div className="plasmo-text-red-500 plasmo-text-sm plasmo-p-4 plasmo-bg-red-50 plasmo-rounded">
                                                {checkReviewExistsError}
                                            </div>
                                        ) : isReviewed && reviewSubmission.isSubmitted ? (
                                            <ReviewConfirmationCard submittedDateTime={reviewSubmittedDateTime} />
                                        ) : (
                                            <RatingSection
                                                rating={rating}
                                                setRating={setRating}
                                                hoveredStar={hoveredStar}
                                                setHoveredStar={setHoveredStar}
                                                review={review}
                                                setReview={setReview}
                                                handleSubmitReview={handleSubmitReview}
                                                userInfo={userInfo}
                                                isLoading={reviewSubmission.isLoading}
                                            />
                                        )}

                                    </>
                                )}
                            </div>
                        </ScrollAreaViewport>
                        <>
                            <ScrollAreaProperties />
                        </>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}
