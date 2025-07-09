import React from 'react'


type SideBarHeaderProps = {
    isOpen?: boolean
    userInfo: { name: string; email: string, picture: string } | null
}

const SideBarHeader = ({ isOpen, userInfo }: SideBarHeaderProps) => {
    return (
        <div className="plasmo-flex plasmo-justify-between plasmo-items-center plasmo-p-6 plasmo-border-b plasmo-border-gray-100 plasmo-bg-white">
            <h1 className="plasmo-text-xl plasmo-font-bold plasmo-text-gray-800">Website Insights</h1>

            <div className="plasmo-w-10 plasmo-h-10 plasmo-rounded-full plasmo-bg-gradient-to-r plasmo-from-blue-500 plasmo-to-indigo-600 plasmo-flex plasmo-items-center plasmo-justify-center plasmo-text-white plasmo-font-semibold">
                {/* lets show user image which comes as URL here from the userInfo */}
                {isOpen && (
                    userInfo ? (
                        <img
                            onClick={async () => {
                                try {
                                    const response = await new Promise<{ success: boolean }>((resolve, reject) => {
                                        chrome.runtime.sendMessage({ type: 'SIGN_OUT' }, (response) => {
                                            if (chrome.runtime.lastError) {
                                                console.error("Message error:", chrome.runtime.lastError.message);
                                                reject(chrome.runtime.lastError);
                                            } else {
                                                resolve(response);
                                            }
                                        });
                                    });

                                    if (response.success) {
                                        console.log('Successfully signed out');
                                        // Optional: clear UI state or reload popup
                                    } else {
                                        console.warn('Sign out failed');
                                    }
                                } catch (err) {
                                    console.error('Failed to send SIGN_OUT message:', err);
                                }
                            }}
                            src={userInfo.email ? `${userInfo.picture}` : ""}
                            alt="User Avatar"
                            className="plasmo-w-full plasmo-h-full plasmo-rounded-full hover:plasmo-cursor-pointer"
                        />
                    ) : (
                        <span className="plasmo-text-lg">?</span>
                    )
                )}
            </div>
        </div>
    )
}

export default SideBarHeader