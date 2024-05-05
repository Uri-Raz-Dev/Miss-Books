import { BookPrice } from "./BookPrice.jsx"
import { BookPublishedDate } from "./BookPublishedDate.jsx"
import { BookReadingDifficulty } from "./BookReadingDifficulty.jsx"

const { useState, useEffect, useRef } = React

export function BookDetails({ book, onClose }) {
    const { title, description, listPrice: { amount, isOnSale }, thumbnail, authors, categories, } = book



    return <section className="book-details grid">
        <img src={thumbnail} alt="book tumbnail" />

        <h2>{title}</h2>
        <h3>{`by ${[authors]}`}</h3>
        <p>{description}</p>
        <span className="generes">{`Genres: ${[categories]}`}</span>
        <BookReadingDifficulty book={book} />
        <BookPublishedDate book={book} />
        <BookPrice book={book} />
        {isOnSale && <span className="sale">On Sale!</span>}
        <button className="close" onClick={onClose}>close</button>

    </section>
}