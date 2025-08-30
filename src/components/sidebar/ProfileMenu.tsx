import React, { useState, useRef, useEffect } from "react"
import AuthenticatedProfileComponent from "~components/authenticated/AuthenticatedProfileComponent"

const ProfileMenu = ({ userInfo, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setTimeout(() => {
                    setIsOpen(false);
                }, 100);
            }
        };

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="plasmo-relative"
            ref={menuRef}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div
                className="plasmo-flex plasmo-items-center plasmo-space-x-2 plasmo-cursor-pointer plasmo-hover:bg-gray-50 plasmo-rounded-lg plasmo-p-2">
                {userInfo && (
                    <AuthenticatedProfileComponent
                        name={userInfo.name}
                        email={userInfo.email}
                        picture={userInfo.picture}
                    />
                )}
            </div>

            {isOpen && (
                <div className="plasmo-absolute plasmo-right-0 plasmo-mt-2 plasmo-w-32 plasmo-bg-white plasmo-shadow-md plasmo-rounded-md plasmo-z-50">
                    <button
                        className="plasmo-w-full plasmo-text-left plasmo-px-4 plasmo-py-2 plasmo-text-sm plasmo-hover:bg-gray-900 plasmo-text-red-400"
                        onClick={(e) => {
                            e.stopPropagation();
                            onLogout();
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfileMenu
