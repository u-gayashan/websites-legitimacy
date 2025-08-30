import { useEffect, useState } from "react";
import { checkReviewExists, submitReview } from "~services/reviewService";

interface ReviewSubmission {
    isSubmitted: boolean;
    submittedAt?: Date;
    isLoading?: boolean;
    error?: string;
}

export const useReview = (userInfo: { email: string } | null, hostname: string, isOpen: boolean) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [reviewSubmittedDateTime, setReviewSubmittedDateTime] = useState("");
    const [isReviewed, setIsReviewed] = useState(false);
    const [reviewSubmission, setReviewSubmission] = useState<ReviewSubmission>({
        isSubmitted: false,
        isLoading: false,
    });
    const [checkReviewExistsError, setcheckReviewExistsError] = useState("");

    useEffect(() => {
        (async () => {
            if (!userInfo?.email || !isOpen) return;

            try {
                const result = await checkReviewExists(userInfo.email, hostname);

                if (result.exists === true) {
                    setIsReviewed(true);
                    const date = new Date(result.review.createdAt);
                    const readable = date.toLocaleString("en-US", {
                        timeZone: "Asia/Colombo",
                        dateStyle: "long",
                        timeStyle: "short"
                      });
                    setReviewSubmittedDateTime(readable);
                    setReviewSubmission(prev => ({ ...prev, isSubmitted: true }));
                }
                (result.exists === false) && setIsReviewed(false);
            } catch (err) {
                setcheckReviewExistsError(
                    err instanceof Error ? err.message : "An unexpected error occurred while checking review existence."
                );
            }
        })();
    }, [userInfo?.email, hostname, isOpen]);

    const handleSubmitReview = async () => {
        if (rating > 0 && review.trim() && userInfo?.email) {
            setReviewSubmission({ ...reviewSubmission, isLoading: true, error: undefined });

            await new Promise(resolve => setTimeout(resolve, 5000));

            try {
                await submitReview(userInfo.email, hostname, review, rating);
                setReviewSubmission({
                    isSubmitted: true,
                    submittedAt: new Date(),
                    isLoading: false,
                });
                setIsReviewed(true);
                setReviewSubmittedDateTime(new Date().toLocaleString());
                setReview("");
                setRating(0);
            } catch (err) {
                setReviewSubmission(prev => ({
                    ...prev,
                    isLoading: false,
                }));
            }
        }
    };

    return {
        rating,
        setRating,
        hoveredStar: reviewSubmission.isSubmitted ? 0 : undefined,
        review,
        setReview,
        handleSubmitReview,
        reviewSubmission,
        isReviewed,
        reviewSubmittedDateTime,
        checkReviewExistsError
    };
};
