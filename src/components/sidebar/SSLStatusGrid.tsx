import React from 'react';
import { Shield, Clock, Building2, Calendar, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface SSLData {
    issuer: {
        countryName: string;
        stateOrProvinceName: string;
        localityName: string;
        organizationName: string;
        organizationalUnitName: string;
        commonName: string;
    };
    expiry_date: string;
    days_until_expiry: number;
}

interface SSLStatusGridProps {
    sslData: SSLData;
}

const SSLStatusGrid: React.FC<SSLStatusGridProps> = ({ sslData }) => {
    if (!sslData) {
        return <div>Loading SSL info...</div>; // or a skeleton loader
    }

    const { issuer, expiry_date, days_until_expiry } = sslData;

    const formatExpiryDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getStatusConfig = (days: number) => {
        if (days > 60) {
            return {
                icon: CheckCircle,
                text: 'Secure',
                textColor: 'text-emerald-700',
                bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50',
                borderColor: 'border-emerald-200',
                iconColor: 'text-emerald-600'
            };
        }
        if (days > 30) {
            return {
                icon: AlertTriangle,
                text: 'Expires Soon',
                textColor: 'text-amber-700',
                bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
                borderColor: 'border-amber-200',
                iconColor: 'text-amber-600'
            };
        }
        return {
            icon: XCircle,
            text: 'Critical',
            textColor: 'text-red-700',
            bgColor: 'bg-gradient-to-br from-red-50 to-rose-50',
            borderColor: 'border-red-200',
            iconColor: 'text-red-600'
        };
    };

    const statusConfig = getStatusConfig(days_until_expiry);
    const StatusIcon = statusConfig.icon;

    const stats = [
        {
            icon: Shield,
            label: 'SSL Status',
            value: statusConfig.text,
            special: true,
            config: statusConfig
        },
        {
            icon: Clock,
            label: 'Days Remaining',
            value: `${days_until_expiry}`,
            suffix: 'days',
            config: statusConfig
        },
        {
            icon: Building2,
            label: 'Certificate Authority',
            value: issuer.organizationName.replace(', Inc.', '').replace('GoDaddy.com', 'GoDaddy'),
            config: {
                textColor: 'text-slate-700',
                bgColor: 'bg-gradient-to-br from-slate-50 to-gray-50',
                borderColor: 'border-slate-200',
                iconColor: 'text-slate-500'
            }
        },
        {
            icon: Calendar,
            label: 'Expires On',
            value: formatExpiryDate(expiry_date),
            config: {
                textColor: 'text-slate-700',
                bgColor: 'bg-gradient-to-br from-slate-50 to-gray-50',
                borderColor: 'border-slate-200',
                iconColor: 'text-slate-500'
            }
        }
    ];

    return (
        <div className="plasmo-grid plasmo-grid-cols-2 plasmo-gap-3">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`
            plasmo-group plasmo-relative plasmo-p-4 plasmo-rounded-xl plasmo-border 
            plasmo-transition-all plasmo-duration-300 plasmo-ease-out
            plasmo-hover:shadow-lg plasmo-hover:shadow-black/5
            plasmo-hover:-translate-y-0.5 plasmo-cursor-default
            ${stat.config.bgColor} ${stat.config.borderColor}
          `}
                >
                    <div className="plasmo-flex plasmo-items-start plasmo-justify-between plasmo-h-full">
                        <div className="plasmo-flex-1 plasmo-min-w-0">
                            <div className="plasmo-flex plasmo-items-center plasmo-space-x-2 plasmo-mb-2">
                                <div className={`
                  plasmo-p-1.5 plasmo-rounded-lg plasmo-bg-white/60 plasmo-backdrop-blur-sm
                  plasmo-transition-transform plasmo-duration-300 plasmo-group-hover:scale-110
                `}>
                                    {stat.special ? (
                                        <StatusIcon className={`plasmo-w-4 plasmo-h-4 ${stat.config.iconColor}`} />
                                    ) : (
                                        <stat.icon className={`plasmo-w-4 plasmo-h-4 ${stat.config.iconColor}`} />
                                    )}
                                </div>
                                <span className="plasmo-text-xs plasmo-font-medium plasmo-text-slate-500 plasmo-uppercase plasmo-tracking-wide">
                                    {stat.label}
                                </span>
                            </div>

                            <div className="plasmo-flex plasmo-items-baseline plasmo-space-x-1">
                                <span className={`plasmo-text-lg plasmo-font-bold plasmo-leading-tight ${stat.config.textColor}`}>
                                    {stat.value}
                                </span>
                                {stat.suffix && (
                                    <span className="plasmo-text-sm plasmo-font-medium plasmo-text-slate-500">
                                        {stat.suffix}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Subtle glow effect */}
                    <div className={`
            plasmo-absolute plasmo-inset-0 plasmo-rounded-xl plasmo-opacity-0 
            plasmo-transition-opacity plasmo-duration-300 plasmo-group-hover:opacity-100
            plasmo-bg-gradient-to-r ${stat.special
                            ? days_until_expiry > 60
                                ? 'from-emerald-100/20 to-green-100/20'
                                : days_until_expiry > 30
                                    ? 'from-amber-100/20 to-orange-100/20'
                                    : 'from-red-100/20 to-rose-100/20'
                            : 'from-slate-100/20 to-gray-100/20'
                        }
          `} />
                </div>
            ))}
        </div>
    );
};

export default SSLStatusGrid;