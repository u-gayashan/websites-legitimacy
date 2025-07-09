export class GoogleAutheService {
    private static instance: GoogleAutheService;
    public static STORAGE_KEY = 'google_authenticated_user_info';
    
    private constructor() {
    }
    /**
     * Singleton instance of GoogleAutheService
     * @returns {GoogleAutheService} The singleton instance
     */
    public static getInstance(): GoogleAutheService {
        if (!GoogleAutheService.instance) {
            GoogleAutheService.instance = new GoogleAutheService();
        }
        return GoogleAutheService.instance;
    }

    public async signIn(): Promise<void> {
        try {
            const authResult = await chrome.identity.getAuthToken({ interactive: true });
            if (authResult) {
                console.log('Google Sign-In successful:', authResult);
                // Store the token or user info as needed
            } else {
                throw new Error('No auth token received');
            }
        } catch (error) {
            console.error('Google Sign-In failed:', error);
            throw error;
        }
    }

    public async signOut(): Promise<void> {
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

            // --- Remove user info from chrome.storage.local ---
            await chrome.storage.local.remove(GoogleAutheService.STORAGE_KEY);
            console.log("Popup: Removed user info from storage.");

        } catch (err) {
            console.error('Popup: Sign out error:', err);
        }
    }
}