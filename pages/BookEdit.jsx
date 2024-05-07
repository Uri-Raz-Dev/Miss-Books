const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

import { bookService } from "../services/book.service.js"

export function BookEdit() {

    const [book, setBook] = useState(bookService.createBook())

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!params.bookId) return

        bookService.get(params.bookId)
            .then(setBook)
    }, [])

    function onSave(ev) {
        ev.preventDefault()
        bookService.save(book)
            .then(() => navigate('/book'))
            .catch(() => {
                alert('Couldnt save')
                navigate('/book')
            })
    }

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
        setBook(prevBook => ({ ...prevBook, [prop]: value }))

    }

    let { title, subtitle, description, listPrice: { amount, isOnSale }, thumbnail, authors, categories
        , publishedDate, pageCount, language } = book

    return <section className="book-edit">
        <h1>{params.bookId ? 'Edit book' : 'Add book'}</h1>

        <form onSubmit={onSave}>
            <label htmlFor="title">Book Title</label>
            <input
                onChange={handleChange} value={title}
                id="title" name="title"
                type="text" placeholder="title" />

            <label htmlFor="price">Book Price</label>
            <input
                onChange={handleChange} value={parseFloat(amount)}
                id="amount" name="amount"
                type="number" placeholder="price" />

            <button>Save</button>
        </form>
    </section>
}
