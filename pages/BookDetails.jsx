import { AddReview } from "../cmps/AddReview.jsx"
import { BookPrice } from "../cmps/BookPrice.jsx"
import { BookPublishedDate } from "../cmps/BookPublishedDate.jsx"
import { BookReadingDifficulty } from "../cmps/BookReadingDifficulty.jsx"
import { LongText } from "../cmps/LongText.jsx"
import { ReviewList } from "../cmps/ReviewList.jsx"
import { bookService } from "../services/book.service.js"
const { useState, useEffect, useRef } = React

const { Link } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouter

const loading = (
    <svg width="140" height="140" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <style>
            {`
        .spinner_aj0A {
          transform-origin: center;
          animation: spinner_KYSC .75s infinite linear;
        }
        @keyframes spinner_KYSC {
          100% {
            transform: rotate(360deg);
          }
        }
      `}
        </style>
        <path
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
            className="spinner_aj0A"
        />
    </svg>
);

const MyComponent = ({ isLoading }) => {
    if (isLoading) {
        return <div className="loading">{loading}</div>;
    }

    return (
        <div>
            {/* Other content when not loading */}
        </div>
    );
};

export default MyComponent;


export function BookDetails() {
    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [toggleReviewModal, setToggleReviewModal] = useState(false)

    const params = useParams()
    const navigate = useNavigate()



    useEffect(() => {
        setIsLoading(true)
        bookService.get(params.bookId)
            .then(book => {
                setBook(book)
            })
            .catch(() => {
                alert('Couldnt get book...')
                navigate('/book')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [params.bookId])

    function onAddReview(newReview) {
        bookService.addReview(book.id, newReview)
            .then((review) => {
                const reviews = [review, ...book.reviews]
                setBook({ ...book, reviews })
                console.log(book);
            })
    }

    function onRemoveReview(reviewId) {
        bookService.removeReview(book.id, reviewId)
            .then(() => {
                const filteredReviews = book.reviews.filter(review => review.id !== reviewId)
                setBook({ ...book, reviews: filteredReviews })
            })
    }


    function toggleModal() {
        setToggleReviewModal(prevAddReview => !prevAddReview)
    }

    if (isLoading) return <div className="loading">{loading}</div>
    const { title, thumbnail, authors, categories, reviews } = book
    const { isOnSale } = book.listPrice

    return <section className="book-details grid">
        <img src={thumbnail} alt="book tumbnail" />

        <h2>{title}</h2>
        <h3>{`by ${[authors]}`}</h3>
        <LongText book={book} />
        <span className="generes">{`Genres: ${[categories]}`}</span>
        <BookReadingDifficulty book={book} />
        <BookPublishedDate book={book} />
        <BookPrice book={book} />
        {isOnSale && <span className="sale">On Sale!</span>}
        <Link className="grid" to={"/book"}><button className="close">Close</button>
            <nav className="book-nav flex">
                <Link className="prev" to={`/book/${book.prevBookId}`}><button>Prev</button></Link>
                <Link className="next" to={`/book/${book.nextBookId}`}><button>Next</button></Link>
            </nav>
        </Link >
        <button onClick={toggleModal} className="add-review-btn">Add review</button>

        {toggleReviewModal && <AddReview onAddReview={onAddReview} toggleModal={toggleModal} />}

        <ReviewList reviews={reviews} onRemoveReview={onRemoveReview} />
    </section>
}