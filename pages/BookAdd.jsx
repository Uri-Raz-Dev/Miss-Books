const { useState, useEffect, useRef } = React
const { useParams, useNavigate } = ReactRouter

import { BookAddPreview } from "../cmps/BookAddPreview.jsx"
import { bookService } from "../services/book.service.js"
export function BookAdd() {
    const navigate = useNavigate()

    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    useEffect(() => {
        bookService.queryDemoList(filterBy)
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


                bookService.queryDemoList()
                    .then(() => bookService.addDemoBook(bookId))
                    .then(() => navigate('/book'))
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


    function handleChange(event) {
        const { name: prop, value } = event.target
        setFilterBy(prevFilter => ({ ...prevFilter, [prop]: value }))
    }
    const processChange = debounce((event) => handleChange(event))

    return <section className="add-google-book">
        <input className="search-google-books" onKeyUp={processChange} type="text"
            name="title" placeholder="find new books!" />
        <ul className="google-book-list">
            {books.map(book => {

                return < BookAddPreview key={book.id} book={book} onAddBook={onAddBook} />
            })}
        </ul>
    </section>
}