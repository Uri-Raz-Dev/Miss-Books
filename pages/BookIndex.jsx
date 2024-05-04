import { bookService } from "../services/book.service.js"
import { storageService } from "../services/async-storage.service.js"
import { utilService } from "../services/util.service.js"
const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

export function BookIndex() {

    const [books, setBooks] = useState(null)

    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => {
                console.error('err:', err)
            })
    }, [filterBy])


    function removeBook(bookId) {
        carService.remove(bookId)
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

    </section>
}