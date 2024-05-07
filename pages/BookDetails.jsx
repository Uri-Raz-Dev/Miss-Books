import { BookPrice } from "../cmps/BookPrice.jsx"
import { BookPublishedDate } from "../cmps/BookPublishedDate.jsx"
import { BookReadingDifficulty } from "../cmps/BookReadingDifficulty.jsx"
import { LongText } from "../cmps/LongText.jsx"
import { bookService } from "../services/book.service.js"
const { useState, useEffect, useRef } = React

const { Link } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouter

export function BookDetails() {

    const [books, setBooks] = useState([])

    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())


    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => {
                console.error('err:', err)
            })
    }, [filterBy])


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

    if (isLoading) return <h3>Loading...</h3>
    return <section className="book-details grid">
        <img src={book.thumbnail} alt="book tumbnail" />

        <h2>{books.title}</h2>
        <h3>{`by ${[books.authors]}`}</h3>
        <LongText book={books} />
        <span className="generes">{`Genres: ${[book.scategories]}`}</span>
        <BookReadingDifficulty book={books} />
        <BookPublishedDate book={books} />
        <BookPrice book={books} />
        {books.listPrice.isOnSale && <span className="sale">On Sale!</span>}
        <button className="close" onClick={onClose}>close</button>

    </section>
}