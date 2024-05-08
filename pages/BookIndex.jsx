import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

export function BookIndex() {

    const [books, setBooks] = useState([])

    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())


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



    return <section className="book-index flex">
        <Link className="add-book" to="/book/edit"><button>Add a Book</button></Link>
        <BookFilter filterBy={filterBy} onFilter={onSetFilterBy} selectedFilter={selectedFilter} onSelectFilter={onSetSelectedFilter} />
        <BookList books={books} onRemove={removeBook} />
    </section>
}