import type { UserInfo } from "./user";

export const enum MessageType {
    // Popup/Content Script -> Background
    GOOGLE_SIGN_IN_REQUEST = "GOOGLE_SIGN_IN_REQUEST",
    SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST",
    // Background -> Popup
    AUTH_RESPONSE = "AUTH_RESPONSE",
    // Background -> All Content Scripts (or specific ones)
    BROADCAST_USER_INFO = "BROADCAST_USER_INFO",
    // Popup/Background -> Specific Content Script
    TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR",
}

// Messages from Popup to Background
export interface GoogleSignInRequestMessage {
    type: MessageType.GOOGLE_SIGN_IN_REQUEST;
}

export interface SignOutRequestMessage {
    type: MessageType.SIGN_OUT_REQUEST;
}

// Messages from Background to Popup/Content Scripts
export interface AuthResponseMessage {
    type: MessageType.AUTH_RESPONSE;
    success: boolean;
    userInfo?: UserInfo | null;
    error?: string;
}

// Messages from Background to Content Scripts
export interface BroadcastUserInfoMessage {
    type: MessageType.BROADCAST_USER_INFO;
    payload: UserInfo | null; // Can be null if signed out
}

// Messages for Content Script to toggle sidebar
export interface ToggleSidebarMessage {
    type: MessageType.TOGGLE_SIDEBAR;
    payload?: UserInfo | null; // Optional: send user info along with toggle
}