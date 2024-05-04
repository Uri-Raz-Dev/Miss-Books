import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemove, onShowDetails }) {
    return <section className="book-section">
        <ul className="book-list flex">
            {
                books.map(book => <li className="book flex" key={book.id}>
                    <BookPreview book={book} />
                    <button className="remove-book" onClick={() => onRemove(book.id)} >x</button>
                    <button className="book-details" onClick={() => onShowDetails(book)} >Details</button>
                </li>)
            }
        </ul>
    </section>
}