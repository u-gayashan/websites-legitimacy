import React from 'react'
import { Globe, Calendar, Server } from "lucide-react"

const WebsiteAnalysisCardSkelton = () => {
    return (
        <div className="plasmo-bg-white plasmo-rounded-lg plasmo-shadow-sm plasmo-p-4">
            <div className="plasmo-space-y-3">
                <div className="plasmo-flex plasmo-items-center plasmo-space-x-2">
                    <Globe className="plasmo-w-5 plasmo-h-5 plasmo-text-blue-500" />
                    <h3 className="plasmo-font-medium plasmo-text-gray-900">Website Analysis</h3>
                </div>
                <div className="plasmo-space-y-2">
                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                        <span className="plasmo-text-sm plasmo-text-gray-600">Domain:</span>
                        <div className="plasmo-w-[25%] plasmo-animate-pulse plasmo-h-4 plasmo-bg-gray-200 plasmo-rounded"></div>
                    </div>

                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                        <span className="plasmo-text-sm plasmo-text-gray-600 plasmo-flex plasmo-items-center">
                            <Calendar className="plasmo-w-3 plasmo-h-3 plasmo-mr-1" />
                            Age:
                        </span>
                        <div className="plasmo-w-[30%] plasmo-animate-pulse plasmo-h-4 plasmo-bg-gray-200 plasmo-rounded"></div>
                    </div>

                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                        <span className="plasmo-text-sm plasmo-text-gray-600 plasmo-flex plasmo-items-center">
                            <Server className="plasmo-w-3 plasmo-h-3 plasmo-mr-1" />
                            Authority:
                        </span>
                        <div className="plasmo-w-[30%] plasmo-animate-pulse plasmo-h-4 plasmo-bg-gray-200 plasmo-rounded"></div>
                    </div>

                    <div className="plasmo-flex plasmo-items-center plasmo-justify-between">
                        <span className="plasmo-text-sm plasmo-text-gray-600">SSL Status:</span>
                        <div className="plasmo-w-[30%] plasmo-animate-pulse plasmo-h-4 plasmo-bg-gray-200 plasmo-rounded"></div>
                    </div>
                    <div className="plasmo-pt-2 plasmo-border-t plasmo-border-gray-100">
                        <div className="plasmo-w-[30%] plasmo-animate-pulse plasmo-h-4 plasmo-bg-gray-200 plasmo-rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WebsiteAnalysisCardSkelton