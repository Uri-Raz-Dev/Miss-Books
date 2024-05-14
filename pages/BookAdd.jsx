const { useState, useEffect, useRef } = React
import { BookAddPreview } from "../cmps/BookAddPreview.jsx"
import { bookService } from "../services/book.service.js"
export function BookAdd() {
    const [books, setBooks] = useState([])
    useEffect(() => {
        bookService.queryDemoList()
            .then(books => setBooks(books))

    }, [])
    console.log(books);
    return <section className="add-google-book">
        <ul className="google-book-list">
            {books.map(book => (
                <BookAddPreview key={book.id} book={book} />
            ))}
        </ul>
    </section>
}