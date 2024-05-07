import { BookPreview } from "./BookPreview.jsx";
const { Link } = ReactRouterDOM

export function BookList({ books, onRemove, onShowDetails }) {
    return <section className="book-section">
        <ul className="book-list flex">
            {
                books.map(book => <li className="book flex" key={book.id}>
                    <BookPreview book={book} />
                    <button className="remove-book" onClick={() => onRemove(book.id)} >x</button>
                    <Link className="book-details" to={`/book/${book.id}`}><button >Details</button></Link>
                </li>)
            }
        </ul>
    </section>
}


