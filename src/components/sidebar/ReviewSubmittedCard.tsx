import React, { useState } from 'react'
import { Star, Shield, CheckCircle, Calendar, Clock } from "lucide-react"



interface ReviewSubmissionProps {
    websiteUrl?: string
    userEmail?: string
}

const formatSubmissionDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date)
}

const ReviewSubmittedCard = ({ websiteUrl, userEmail }: ReviewSubmissionProps) => {
    const [reviewSubmission, setReviewSubmission] = useState<{
        isSubmitted: boolean
        submissionDate?: Date
        submittedRating?: number
        submittedContent?: string
        error?: string
    }>({
        isSubmitted: false
    })

    return (
        <>
            <div className="plasmo-w-full plasmo-max-w-md plasmo-mx-auto plasmo-bg-background plasmo-rounded-lg plasmo-border plasmo-shadow-sm">
                <div className="plasmo-text-center plasmo-pb-4 plasmo-flex plasmo-flex-col plasmo-space-y-1.5 plasmo-p-6">
                    <div className="plasmo-mx-auto plasmo-w-16 plasmo-h-16 plasmo-bg-primary/10 plasmo-rounded-full plasmo-flex plasmo-items-center plasmo-justify-center plasmo-mb-4">
                        <CheckCircle className="plasmo-w-8 plasmo-h-8 plasmo-text-primar plasmo-text-green-400" />
                    </div>
                    <h3 className="plasmo-text-xl plasmo-font-semibold plasmo-leading-none plasmo-tracking-tight plasmo-text-gray-900">
                        Review Submitted Successfully!
                    </h3>
                </div>

                <div className="plasmo-p-6 plasmo-pt-0 plasmo-space-y-6">
                    {/* Submitted Review Details */}
                    <div className="plasmo-bg-muted/50 plasmo-rounded-lg plasmo-p-4 plasmo-space-y-3">
                        <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                            <span className="plasmo-text-sm plasmo-font-medium plasmo-text-muted-foreground plasmo-text-gray-900">Your Rating</span>
                            <div className="plasmo-flex plasmo-items-center plasmo-space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`plasmo-w-4 plasmo-h-4 ${star <= (reviewSubmission.submittedRating || 0)
                                            ? "plasmo-fill-primary plasmo-text-primary"
                                            : "plasmo-text-muted-foreground"
                                            }`}
                                    />
                                ))}
                                <span className="plasmo-ml-2 plasmo-text-sm plasmo-font-medium plasmo-text-foreground plasmo-text-gray-900">
                                    {reviewSubmission.submittedRating}/5
                                </span>
                            </div>
                        </div>

                        <div className="plasmo-space-y-2">
                            <span className="plasmo-text-sm plasmo-font-medium plasmo-text-muted-foreground plasmo-text-gray-900">Your Review</span>
                            <p className="plasmo-text-sm plasmo-text-foreground plasmo-leading-relaxed plasmo-bg-background/50 plasmo-p-3 plasmo-rounded plasmo-border plasmo-text-gray-900">
                                {/* {reviewSubmission.submittedContent} */}
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, deserunt dolor. Ratione, architecto? Ducimus officiis adipisci ullam architecto impedit. Voluptatibus, ullam exercitationem expedita accusamus molestias quisquam reprehenderit et saepe unde?
                            </p>
                        </div>
                    </div>

                    {/* Submission Details */}
                    <div className="plasmo-space-y-3 plasmo-text-gray-900">
                        <div className="plasmo-flex plasmo-items-center plasmo-justify-between plasmo-py-2 plasmo-border-b">
                            <div className="plasmo-flex plasmo-items-center plasmo-space-x-2">
                                <Calendar className="plasmo-w-4 plasmo-h-4 plasmo-text-muted-foreground" />
                                <span className="plasmo-text-sm plasmo-text-muted-foreground plasmo-text-gray-900">Submitted</span>
                            </div>
                            <span className="plasmo-text-sm plasmo-font-medium plasmo-text-foreground">
                                {formatSubmissionDate(reviewSubmission.submissionDate)}
                            </span>
                        </div>

                        <div className="plasmo-flex plasmo-items-center plasmo-justify-between plasmo-py-2 plasmo-border-b">
                            <div className="plasmo-flex plasmo-items-center plasmo-space-x-2">
                                <Shield className="plasmo-w-4 plasmo-h-4 plasmo-text-muted-foreground" />
                                <span className="plasmo-text-sm plasmo-text-muted-foreground plasmo-text-gray-900">Website</span>
                            </div>
                            <span className="plasmo-text-sm plasmo-font-medium plasmo-text-foreground">google.com</span>
                        </div>

                        <div className="plasmo-flex plasmo-items-center plasmo-justify-between plasmo-py-2">
                            <div className="plasmo-flex plasmo-items-center plasmo-space-x-2">
                                <Clock className="plasmo-w-4 plasmo-h-4 plasmo-text-muted-foreground" />
                                <span className="plasmo-text-sm plasmo-text-muted-foreground plasmo-text-gray-900">Status</span>
                            </div>
                            <span className="plasmo-inline-flex plasmo-items-center plasmo-text-gray-900 plasmo-rounded-full plasmo-border plasmo-px-2.5 plasmo-py-0.5 plasmo-text-xs plasmo-font-semibold plasmo-transition-colors plasmo-bg-accent/50 plasmo-text-accent-foreground">
                                Pending Approval
                            </span>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="plasmo-bg-primary/5 plasmo-rounded-lg plasmo-p-4 plasmo-text-center">
                        <p className="plasmo-text-sm plasmo-text-muted-foreground plasmo-leading-relaxed plasmo-text-gray-900">
                            Thank you for your feedback! Your review is being processed and will be visible once approved by our moderation team.
                        </p>
                    </div>

                    <button
                        className="plasmo-w-full plasmo-text-gray-900 plasmo-inline-flex plasmo-items-center plasmo-justify-center plasmo-gap-2 plasmo-whitespace-nowrap plasmo-rounded-md plasmo-text-sm plasmo-font-medium plasmo-ring-offset-background plasmo-transition-colors focus-visible:plasmo-outline-none focus-visible:plasmo-ring-2 focus-visible:plasmo-ring-ring focus-visible:plasmo-ring-offset-2 disabled:plasmo-pointer-events-none disabled:plasmo-opacity-50 plasmo-border plasmo-border-input plasmo-bg-background hover:plasmo-bg-accent hover:plasmo-text-accent-foreground plasmo-h-10 plasmo-px-4 plasmo-py-2"
                        onClick={() => setReviewSubmission({ isSubmitted: false })}
                    >
                        Submit Another Review
                    </button>
                </div>
            </div>

        </>
    )
}

export default ReviewSubmittedCard