import React from 'react'
import { ChevronRight, Shield, SquareActivity } from "lucide-react"
import SSLStatusGrid from './SSLStatusGrid'

interface QuickStatsGridProps {
    icon: React.ElementType
    value: string | number
    label: string
}

// const sslData = {
//     issuer: {
//         countryName: "US",
//         stateOrProvinceName: "Arizona",
//         localityName: "Scottsdale",
//         organizationName: "GoDaddy.com, Inc.",
//         organizationalUnitName: "http://certs.godaddy.com/repository/",
//         commonName: "Go Daddy Secure Certificate Authority - G2"
//     },
//     expiry_date: "2026-01-27T16:51:06",
//     days_until_expiry: 154
// };

// const QuickStatsGrid = ({ icon: Icon, value, label }: QuickStatsGridProps) => {
const QuickStatsGrid = ({ sslData }) => {
    return (
        <div className="plasmo-bg-white plasmo-rounded-md plasmo-shadow-lg plasmo-p-4">
            {/* Card wrapper */}
            {/* Header */}
            <div className="plasmo-flex plasmo-items-center plasmo-space-x-3 plasmo-mb-6">
                <div className="plasmo-p-3 plasmo-bg-gradient-to-br plasmo-from-blue-500 plasmo-to-indigo-600">
                    <SquareActivity className="plasmo-w-5 plasmo-h-5 plasmo-text-white" />
                </div>
                <div>
                    <p className="plasmo-font-medium plasmo-text-slate-800">
                        SSL Certificate Monitor
                    </p>
                    <p className="plasmo-text-slate-600 plasmo-text-xs">
                        Real time security status and certificate health
                    </p>
                </div>
            </div>

            {/* Status Grid */}
            <SSLStatusGrid sslData={sslData} />

            {/* Certificate Authority Details */}
            <div className="plasmo-border-t plasmo-text-xs plasmo-border-gray-100">
                <h3 className="plasmo-text-base plasmo-font-semibold plasmo-text-slate-800 plasmo-mb-3 plasmo-pt-3 plasmo-flex plasmo-items-center">
                    Certificate Authority Details
                </h3>
                <div className="plasmo-grid plasmo-grid-cols-1 md:plasmo-grid-cols-3 plasmo-gap-4">
                    <div className="plasmo-space-y-1">
                        <p className="plasmo-text-slate-700">Issuer</p>
                        <p className="plasmo-text-slate-600">{sslData?.issuer?.commonName}</p>
                    </div>
                    <div className="plasmo-space-y-1">
                        <p className="plasmo-text-slate-700">Organization</p>
                        <p className="plasmo-text-slate-600">{sslData?.issuer?.organizationName}</p>
                    </div>
                    <div className="plasmo-space-y-1">
                        <p className="plasmo-text-slate-700">Location</p>
                        <p className="plasmo-text-slate-600">
                            {sslData?.issuer?.countryName}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

    // return (



    // <div className="plasmo-bg-gray-50 plasmo-rounded-lg plasmo-p-4 hover:plasmo-bg-gray-100 plasmo-transition-colors plasmo-cursor-pointer">
    //     <div className="plasmo-flex plasmo-items-center plasmo-justify-between plasmo-mb-2">
    //         <Icon className="plasmo-w-4 plasmo-h-4 plasmo-text-gray-400" />
    //         <ChevronRight className="plasmo-w-3 plasmo-h-3 plasmo-text-gray-300" />
    //     </div>
    //     <div className="plasmo-text-lg plasmo-font-semibold plasmo-text-gray-900 plasmo-mb-1">
    //         {value}
    //     </div>
    //     <div className="plasmo-text-xs plasmo-text-gray-500">{label}</div>
    // </div>
    // )
}

export default QuickStatsGrid