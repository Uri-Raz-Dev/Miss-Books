import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemove, onShowDetails }) {
    return <section className="book-list">
        <ul>
            {
                books.map(book => <li key={book.id}>
                    <BookPreview book={book} />
                    <button onClick={() => onRemove(book.id)} >x</button>
                    <button onClick={() => onShowDetails(book)} >Details</button>
                </li>)
            }
        </ul>
    </section>
}