import { bookService } from "../services/book.service.js"
import { storageService } from "../services/async-storage.service.js"
import { utilService } from "../services/util.service.js"
import { BookList } from "../cmps/BookList.jsx"
const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

export function BookIndex() {

    const [books, setBooks] = useState([])

    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => {
                console.error('err:', err)
            })
    }, [filterBy])


    function removeBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    function showBookDetails(book) {
        setSelectedBook(book)
    }

    return <section className="book-index">
        {!selectedBook && <BookList books={books} onRemove={removeBook} onShowDetails={showBookDetails} />}
    </section>
}