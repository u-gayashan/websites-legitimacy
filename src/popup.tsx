// popup.tsx
import React, { useState, useEffect } from 'react';
import type { UserInfo } from '~types/user';

import { Audio, Vortex, DNA, Oval } from 'react-loader-spinner'

import '~style.css'
import AuthenticatedGoogleCard from '~components/auth/AuthenticatedGoogleCard';
import PopUpHeader from '~components/popup/PopUpHeader';
import { GoogleSignInButton } from '~components/auth/GoogleSignInButton';
import { registerUser } from '~api/userApi'; // Import the API function

// import logo from '../assets/logo.png';

const STORAGE_KEY = 'google_authenticated_user_info';

const Popup = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    chrome.storage.local.get(STORAGE_KEY, (result) => {
      const user = result?.google_authenticated_user_info
      if (user) {
        window.close()
        // Close popup and open sidebar
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(
            tabs[0].id, {
            type: "TOGGLE_SIDEBAR",
            payload: user,
          })
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
      
      const fetchedUserInfo: UserInfo = {
        name: data.name || data.given_name || 'N/A',
        email: data.email || 'N/A',
        picture: data.picture || 'N/A',
      };

      const storedUser = await registerUser(fetchedUserInfo);
      console.log(storedUser)
      setUserInfo(fetchedUserInfo);

      await chrome.storage.local.set({ [STORAGE_KEY]: fetchedUserInfo });

      handleLogin(); 

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
        <PopUpHeader />
        {/* I want to add a click event for the whole div and add a mouse hover effect*/}
        {!userInfo ? (
          <GoogleSignInButton
            loading={loading}
            onClick={handleGoogleSignIn}
          />
        ) : (
          <AuthenticatedGoogleCard
            userInfo={userInfo}
            onSignOut={handleSignOut}
            loading={loading}
          />
        )}
        {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}
      </div>
    </div>
  );
};

export default Popup;