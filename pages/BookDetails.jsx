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

    if (isLoading) return <h3>Loading...</h3>
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
        <Link className="grid" to={"/book"}><button className="close">close</button>
            <Link to={`/book/${book.prevBookId}`}><button>Prev</button></Link>
            <Link to={`/book/${book.nextBookId}`}><button>Next</button></Link>
        </Link >
        <button onClick={toggleModal}>Add review</button>

        {toggleReviewModal && <AddReview onAddReview={onAddReview} toggleModal={toggleModal} />}

        <ReviewList reviews={reviews} onRemoveReview={onRemoveReview} />
    </section>
}