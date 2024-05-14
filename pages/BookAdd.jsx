const { useState, useEffect, useRef } = React
const { useParams, useNavigate } = ReactRouter

import { BookAddPreview } from "../cmps/BookAddPreview.jsx"
import { bookService } from "../services/book.service.js"
export function BookAdd() {
    const navigate = useNavigate()
    const [books, setBooks] = useState([])
    useEffect(() => {
        bookService.queryDemoList()
            .then(books => setBooks(books))

    }, [])
    console.log(books)

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

    return <section className="add-google-book">
        <ul className="google-book-list">
            {books.map(book => {

                return < BookAddPreview key={book.id} book={book} onAddBook={onAddBook} />
            })}
        </ul>
    </section>
}