import React from 'react'
import { CheckCircle, Clock, Calendar } from "lucide-react"

interface ReviewConfirmationProps {
    submittedDateTime: string;
}

const ReviewConfirmationCard = ({ submittedDateTime }: ReviewConfirmationProps) => {
  
    return (
        <div className="plasmo-bg-white plasmo-rounded-md plasmo-shadow-lg plasmo-p-4">
            <div className="plasmo-space-y-3">
                <div className="plasmo-flex plasmo-items-center plasmo-space-x-2">
                    <CheckCircle className="plasmo-w-5 plasmo-h-5 plasmo-text-green-500" />
                    <h3 className="plasmo-font-medium plasmo-text-gray-900">Review Submitted!</h3>
                </div>

                <div className="plasmo-space-y-2">
                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                        <span className="plasmo-text-sm plasmo-text-gray-600 plasmo-flex plasmo-items-center">
                            <Calendar className="plasmo-w-3 plasmo-h-3 plasmo-mr-1" />
                            Submitted:
                        </span>
                        <span className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-900">{submittedDateTime}</span>
                    </div>

                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                        <span className="plasmo-text-sm plasmo-text-gray-600">Status:</span>
                        <span className="plasmo-text-sm plasmo-font-medium plasmo-text-orange-500 plasmo-flex plasmo-items-center plasmo-px-2 plasmo-py-0.5 plasmo-rounded-full plasmo-bg-orange-100">
                            <Clock className="plasmo-w-3 plasmo-h-3 plasmo-mr-1" />
                            Pending Approval
                        </span>
                    </div>
                </div>

                <div className="plasmo-pt-2 plasmo-border-t plasmo-border-gray-100">
                    <p className="plasmo-text-xs plasmo-text-gray-500">
                        Your review is awaiting moderation. Thank you for your contribution!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ReviewConfirmationCard