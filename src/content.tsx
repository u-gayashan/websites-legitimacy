import React, { useEffect, useState } from "react"
import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { SideBar } from "~pages/SideBar"

export const config: PlasmoCSConfig = {
  // it should only work in google.com
  matches: ["https://www.google.com/*", "https://www.google.co.in/*"],
  // matches: ["<all_urls>"]
}

interface UserInfo {
  name: string
  email: string
  picture: string
}

const STORAGE_KEY = "google_authenticated_user_info"

export const getStyle = (): HTMLStyleElement => {
  const baseFontSize = 16
  let updatedCssText = cssText.replaceAll(":root", ":host(plasmo-csui)")
  const remRegex = /([\d.]+)rem/g
  updatedCssText = updatedCssText.replace(remRegex, (_, remValue) => {
    return `${parseFloat(remValue) * baseFontSize}px`
  })

  // Append font import and global font-family
  const fontImport = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    * {
      font-family: 'Roboto', sans-serif;
    }
  `
  const styleElement = document.createElement("style")
  styleElement.textContent = `${fontImport}\n${updatedCssText}`
  return styleElement
}

const PlasmoOverlay = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const listener = (message: any) => {
      if (message.type === 'CLOSE_SIDEBAR') {
        console.log('Received CLOSE_SIDEBAR message');
        setIsOpen(false);
      }
    };

    chrome.runtime.onMessage.addListener(listener);

    // Clean up on unmount
    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    };
  }, []);

  useEffect(() => {
    const loadUserInfo = async () => {
      const result = await chrome.storage.local.get(STORAGE_KEY)
      if (result[STORAGE_KEY]) {
        setUserInfo(result[STORAGE_KEY])
      }
    }

    loadUserInfo()


    const handleMessage = (
      message: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      if (message.type === "USER_INFO_UPDATED") {
        console.log("Content script received user update:", message.payload)
        setUserInfo(message.payload)
        sendResponse({ success: true })
      }

      if (message.type === "TOGGLE_SIDEBAR") {
        console.log("Content script toggling sidebar")
        setIsOpen((prev) => !prev)
        if (message.payload) {
          console.log("User info received from message:", message.payload)
          setUserInfo(message.payload)
        }
        sendResponse({ success: true })
      }

      return true
    }

    chrome.runtime.onMessage.addListener(handleMessage)

    // Cleanup listener
    return () => chrome.runtime.onMessage.removeListener(handleMessage)
  }, [])

  return (
    <div>
      {/* pass the userinfo to the sidebar */}
      <SideBar isOpen={isOpen} userInfo={userInfo} />
    </div>
  )
}

export default PlasmoOverlay