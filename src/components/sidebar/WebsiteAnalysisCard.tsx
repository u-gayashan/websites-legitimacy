import React from 'react'
import { Globe, Calendar, Server, Award } from "lucide-react"

interface WebsiteAnalysisProps {
    domainAge: string;
    authority: string;
    sslStatus: string;
    lastUpdated: string;
}

const WebsiteAnalysisCard = ({ domainAge, authority, sslStatus, lastUpdated }: WebsiteAnalysisProps) => {
    return (
        <div className="plasmo-bg-white plasmo-rounded-md plasmo-shadow-lg plasmo-p-4">
            <div className="plasmo-space-y-3">
                <div className="plasmo-flex plasmo-items-center plasmo-space-x-2">
                    <Globe className="plasmo-w-5 plasmo-h-5 plasmo-text-blue-500" />
                    <h3 className="plasmo-font-medium plasmo-text-gray-900">Website Analysis</h3>
                </div>

                <div className="plasmo-space-y-2">
                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                        <span className="plasmo-text-sm plasmo-text-gray-600">Domain:</span>
                        <span className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-900">{window.location.hostname}</span>
                    </div>

                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                        <span className="plasmo-text-sm plasmo-text-gray-600 plasmo-flex plasmo-items-center">
                            <Calendar className="plasmo-w-3 plasmo-h-3 plasmo-mr-1" />
                            Age:
                        </span>
                        <span className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-900">{domainAge}</span>
                    </div>

                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                        <span className="plasmo-text-sm plasmo-text-gray-600 plasmo-flex plasmo-items-center">
                            <Server className="plasmo-w-3 plasmo-h-3 plasmo-mr-1" />
                            Authority:
                        </span>
                        <span className="plasmo-text-sm plasmo-font-medium plasmo-text-green-600 plasmo-flex plasmo-items-center">
                            <Award className="plasmo-w-3 plasmo-h-3 plasmo-mr-1" />
                            {authority}
                        </span>
                    </div>

                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                        <span className="plasmo-text-sm plasmo-text-gray-600">SSL Status:</span>
                        {window.location.protocol === "https:" ? (
                            <span className="plasmo-text-sm plasmo-font-medium plasmo-text-green-600">Secure</span>
                        ) : (
                            <span className="plasmo-text-sm plasmo-font-medium plasmo-text-red-600">Not Secure</span>
                        )}
                    </div>
                </div>

                <div className="plasmo-pt-2 plasmo-border-t plasmo-border-gray-100">
                    <p className="plasmo-text-xs plasmo-text-gray-500">
                        Last updated: {lastUpdated}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default WebsiteAnalysisCard