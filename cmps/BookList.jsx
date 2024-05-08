import { BookPreview } from "./BookPreview.jsx";
const { Link } = ReactRouterDOM

export function BookList({ books, onRemove }) {
    return <section className="book-section">
        <ul className="book-list flex">
            {
                books.map(book => <li className="book flex" key={book.id}>
                    <BookPreview book={book} />
                    <button className="remove-book" onClick={() => onRemove(book.id)} >x</button>
                    <div className="book-details flex">

                        <Link to={`/book/edit/${book.id}`}><button>Edit</button></Link>
                        <Link to={`/book/${book.id}`}><button >Details</button></Link>

                    </div>


                </li>)
            }
        </ul>
    </section>
}


