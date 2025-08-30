import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

interface UserInfo {
    name: string
    email: string
    picture: string
}

const AuthenticatedProfileComponent = ({ name, email, picture }: UserInfo) => {
    return (
        <div className="plasmo-flex plasmo-items-center plasmo-space-x-2">
            <div className="plasmo-text-right">
                <p className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-900">{name}</p>
                <p className="plasmo-text-xs plasmo-text-gray-500">{email}</p>
            </div>
            <Avatar className="plasmo-w-10 plasmo-h-10 plasmo-border-gray-200">
                <AvatarImage className="plasmo-rounded-full" src={picture} alt="User Avatar" />
                <AvatarFallback className="plasmo-bg-gray-100 plasmo-text-gray-500 plasmo-font-medium">
                    {name?.charAt(0)}
                </AvatarFallback>
            </Avatar>
        </div>
    )
}

export default AuthenticatedProfileComponent