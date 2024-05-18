const { useState, useEffect, useRef } = React
const { useParams, useNavigate } = ReactRouter
import { BookIndex } from "./BookIndex.jsx"

import { BookAddPreview } from "../cmps/BookAddPreview.jsx"
import { bookService } from "../services/book.service.js"
export function BookAdd() {

    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    useEffect(() => {
        bookService.queryGoogleList(filterBy)
            .then(books => setBooks(books))

    }, [filterBy])

    function onAddBook(bookId) {
        bookService.query()
            .then((books) => {

                const googleBook = books.some(book => book.id === bookId)
                if (googleBook) {
                    console.log('Book already exists in the list')
                    return
                }


                bookService.queryGoogleList()
                    .then(() => bookService.addGoogleBook(bookId))
                    .then((book) => {
                        BookIndex.setBooks(book)
                    })

            })
    }


    function debounce(func, timeout = 3000) {
        let timer
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func.apply(this, args)
            }, timeout)
        }
    }
    console.log(books);

    function handleChange(event) {
        const { name: prop, value } = event.target
        setFilterBy(prevFilter => ({ ...prevFilter, [prop]: value }))

        bookService.getGoogleBooks(value)
            .then(books => setBooks(books))

    }
    const processChange = debounce((event) => handleChange(event))

    return <section className="add-google-book">
        <input className="search-google-books" onKeyUp={processChange} type="text"
            name="title" placeholder="find new books!" />
        <ul className="google-book-list">
            {books.map(book => (
                <BookAddPreview key={book.id} book={book} onAddBook={onAddBook} />
            ))
            }

        </ul>
    </section>
}