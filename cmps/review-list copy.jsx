import { ReviewPreview } from './review-preview.jsx'

export function ReviewList({ reviews, onRemoveReview }) {
    return (
        <div>
            {reviews.map(review =>
                <ReviewPreview
                    key={review.id}
                    review={review}
                    onRemoveReview={onRemoveReview}
                />
            )}</div>
    )
}