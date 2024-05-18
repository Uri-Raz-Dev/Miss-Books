
const { useState, useEffect, useRef } = React

import { bookService } from "../services/book.service.js"
import { StarRating } from "./StarRating.jsx"
export function AddReview({ onAddReview, toggleModal }) {
    const [review, setReview] = useState(bookService.emptyReview())

    function addNewReview(ev) {
        console.log(ev)
        ev.preventDefault()
        onAddReview(review)
        toggleModal()
    }

    function handleChange({ target }) {
        const { type, name: prop } = target
        let value = target.value

        switch (type) {
            case 'range':
            case 'number':
            case 'date':
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
        setReview(prevReview => ({ ...prevReview, [prop]: value }))
    }
    let { id, fullName, readAt, rating, txt } = review
    return <section className="review-add">

        <div className='review-modal'>
            <div className="top-modal">
                <h1>Add Review</h1>
                <button className="btn-toggle-modal" onClick={toggleModal}>x</button>
            </div>



            <form onSubmit={addNewReview} className="review-form">
                <label htmlFor="fullName"></label>
                <input
                    onChange={handleChange} value={fullName}
                    id="fullName" name="fullName"
                    type="text" placeholder="Full Name" />

                <label htmlFor="readAt"></label>
                <input
                    onChange={handleChange} value={readAt}
                    id="readAt" name="readAt"
                    type="date" placeholder="Reading Date" />

                <StarRating handleChange={handleChange} rating={rating} />

                <label htmlFor="txt"></label>
                <textarea
                    onChange={handleChange} value={txt}
                    id="txt" name="txt"
                    cols='30' rows='10' placeholder="Type here..."
                ></textarea>
                <button >Add Review</button>

            </form>
        </div>
    </section>
}