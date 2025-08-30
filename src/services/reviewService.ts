
export const checkReviewExists = async (email: string, hostname: string) => {
    try {
        const response = await fetch(`http://localhost:3001/api/reviews/${email}/exists/${hostname}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error checking review:", error);
        throw error;
    }
};

export const submitReview = async (
    email: string,
    hostname: string,
    review: string,
    rating: number
) => {
    try {
        const response = await fetch(`http://localhost:3001/api/reviews/${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                website_url: hostname,
                content: review.trim(),
                rating: rating,
            }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error submitting review:", error);
        throw error;
    }
};