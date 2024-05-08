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
        const { type, name: prop } = target;
        let { value } = target;
        switch (type) {
            case 'range':
            case 'number':
                value = +value;
                break;

            case 'checkbox':
                value = target.checked;
                break;

            case 'file':
                const file = target.files[0]
                if (file) {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        const imagePath = e.target.result
                        setBook(prevState => ({
                            ...prevState,
                            thumbnail: imagePath
                        }))
                    }
                    reader.readAsDataURL(file)
                }
                return
        }

        setBook(prevBook => ({ ...prevBook, [prop]: value }));
    }

    let { title, subtitle, description, listPrice: { amount, isOnSale }, thumbnail, authors, categories
        , publishedDate, pageCount, language } = book
    console.log(description);
    return <section className="book-edit">
        <h1>{params.bookId ? 'Edit book' : 'Add book'}</h1>

        <form onSubmit={onSave}>
            <label htmlFor="title">Book Title</label>
            <input
                onChange={handleChange} value={title}
                id="title" name="title"
                type="text" placeholder="title" />
            <label htmlFor="subtitle">Book Sub-Title</label>
            <input
                onChange={handleChange} value={subtitle}
                id="subtitle" name="subtitle"
                type="text" placeholder="sub-title" />

            <label htmlFor="author">Authors</label>
            <input
                onChange={handleChange} value={[authors]}
                id="author" name="authors"
                type="text" placeholder="authors" />

            <label htmlFor="category">Categories</label>
            <input
                onChange={handleChange} value={categories}
                id="category" name="category"
                type="text" placeholder="categories" />

            <label htmlFor="description">Description</label>
            <textarea onChange={handleChange} value={description}
                id="description" name="description"
                type="text" rows={10} cols={40} placeholder="description" >

            </textarea>

            <label htmlFor="page-count">Page Count</label>
            <input
                onChange={handleChange} value={pageCount}
                id="page-count" name="page-count"
                type="number" placeholder="Page count" />
            <label htmlFor="amount">Price</label>
            <input
                onChange={handleChange} value={parseFloat(amount)}
                id="amount" name="amount"
                type="number" placeholder="Price" />

            <label htmlFor="published-date">Publish date</label>
            <input
                onChange={handleChange} value={publishedDate}
                id="published-date" name="published-date"
                type="number" placeholder="Publish Date" />

            <label htmlFor="language">Book Language</label>
            <input
                onChange={handleChange} value={language}
                id="language" name="language"
                type="text" placeholder="language" />

            <label htmlFor="thumbnail">Choose Thumbnail</label>
            <input

                onChange={handleChange}
                accept="image/png, image/jpeg"
                id="thumbnail" name="thumbnail"
                type="file" />

            <button>Save</button>
        </form>
    </section>
}
