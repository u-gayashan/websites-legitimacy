import React from 'react'
import { Shield } from "lucide-react"

interface WebsiteInfoProps {
    webSiteAnalysis: string
    tags: string[]
}

const WebsiteInfo = ({ webSiteAnalysis: description, tags }: WebsiteInfoProps) => {
    return (
        <div className="plasmo-space-y-3">
            <h2 className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-900 plasmo-flex plasmo-items-center">
                <Shield className="plasmo-w-4 plasmo-h-4 plasmo-mr-2 plasmo-text-gray-400" />
                Website Info
            </h2>
            <div className="plasmo-bg-gray-50 plasmo-rounded-lg plasmo-p-4">
                <p className="plasmo-text-sm plasmo-text-gray-600 plasmo-leading-relaxed plasmo-mb-3">
                    {description}
                </p>
                <div className="plasmo-flex plasmo-flex-wrap plasmo-gap-2">
                    {tags.map((tag) => (
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
    )
}

export default WebsiteInfo