import type { UserInfo } from '~types/user';

const API_BASE_URL = 'http://localhost:3001/api/users';

export const registerUser = async (userInfo: UserInfo) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userInfo.email,
                name: userInfo.name,
                picture: userInfo.picture
            }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('User registered successfully:', data);
        return data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};