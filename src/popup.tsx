// popup.tsx
import React, { useState, useEffect } from 'react';
import type { UserInfo } from '~types/user';
import '~style.css'
import logo from '~assets/logo.png'; 

const STORAGE_KEY = 'google_authenticated_user_info';

const Popup = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Effect to check if user is already authenticated ---
  useEffect(() => {
    chrome.storage.local.get(STORAGE_KEY, (result) => {
      const user = result?.google_authenticated_user_info
      
      if (user) {
        // Close popup and open sidebar
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(
            tabs[0].id, {
            type: "TOGGLE_SIDEBAR",
            payload: user,
          },
            () => {
              window.close() // This will close the popup
            }
          )
        })
      }
    })
  }, [])

  // --- Effect to load user info from storage when popup opens ---
  useEffect(() => {
    const loadUserInfo = async () => {
      setLoading(true);
      try {
        const result = await chrome.storage.local.get(STORAGE_KEY);
        if (result[STORAGE_KEY]) {
          setUserInfo(result[STORAGE_KEY]);
          console.log("Popup: Loaded user info from storage.", result[STORAGE_KEY]);
        }
      } catch (err) {
        console.error("Popup: Error loading user info from storage:", err);
        setError("Error loading saved session.");
      } finally {
        setLoading(false);
      }
    };
    loadUserInfo();
  }, []); // Run once on component mount


  const handleLogin = async () => {
    // 1. get user info from the storage and form a userInfo object
    const result = await chrome.storage.local.get(STORAGE_KEY);
    const userInfo: UserInfo = result[STORAGE_KEY] || {
      name: 'N/A',
      email: 'N/A',
      picture: 'N/A',
    };
    console.log("Popup: User info loaded for broadcast:", userInfo);
    // 3. Notify background script to broadcast user info to content scripts
    chrome.runtime.sendMessage({
      type: "BROADCAST_USER_INFO",
      payload: userInfo
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Message send failed:", chrome.runtime.lastError.message)
      } else {
        console.log("Broadcast response:", response)
      }
    })

    // 🔽 Send message to active tab to toggle sidebar
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: "TOGGLE_SIDEBAR" },
          (response) => {
            if (chrome.runtime.lastError) {
              console.warn("Popup: Error sending message:", chrome.runtime.lastError.message);
            } else {
              console.log("Popup: Message sent to content script:", response);
            }
          }
        );
      }
    });
  }


  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await new Promise<string>((resolve, reject) => {
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
          if (chrome.runtime.lastError) {
            console.error('chrome.runtime.lastError:', chrome.runtime.lastError);
            return reject(chrome.runtime.lastError.message || 'Unknown getAuthToken error.');
          }
          if (token) {
            resolve(token);
          } else {
            reject('No token received from chrome.identity.getAuthToken.');
          }
        });
      });

      console.log('Popup: Access Token:', token);

      const response = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Popup: Failed to fetch user info: ${response.statusText} (Status: ${response.status})`);
      }

      const data = await response.json();
      console.log('Popup: User Info:', data);

      const fetchedUserInfo: UserInfo = {
        name: data.name || data.given_name || 'N/A',
        email: data.email || 'N/A',
        picture: data.picture || 'N/A',
      };

      setUserInfo(fetchedUserInfo);
      // --- Save user info to chrome.storage.local ---
      await chrome.storage.local.set({ [STORAGE_KEY]: fetchedUserInfo });
      //we need to pass the fetched user info through the handlelogin method
      handleLogin(); // Broadcast user info to content scripts

      console.log("Popup: Saved user info to storage.", fetchedUserInfo);

    } catch (err) {
      console.error('Popup: Authentication Error:', err);
      setError(`Authentication failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const token = await new Promise<string | undefined>((resolve) => {
        chrome.identity.getAuthToken({ interactive: false }, (token) => {
          if (chrome.runtime.lastError) {
            console.warn("Popup: Couldn't get token for revocation:", chrome.runtime.lastError.message);
            resolve(undefined);
          } else {
            resolve(token);
          }
        });
      });

      if (token) {
        await fetch(`https://accounts.google.com/o/oauth2/revoke?token=${token}`);
        chrome.identity.removeCachedAuthToken({ token: token });
        console.log('Popup: Token revoked and cached token removed.');
      }

      setUserInfo(null); // Clear user info in UI
      // --- Remove user info from chrome.storage.local ---
      await chrome.storage.local.remove(STORAGE_KEY);
      console.log("Popup: Removed user info from storage.");

      setError(null);
    } catch (err) {
      console.error('Popup: Sign out error:', err);
      setError(`Sign out failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="plasmo-top-0 plasmo-w-96 plasmo-p-1 plasmo-bg-white plasmo-shadow-2xl plasmo-flex ">
      <div className="plasmo-border-2 plasmo-border-gray-100 plasmo-p-5 plasmo-rounded-lg plasmo-flex plasmo-flex-col plasmo-w-full ">
        <div className='plasmo-flex plasmo-flex-col plasmo-items-center plasmo-justify-center plasmo-mb-4 plasmo-bg-blue-100 plasmo-p-4 plasmo-rounded-lg'>
          {/* add a border of 1px to the logo and it should be rounded */}
          <img src={logo} alt="Logo" className="plasmo-w-16 plasmo-h-16 plasmo-border plasmo-border-gray-150 plasmo-rounded-full" />
          {/* add a glowing effect to the p tag */}
          <p className='plasmo-text-blue-600 plasmo-text-lg plasmo-font-semibold plasmo-mt-2 plasmo-text-center plasmo-shadow-lg plasmo-p-1 plasmo-rounded-lg'>
            Web Insights Finder
          </p>
          <h2 className='plasmo-text-lg plasmo-font-extralight plasmo-mt-2'>
            Are you trying to signin?
          </h2>
        </div>

        {/* I want to add a click event for the whole div and add a mouse hover effect*/}
        <div onClick={() => {
          console.log("Clicked");
        }} className="plasmo-flex plasmo-items-center plasmo-p-2 plasmo-border plasmo-border-gray-200 plasmo-rounded-lg plasmo-gap-4 plasmo-bg-gray-50 plasmo-mb-4 mouse-hover:plasmo-bg-white plasmo-cursor-pointer">
          <div className="plasmo-flex plasmo-justify-between plasmo-w-full">
            {userInfo ? (
              <div className='plasmo-flex plasmo-items-center plasmo-gap-2'>
                {userInfo.picture && (
                  <img
                    src={userInfo.picture}
                    alt="Profile"
                    className="plasmo-w-8 plasmo-h-8 plasmo-rounded-full"
                  />
                )}
                <div className=''>
                  <p className="plasmo-text-sm plasmo-font-semibold">Sign in as, {userInfo.name}!</p>
                  <p className="plasmo-text-xs plasmo-text-gray-500">{userInfo.email}</p>
                </div>
              </div>
            ) : (
              // I want a spining svg indicator inside the button
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="plasmo-p-2 plasmo-bg-blue-500 plasmo-text-white plasmo-border-none plasmo-rounded plasmo-cursor-pointer plasmo-text-sm"
              >
                Sign in with Google
                {loading && (
                  <svg
                    className="plasmo-inline-block plasmo-animate-spin plasmo-w-4 plasmo-h-4 plasmo-ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="plasmo-opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="plasmo-opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.293 5.707A8.001 8.001 0 0112 20v-4a4.001 4.001 0 00-3.707-3.707L6.293 17.707zM12 4a8.001 8.001 0 015.707 2.293l2.121-2.121A12.001 12.001 0 0012 0v4zM20.707 6.293A8.001 8.001 0 0120 12h4a12.001 12.001 0 00-3.293-8.707l-2.121 2.121zM17.707 17.707A8.001 8.001 0 0112 20v4a12.001 12.001 0 008.707-3.293l-2.121-2.121z"
                    ></path>
                  </svg>
                )}
              </button>
            )}
          </div>
          <div className=''>
            <img
              src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png"
              alt="Google Logo"
              className="plasmo-w-8 plasmo-h-8"
            />
          </div>
        </div>
      </div>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}
    </div>
  );
};

export default Popup;