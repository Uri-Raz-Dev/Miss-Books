import { bookService } from "../services/book.service.js"
import { storageService } from "../services/async-storage.service.js"
import { utilService } from "../services/util.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookDetails } from "../cmps/BookDetails.jsx"

const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

export function BookIndex() {

    const [books, setBooks] = useState([])

    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    const [selectedBook, setSelectedBook] = useState(null)

    const [selectedFilter, setSelectedFilter] = useState('title')


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
    function onSetSelectedFilter(newFilter) {
        setSelectedFilter(newFilter)
    }

    function showBookDetails(book) {
        setSelectedBook(book)
    }

    return <section className="book-index">
        {!selectedBook && <BookFilter filterBy={filterBy} onFilter={onSetFilterBy} selectedFilter={selectedFilter} onSelectFilter={onSetSelectedFilter} />}
        {!selectedBook && <BookList books={books} onRemove={removeBook} onShowDetails={showBookDetails} />}
        {selectedBook && <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />}
    </section>
}