import React from 'react'
import { Oval } from 'react-loader-spinner'
import type { UserInfo } from '~types/user';

type AuthenticatedGoogleCardProps = {
    userInfo: UserInfo | null;
    onSignOut: () => Promise<void>;
    loading: boolean;
};

const AuthenticatedGoogleCard: React.FC<AuthenticatedGoogleCardProps> = ({ userInfo, onSignOut, loading }) => {
    return (
        <div className="plasmo-flex plasmo-w-full plasmo-justify-between plasmo-items-center plasmo-p-4 plasmo-border plasmo-rounded-md plasmo-shadow-lg">
            <div className="plasmo-flex plasmo-items-center plasmo-gap-2">
                <img
                    src={userInfo?.picture}
                    alt="Profile"
                    className="plasmo-w-8 plasmo-h-8 plasmo-rounded-full"
                />
                <div className="plasmo-flex plasmo-flex-col">
                    <p className="plasmo-text-sm plasmo-font-semibold">
                        Signed in as, {userInfo?.name}
                    </p>
                    <p className="plasmo-text-xs plasmo-text-gray-500">
                        {userInfo?.email}
                    </p>
                </div>
            </div>
            <img
                src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png"
                alt="Google Logo"
                className="plasmo-w-8 plasmo-h-8"
            />
        </div>
    )
}

export default AuthenticatedGoogleCard